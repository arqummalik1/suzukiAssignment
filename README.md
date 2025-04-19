# React Native Posts App - README

## Overview
This React Native application demonstrates efficient data fetching, rendering optimization, and push notification implementation. The app displays a list of posts from JSONPlaceholder API with a counter component that doesn't trigger unnecessary re-renders in child components.

## Features

- 📝 Fetches and displays posts from JSONPlaceholder API
- 🔢 Counter component with increment/decrement functionality
- ⚡ Optimized rendering using React.memo, useCallback, and useMemo
- 🔔 Push notifications for data fetching events
- 📱 Responsive design with gradient backgrounds
- ♻️ Pagination with infinite scrolling
- 🏷️ Post details view with back navigation

## Technical Highlights

### Performance Optimizations
- **Memoization**: Components wrapped in `React.memo` with custom comparison
- **Heavy Computation**: Intensive calculations cached with `useMemo`
- **FlatList Optimization**: Efficient rendering of large lists
- **Callback Optimization**: Functions memoized with `useCallback`

### Architecture
```
/src
├── components/
│   ├── Counter.js       # Interactive counter
│   ├── PostDetails.js   # Single post view
│   └── PostItem.js      # List item component
├── services/
│   └── notificationService.js  # Push notification logic
└── theme/
    └── theme.js         # Design system configuration
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
expo start
```

## Requirements

- Node.js (v14+ recommended)
- Expo CLI
- iOS/Android simulator or physical device for push notifications

## Dependencies

- React Native
- Expo
- expo-notifications
- expo-linear-gradient
- @expo/vector-icons

## Configuration

1. **Push Notifications**: Configure in `app.json`
2. **Theme**: Customize colors in `src/theme/theme.js`
3. **API Endpoint**: Modify in `App.js` fetch calls

## Usage

1. **Counter**: Use +/- buttons to increment/decrement
2. **Posts List**: Scroll to load more posts
3. **Post Details**: Tap any post to view details
4. **Back Navigation**: Use back button to return to list

## Performance Metrics

- Heavy computation time: ~30-100ms per item (optimized with memoization)
- Re-renders minimized through React hooks optimization
- Memory-efficient pagination


## Acknowledgments

- JSONPlaceholder for the free API
- Expo team for the excellent tools
- React Native community