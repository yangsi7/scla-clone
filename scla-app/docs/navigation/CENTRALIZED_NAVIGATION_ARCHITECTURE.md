# Centralized Navigation Architecture

## Overview
This document describes the centralized navigation system implemented for the SCLA Clone app to resolve duplicate hamburger menu issues and establish best practices for navigation management.

## Problem Statement
The app previously had navigation components defined in multiple places:
- Main layout had its own hamburger menu
- Individual pages (Dashboard, Diary) also had hamburger menus
- This resulted in duplicate hamburger icons appearing on screens
- Inconsistent navigation behavior across the app

## Solution Architecture

### Core Components

#### 1. HeaderContext (`/contexts/HeaderContext.tsx`)
Manages global header state and configuration:

```typescript
interface HeaderConfig {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  rightActions?: React.ReactNode;
  customHeader?: React.ReactNode;
  onBack?: () => void;
}
```

**Responsibilities:**
- Store current header configuration
- Manage drawer open/close state
- Provide methods to update header from any component

#### 2. SharedHeader (`/components/layout/SharedHeader.tsx`)
Single header component used across all pages:

**Features:**
- Hamburger menu (when showMenu is true)
- Back button (when showBack is true)
- Dynamic title
- Custom right actions
- Support for completely custom headers

**Implementation:**
```typescript
// Uses configuration from HeaderContext
const { headerConfig, isDrawerOpen, setIsDrawerOpen } = useHeader();
```

#### 3. NavigationDrawer (`/components/layout/NavigationDrawer.tsx`)
Single drawer instance for the entire app:

**Features:**
- User profile section
- Navigation menu items
- Settings and logout options
- Smooth animations
- Backdrop for closing

### Integration Pattern

#### 1. Main Layout Setup
```typescript
// app/(main)/layout.tsx
<HeaderProvider>
  <div className="flex flex-col h-full">
    <SharedHeader />
    <main className="flex-1">
      {children}
    </main>
    <BottomTabNavigation />
    <NavigationDrawer />
  </div>
</HeaderProvider>
```

#### 2. Page Configuration
Each page configures its header on mount:

```typescript
// Example: Dashboard
useEffect(() => {
  setHeaderConfig({
    title: 'Dashboard',
    showMenu: true,
    rightActions: <CustomActions />
  });
}, []);
```

## Best Practices Demonstrated

### 1. Single Source of Truth
- One header component for the entire app
- One drawer instance
- Centralized state management

### 2. Composition Over Duplication
- Pages configure existing components rather than creating new ones
- Shared behavior with customizable presentation

### 3. Separation of Concerns
- Navigation logic separated from page content
- Header configuration separated from implementation
- Clear component boundaries

### 4. Flexibility Through Configuration
- Each page can customize its header appearance
- Support for custom headers when needed
- Consistent behavior with varied presentation

## Benefits

1. **Elimination of Duplicates**: No more multiple hamburger menus
2. **Consistent User Experience**: Same navigation behavior everywhere
3. **Maintainability**: Single place to update navigation
4. **Performance**: Fewer components, less re-rendering
5. **Scalability**: Easy to add new pages with proper navigation

## Implementation Guidelines

### Adding a New Page
1. Import `useHeader` hook
2. Configure header in `useEffect`
3. Focus on page content, not navigation

```typescript
const { setHeaderConfig } = useHeader();

useEffect(() => {
  setHeaderConfig({
    title: 'New Page',
    showBack: true,
    onBack: () => router.back()
  });
}, []);
```

### Custom Header Actions
```typescript
rightActions: (
  <>
    <button onClick={handleSettings}>
      <Settings size={20} />
    </button>
    <button onClick={handleHelp}>
      <HelpCircle size={20} />
    </button>
  </>
)
```

### Completely Custom Header
```typescript
customHeader: <MyCustomHeaderComponent />
```

## Migration from Decentralized Navigation

### Before (Problematic)
```typescript
// Each page had its own header
<div className="flex items-center p-4">
  <Menu onClick={() => setLocalDrawerOpen(true)} />
  <h1>Page Title</h1>
</div>
```

### After (Centralized)
```typescript
// Configure shared header
setHeaderConfig({
  title: 'Page Title',
  showMenu: true
});
```

## Future Enhancements

1. **Header Presets**: Common configurations for typical page types
2. **Transition Animations**: Smooth header transitions between pages
3. **Dynamic Theming**: Support for different header themes
4. **Gesture Support**: Swipe to open drawer
5. **Accessibility**: Enhanced keyboard navigation

## Conclusion

The centralized navigation architecture provides a robust foundation for consistent navigation across the SCLA Clone app. By following the single source of truth principle and using configuration over duplication, we've created a maintainable and scalable navigation system that prevents issues like duplicate hamburger menus while maintaining flexibility for individual page needs.