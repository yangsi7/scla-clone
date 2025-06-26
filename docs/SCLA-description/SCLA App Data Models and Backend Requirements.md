# SCLA App Data Models and Backend Requirements

## Database Schema

### User Management Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false
);
```

#### user_sessions
```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    device_info JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true
);
```

### Device Management Tables

#### devices
```sql
CREATE TABLE devices (
    id UUID PRIMARY KEY,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    device_type VARCHAR(50) NOT NULL, -- 'skiin_pod', 'chestband', etc.
    firmware_version VARCHAR(20),
    hardware_version VARCHAR(20),
    battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

#### user_devices
```sql
CREATE TABLE user_devices (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    device_name VARCHAR(100), -- User-assigned name like "My Skiin Pod"
    paired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unpaired_at TIMESTAMP,
    is_primary BOOLEAN DEFAULT false,
    UNIQUE(user_id, device_id)
);
```

### Health Data Tables

#### ecg_data
```sql
CREATE TABLE ecg_data (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id),
    recorded_at TIMESTAMP NOT NULL,
    duration_seconds INTEGER NOT NULL,
    sample_rate INTEGER NOT NULL, -- Hz
    channel_1_data BYTEA, -- Raw ECG data for channel 1
    channel_3_data BYTEA, -- Raw ECG data for channel 3
    signal_quality_ch1 VARCHAR(20), -- 'good', 'poor', 'no_signal'
    signal_quality_ch3 VARCHAR(20),
    heart_rate INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analysis_status VARCHAR(20) DEFAULT 'pending' -- 'pending', 'analyzing', 'completed', 'failed'
);
```

#### symptoms
```sql
CREATE TABLE symptoms (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    symptom_name VARCHAR(100) NOT NULL,
    intensity INTEGER CHECK (intensity >= 0 AND intensity <= 10),
    experienced_at TIMESTAMP NOT NULL,
    duration_type VARCHAR(20), -- 'ongoing', 'intermittent'
    duration_hours INTEGER,
    duration_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analysis_status VARCHAR(20) DEFAULT 'pending',
    review_status VARCHAR(20) DEFAULT 'pending'
);
```

#### symptom_triggers
```sql
CREATE TABLE symptom_triggers (
    id UUID PRIMARY KEY,
    symptom_id UUID REFERENCES symptoms(id) ON DELETE CASCADE,
    trigger_name VARCHAR(100) NOT NULL,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### blood_pressure_readings
```sql
CREATE TABLE blood_pressure_readings (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    measured_at TIMESTAMP NOT NULL,
    systolic_1 INTEGER NOT NULL,
    diastolic_1 INTEGER NOT NULL,
    systolic_2 INTEGER,
    diastolic_2 INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Clinical and Analysis Tables

#### holter_studies
```sql
CREATE TABLE holter_studies (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    study_name VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    duration_days INTEGER,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'cancelled'
    progress_percentage INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);
```

#### ecg_analyses
```sql
CREATE TABLE ecg_analyses (
    id UUID PRIMARY KEY,
    ecg_data_id UUID REFERENCES ecg_data(id) ON DELETE CASCADE,
    symptom_id UUID REFERENCES symptoms(id),
    analysis_type VARCHAR(50), -- 'automatic', 'manual', 'ai_assisted'
    findings JSONB, -- Structured analysis results
    abnormalities_detected BOOLEAN DEFAULT false,
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analyzed_by VARCHAR(100), -- System or healthcare provider ID
    status VARCHAR(20) DEFAULT 'pending_review' -- 'pending_review', 'reviewed', 'approved'
);
```

#### custom_symptoms
```sql
CREATE TABLE custom_symptoms (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    symptom_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, symptom_name)
);
```

#### custom_triggers
```sql
CREATE TABLE custom_triggers (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trigger_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, trigger_name)
);
```

### Settings and Preferences Tables

#### user_preferences
```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    data_upload_preference VARCHAR(20) DEFAULT 'wifi_cellular', -- 'wifi_only', 'wifi_cellular'
    notification_enabled BOOLEAN DEFAULT true,
    ecg_scale_setting DECIMAL(4,1) DEFAULT 10.0, -- mm/mV
    timezone VARCHAR(50),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### sync_logs
```sql
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_id UUID REFERENCES devices(id),
    sync_type VARCHAR(50), -- 'ecg_data', 'device_status', 'full_sync'
    sync_status VARCHAR(20), -- 'started', 'completed', 'failed'
    records_synced INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### POST /api/auth/login/qr
```json
{
  "qr_code": "base64_encoded_qr_data"
}
```

#### POST /api/auth/login/six-digit
```json
{
  "code": "123456"
}
```

#### POST /api/auth/logout
```json
{
  "refresh_token": "refresh_token_here"
}
```

### Device Management Endpoints

#### GET /api/devices/available
**Response:**
```json
{
  "devices": [
    {
      "serial_number": "31067601890",
      "device_type": "skiin_pod",
      "signal_strength": -45
    }
  ]
}
```

#### POST /api/devices/pair
```json
{
  "serial_number": "31067601890",
  "device_name": "My Skiin Pod"
}
```

#### GET /api/devices/paired
**Response:**
```json
{
  "devices": [
    {
      "id": "uuid",
      "serial_number": "31067601890",
      "device_name": "My Skiin Pod",
      "device_type": "skiin_pod",
      "firmware_version": "18.0.9.1",
      "hardware_version": "20",
      "battery_level": 75,
      "connection_status": "connected",
      "last_sync_at": "2025-06-24T11:12:00Z"
    }
  ]
}
```

#### DELETE /api/devices/{device_id}/unpair

### Health Data Endpoints

#### GET /api/ecg/realtime
**WebSocket endpoint for real-time ECG data streaming**

#### GET /api/ecg/signal-status
**Response:**
```json
{
  "channel_1": {
    "status": "good_signal",
    "quality_score": 0.95
  },
  "channel_3": {
    "status": "poor_signal", 
    "quality_score": 0.45
  },
  "heart_rate": 72,
  "last_updated": "2025-06-24T11:14:30Z"
}
```

#### POST /api/symptoms
```json
{
  "symptom_name": "Brain Fog",
  "intensity": 5,
  "experienced_at": "2025-06-24T11:13:00Z",
  "duration_type": "ongoing",
  "duration_hours": 2,
  "duration_minutes": 30,
  "triggers": ["Caffeine", "Not Sure", "hot"],
  "notes": "Felt foggy after morning coffee"
}
```

#### GET /api/symptoms
**Query parameters:** `start_date`, `end_date`, `page`, `limit`
**Response:**
```json
{
  "symptoms": [
    {
      "id": "uuid",
      "symptom_name": "Brain Fog",
      "intensity": 5,
      "experienced_at": "2025-06-24T11:13:00Z",
      "triggers": ["Caffeine", "Not Sure", "hot"],
      "analysis_status": "pending",
      "review_status": "pending"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### PUT /api/symptoms/{symptom_id}
#### DELETE /api/symptoms/{symptom_id}

#### POST /api/blood-pressure
```json
{
  "measured_at": "2025-06-24T11:12:00Z",
  "systolic_1": 128,
  "diastolic_1": 84,
  "systolic_2": 129,
  "diastolic_2": 85
}
```

#### GET /api/blood-pressure
**Query parameters:** `start_date`, `end_date`, `page`, `limit`

### Diary and Analytics Endpoints

#### GET /api/diary
**Query parameters:** `date`, `month`, `year`
**Response:**
```json
{
  "date": "2025-06-24",
  "entries": [
    {
      "id": "uuid",
      "type": "symptom",
      "time": "10:38:00",
      "data": {
        "symptom_name": "Sweating",
        "intensity": 5,
        "triggers": ["Caffeine"],
        "analysis_status": "pending"
      }
    },
    {
      "id": "uuid", 
      "type": "blood_pressure",
      "time": "11:12:00",
      "data": {
        "reading": "128.5/84 mmHg"
      }
    }
  ]
}
```

#### GET /api/holter-study/progress
**Response:**
```json
{
  "study_id": "uuid",
  "progress_percentage": 65,
  "days_completed": 9,
  "total_days": 14,
  "last_updated": "2025-06-24T10:21:00Z",
  "status": "active"
}
```

### Settings Endpoints

#### GET /api/user/preferences
#### PUT /api/user/preferences
```json
{
  "data_upload_preference": "wifi_cellular",
  "notification_enabled": true,
  "ecg_scale_setting": 10.0
}
```

#### GET /api/custom-symptoms
#### POST /api/custom-symptoms
```json
{
  "symptom_name": "Custom Symptom Name"
}
```

#### GET /api/custom-triggers  
#### POST /api/custom-triggers
```json
{
  "trigger_name": "hot"
}
```
#### DELETE /api/custom-triggers/{trigger_id}

### Analysis and Review Endpoints

#### POST /api/ecg/analyze
```json
{
  "ecg_data_id": "uuid",
  "symptom_id": "uuid",
  "analysis_type": "automatic"
}
```

#### GET /api/analyses/pending
**Response:**
```json
{
  "pending_analyses": [
    {
      "id": "uuid",
      "type": "ecg_symptom_correlation",
      "symptom_id": "uuid",
      "created_at": "2025-06-24T11:13:00Z",
      "estimated_completion": "2025-06-24T11:18:00Z"
    }
  ]
}
```

## Real-time Data Streaming

### WebSocket Connections

#### ECG Data Stream
- **Endpoint:** `wss://api.scla.com/ws/ecg/{user_id}`
- **Authentication:** JWT token in connection headers
- **Data Format:**
```json
{
  "timestamp": "2025-06-24T11:14:30.123Z",
  "channel_1": [0.1, 0.2, 0.15, ...], // Array of voltage values
  "channel_3": [0.05, 0.1, 0.08, ...],
  "heart_rate": 72,
  "signal_quality": {
    "channel_1": "good",
    "channel_3": "poor"
  }
}
```

#### Device Status Updates
- **Endpoint:** `wss://api.scla.com/ws/device-status/{user_id}`
- **Data Format:**
```json
{
  "device_id": "uuid",
  "battery_level": 75,
  "connection_status": "connected",
  "sync_status": "syncing",
  "last_sync": "2025-06-24T11:12:00Z"
}
```

## Data Synchronization Strategy

### Offline Support
- **Local SQLite Database:** Mirror of cloud data for offline access
- **Sync Queue:** Queue pending operations when offline
- **Conflict Resolution:** Last-write-wins with user notification for conflicts

### Background Sync
- **Automatic Sync:** Every 15 minutes when connected
- **Manual Sync:** Pull-to-refresh gesture
- **Incremental Sync:** Only sync changed data since last sync

### Data Upload Preferences
- **WiFi Only:** Upload only when connected to WiFi
- **WiFi + Cellular:** Upload using any available connection
- **Compression:** Compress ECG data before upload to reduce bandwidth

## Security and Privacy

### Data Encryption
- **At Rest:** AES-256 encryption for sensitive health data
- **In Transit:** TLS 1.3 for all API communications
- **Device Storage:** Encrypted local database with device keychain

### Access Control
- **JWT Tokens:** Short-lived access tokens (15 minutes)
- **Refresh Tokens:** Long-lived refresh tokens (30 days)
- **Role-Based Access:** User, Healthcare Provider, Admin roles

### HIPAA Compliance
- **Audit Logs:** All data access and modifications logged
- **Data Retention:** Configurable retention policies
- **User Consent:** Explicit consent for data sharing and analysis

