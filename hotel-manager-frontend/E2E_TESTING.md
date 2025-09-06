# E2E Testing Setup

## What was created:

1. **Playwright Configuration** (`playwright.config.ts`)
   - Configures test directory as `./e2e`
   - Sets base URL to `http://localhost:5173`
   - Automatically starts dev server before tests
   - Runs tests in Chrome, Firefox, and Safari

2. **Test File** (`e2e/rooms.spec.ts`)
   - Tests room listing page
   - Tests adding a new room
   - Tests searching for rooms
   - Tests viewing room details
   - Tests filtering by room type

## How to run the tests:

### Prerequisites:
- Make sure your backend is running on `http://localhost:8080`
- The frontend dev server will be started automatically

### Run tests:
```bash
# Run all E2E tests in headless mode
npm run test:e2e

# Run tests with browser UI visible
npm run test:e2e:headed

# Run tests with Playwright's UI mode (recommended for development)
npm run test:e2e:ui
```

### Test Coverage:

The E2E test covers:

1. **🏠 Home Page**
   - Displays rooms list
   - Shows filter controls
   - Shows add room button

2. **➕ Add Room Flow**
   - Navigate to add room page
   - Fill form with random room number
   - Submit and verify redirect
   - Search for newly created room

3. **🔍 Search Functionality**
   - Search by room number
   - Verify search results

4. **👁️ View Room Details**
   - Click view button
   - Verify room details page
   - Check navigation buttons

5. **🔗 Filter by Type**
   - Apply type filter
   - Verify filtered results

### Notes:
- Tests use random room numbers to avoid conflicts
- Backend should be running for tests to pass
- Tests will automatically start the frontend dev server
- Each test is independent and can run in parallel

### Debugging:
- Use `npm run test:e2e:ui` for interactive debugging
- Check `test-results/` folder for screenshots on failures
- Use `--headed` flag to see browser actions
