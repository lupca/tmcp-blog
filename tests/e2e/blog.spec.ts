import { test, expect } from '@playwright/test';

test.describe('Blog Flow', () => {
    test('blog index page loads', async ({ page }) => {
        await page.goto('/blog');

        // Check title
        await expect(page).toHaveTitle(/Blog/);

        // Check for either empty state or posts
        const emptyState = page.locator('.empty-state');
        const posts = page.locator('.post-card');

        if (await posts.count() > 0) {
            await expect(posts.first()).toBeVisible();
        } else {
            await expect(emptyState).toBeVisible();
            await expect(emptyState).toHaveText(/No articles published yet/);
        }
    });

    test('can navigate to a blog post (if posts exist)', async ({ page }) => {
        await page.goto('/blog');

        const posts = page.locator('.post-card a');
        if (await posts.count() > 0) {
            // Click the first post
            const firstPost = posts.first();
            // Get title from within the card
            const postTitle = await firstPost.locator('.card-title').textContent();

            await firstPost.click();

            // Verify we are on the post page
            // Post page might use markdown or similar
            await expect(page.locator('article')).toBeVisible();
            await expect(page.locator('h1')).toHaveText(postTitle?.trim() || '');
        } else {
            test.skip(true, 'No posts to test navigation');
        }
    });
});
