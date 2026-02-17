import { test, expect } from '@playwright/test';

test('homepage has title and hero section', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/TMCP Engineering/);

    // Expect h1 to be visible
    await expect(page.locator('h1').first()).toBeVisible();
});
