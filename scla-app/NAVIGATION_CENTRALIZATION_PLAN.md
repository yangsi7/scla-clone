# Navigation Centralization Plan

## Current Issues

1. **Duplicate Hamburger Menus**: Both the main layout and individual pages (dashboard, diary) have their own hamburger menu buttons
2. **Inconsistent Header Implementation**: Some pages have their own headers while others rely on the main layout
3. **State Management**: NavigationDrawer state is managed separately in different components

## Root Cause

The main layout conditionally shows a header with hamburger menu based on pathname:
```typescript
const pagesWithOwnHeaders = [
  '/blood-pressure/entry',
  '/symptom/entry',
  '/settings',
];
```

However, it doesn't include `/dashboard` and `/diary` which also have their own headers with hamburger menus.

## Proposed Solution

### Option 1: Centralized Header in Main Layout (Recommended)

**Benefits:**
- Single source of truth for navigation
- Consistent header across all pages
- Easier to maintain
- Single NavigationDrawer state

**Implementation:**
1. Remove individual headers from dashboard, diary, ecg, and holter-study pages
2. Update main layout to always show header
3. Make header content dynamic based on current route
4. Pass header props from pages to layout using metadata or context

### Option 2: Complete Delegation to Pages

**Benefits:**
- Each page has full control over its header
- More flexibility for unique headers

**Implementation:**
1. Remove header from main layout entirely
2. Ensure all pages implement their own headers
3. Create shared Header component for consistency
4. Each page manages its own NavigationDrawer state

### Option 3: Hybrid Approach with Header Provider

**Benefits:**
- Centralized state management
- Flexible header content per page
- No duplication

**Implementation:**
1. Create HeaderProvider context
2. Pages can set header content through context
3. Main layout renders header based on context
4. Single NavigationDrawer instance

## Recommended Implementation Steps

### 1. Create HeaderProvider Context
```typescript
interface HeaderConfig {
  title?: string;
  showMenuButton?: boolean;
  rightActions?: React.ReactNode;
  customHeader?: React.ReactNode;
}

const HeaderContext = createContext<{
  config: HeaderConfig;
  setConfig: (config: HeaderConfig) => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}>({...});
```

### 2. Update Main Layout
- Wrap children with HeaderProvider
- Render header based on context config
- Manage NavigationDrawer state centrally

### 3. Update Individual Pages
- Remove hardcoded headers
- Use useHeader hook to set header config
- Remove local NavigationDrawer state

### 4. Create Shared Header Component
- Consistent styling
- Flexible content through props
- Handles common patterns (back button, title, actions)

## Migration Plan

1. **Phase 1**: Identify all pages with headers
   - Dashboard ✓
   - Diary ✓
   - ECG ✓
   - Holter Study ✓
   - Blood Pressure Entry ✓
   - Symptom Entry ✓
   - Settings pages ✓

2. **Phase 2**: Create new infrastructure
   - HeaderProvider context
   - useHeader hook
   - SharedHeader component

3. **Phase 3**: Migrate pages one by one
   - Start with simple pages (settings)
   - Move to complex pages (dashboard, diary)
   - Test each migration

4. **Phase 4**: Cleanup
   - Remove old header code
   - Update main layout conditional logic
   - Ensure consistency

## Benefits of Centralization

1. **Consistency**: All headers look and behave the same
2. **Maintainability**: Single place to update header logic
3. **Performance**: Single NavigationDrawer instance
4. **State Management**: No duplicate drawer states
5. **User Experience**: Predictable navigation behavior

## Implementation Priority

Given the current state, I recommend **Option 3 (Hybrid Approach)** as it provides the best balance of:
- Centralized state management
- Flexibility for page-specific headers
- Minimal refactoring of existing pages
- Future extensibility