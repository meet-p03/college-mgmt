# College Course & Student Management System (React)

## Run
    npm install
    npm run dev

## Why memoization was used
- `StudentCard` and `CourseCard` use `React.memo`: typing in the search box or form re-renders the page,
  but unchanged rows are skipped. Handlers passed to them use `useCallback` so props stay stable.
- `useMemo` is used for the dashboard statistics and for the search/filter results, so they are
  recomputed only when the data, search text or filter changes.
