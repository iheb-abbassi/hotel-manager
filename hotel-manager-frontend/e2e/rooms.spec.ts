import { test, expect } from '@playwright/test';

test.describe('Hotel Manager - Room Management', () => {
  test('should display rooms list and add a new room', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Verify we're on the rooms page
    await expect(page.locator('h1')).toContainText('Rooms');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check if the page has the expected elements (table headers)
    await expect(page.locator('th:has-text("Number")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('th:has-text("Type")')).toBeVisible();
    await expect(page.locator('th:has-text("Minibar")')).toBeVisible();
    await expect(page.locator('th:has-text("Available")')).toBeVisible();

    // Check if filter controls are present
    await expect(page.locator('input[placeholder="Search by number"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible(); // Type filter
    await expect(page.locator('button:has-text("Apply")')).toBeVisible();
    await expect(page.locator('button:has-text("Clear Filters")')).toBeVisible();

    // Check if the green plus button is present
    await expect(page.locator('a[title="Add Room"]')).toBeVisible();
    
    // Click the plus button to navigate to add room page
    await page.locator('a[title="Add Room"]').click();

    // Verify we're on the add room page
    await expect(page.locator('h1')).toContainText('Add Room');

    // Fill out the room form
    const roomNumber = Math.floor(Math.random() * 1000) + 1000; // Generate random room number
    await page.locator('input[name="number"]').fill(roomNumber.toString());
    
    // Select room type
    await page.locator('select[name="type"]').selectOption('SINGLE');
    
    // Set minibar to true
    await page.locator('input[name="hasMinibar"]').check();
    
    // Available should be checked by default, but let's ensure it
    await page.locator('input[name="available"]').check();

    // Submit the form
    await page.locator('button:has-text("Create")').click();

    // Verify we're redirected back to the rooms list
    await expect(page.locator('h1')).toContainText('Rooms');

    // Wait for the page to load and look for our new room
    await page.waitForTimeout(1000); // Give time for the query to complete

    // Search for the newly created room
    await page.locator('input[placeholder="Search by number"]').fill(roomNumber.toString());
    await page.locator('button:has-text("Apply")').click();

    // Verify the room appears in the table (might need to wait for API call)
    await expect(page.locator(`text=${roomNumber}`)).toBeVisible({ timeout: 5000 });
    await expect(page.locator('td:has-text("SINGLE")')).toBeVisible();
    await expect(page.locator('td:has-text("Yes")').first()).toBeVisible(); // Minibar
  });

  test('should search for a room by number', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Rooms');

    // Search for a specific room (assuming room 102 exists from your screenshot)
    await page.locator('input[placeholder="Search by number"]').fill('234234');
    await page.locator('button:has-text("Apply")').click();

    // Verify search results
    await expect(page.locator('text=234234')).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to view room page', async ({ page }) => {
    await page.goto('/');

    // Wait for rooms to load
    await expect(page.locator('h1')).toContainText('Rooms');
    
    // Wait for table to load and click the first "View" button
    await page.waitForSelector('a:has-text("View")', { timeout: 10000 });
    await page.locator('a:has-text("View")').first().click();

    // Verify we're on a room view page
    await expect(page.locator('h1')).toContainText('Room');
    
    // Check that room details are displayed (using more specific selectors)
    await expect(page.locator('label:has-text("Room Number")')).toBeVisible();
    await expect(page.locator('label:has-text("Type")')).toBeVisible();
    await expect(page.locator('label:has-text("Minibar")')).toBeVisible();
    await expect(page.locator('label:has-text("Available")')).toBeVisible();

    // Check for Edit Room button
    await expect(page.locator('a:has-text("Edit Room")')).toBeVisible();
    
    // Check for Back to Rooms button
    await expect(page.locator('a:has-text("Back to Rooms")')).toBeVisible();
  });

  test('should filter rooms by type', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Rooms');

    // Select DOUBLE type filter
    await page.locator('select').first().selectOption('DOUBLE');
    await page.locator('button:has-text("Apply")').click();

    // Wait for results and verify all visible rooms are DOUBLE type
    await page.waitForTimeout(1000);
    
    // Check if DOUBLE rooms are displayed
    const roomTypeElements = await page.locator('td:nth-child(3)').allTextContents();
    roomTypeElements.forEach(type => {
      expect(type.trim()).toBe('DOUBLE');
    });
  });
});
