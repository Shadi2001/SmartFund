# Clients Components

This directory contains the refactored client section components, broken down into smaller, more maintainable pieces.

## Component Structure

### Main Components

- **`ClientsSection.js`** - Main container component that manages state and renders either the clients list or user details
- **`ClientsList.js`** - Displays the grid of client cards when no specific user is selected
- **`UserDetails.js`** - Container for user details view with tab navigation

### Tab Components

- **`ProfileTab.js`** - Displays user profile information (personal details, contact info, etc.)
- **`ActiveLoansTab.js`** - Shows active loans with detailed information and statistics
- **`CompletedLoansTab.js`** - Displays completed loans with summary and details

### Utilities

- **`utils.js`** - Helper functions used across multiple components
- **`index.js`** - Barrel export file for clean imports

## Usage

```jsx
import { ClientsSection } from './components/Clients';

// Use in your component
<ClientsSection />
```

## Component Responsibilities

### ClientsSection
- Manages overall state (selectedUser, showUserDetails, activeTab)
- Handles user card clicks and tab changes
- Renders either ClientsList or UserDetails based on state

### ClientsList
- Displays grid of client cards
- Handles loading states
- Triggers user selection on card click

### UserDetails
- Manages tab navigation
- Renders appropriate tab content based on activeTab
- Handles back navigation to clients list

### Tab Components
- Each tab is responsible for its own data display
- Handle their own loading states
- Receive data and utility functions as props

### Utils
- `formatDate()` - Formats dates consistently
- `formatIncome()` - Formats currency values
- `getStatusColor()` - Returns appropriate CSS classes for status
- `getRoleBadge()` - Renders role badges with consistent styling

## Benefits of Refactoring

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be used independently
3. **Testability** - Smaller components are easier to test
4. **Readability** - Code is more organized and easier to understand
5. **Performance** - Components can be optimized individually
6. **Debugging** - Issues are easier to isolate to specific components

## Props Interface

### ClientsSection
- No props required (uses context)

### ClientsList
- `usersData` - Array of user objects
- `usersLoading` - Boolean loading state
- `onCardClick` - Function to handle user selection

### UserDetails
- `selectedUser` - User object to display
- `activeTab` - Currently active tab
- `onTabChange` - Function to handle tab changes
- `onClose` - Function to close user details
- `activeLoansLoading` - Boolean for active loans loading
- `activeLoansData` - Active loans data object
- `completedLoansLoading` - Boolean for completed loans loading
- `completedLoansData` - Completed loans data object
- `formatDate` - Date formatting function
- `formatIncome` - Income formatting function
- `getStatusColor` - Status color function
- `getRoleBadge` - Role badge function

### Tab Components
- Receive specific data and utility functions as props
- Handle their own rendering logic and loading states 