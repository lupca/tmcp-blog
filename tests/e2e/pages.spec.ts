import { test, expect } from '@playwright/test';

test('about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator('.about-header h1')).toHaveText('About TMCP Engineering');
});

test('rss feed', async ({ page }) => {
    const response = await page.goto('/rss.xml');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('<?xml');
    expect(text).toContain('<rss');
});
