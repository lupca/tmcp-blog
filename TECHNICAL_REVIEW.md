# Technical Review

This document outlines the findings from a technical review of the project.

## 1. Architecture & Data Flow

### Inconsistent Content Source
The project is currently in a hybrid state, mixing static content (Markdown) with dynamic content (PocketBase), leading to inconsistencies.

- **Blog Pages**: The blog index (`src/pages/blog/index.astro`) and individual post pages (`src/pages/blog/[slug].astro`) fetch content dynamically from a PocketBase instance.
- **RSS Feed**: The RSS feed (`src/pages/rss.xml.js`) is generated from local Markdown files in `src/content/blog`, using the `getCollection('blog')` API.
  - **Impact**: The RSS feed does not reflect the actual blog content served on the website. Users subscribing to RSS will see placeholder content instead of the real posts.
- **Content Configuration**: `src/content.config.ts` defines a `blog` collection pointing to local files, which seems to be a remnant of the starter template and is not used by the main application logic (except for the incorrect RSS feed).

### Image Handling
- **Inconsistency**:
  - The blog index uses a standard HTML `<img>` tag for post thumbnails.
  - The individual blog post layout (`src/layouts/BlogPost.astro`) uses the Astro `<Image />` component.
  - **Issue**: If `heroImage` from PocketBase is a full URL (e.g., to an external server or local instance), the `<Image />` component might require configuration in `astro.config.mjs` (specifically `image.domains` or `image.remotePatterns`) to function correctly, otherwise it may fail to optimize or display the image.

## 2. Configuration & Environment

### Hardcoded Configuration
- **PocketBase URL**: The PocketBase URL is hardcoded in `src/lib/pocketbase.ts`:
  ```typescript
  export const pb = new PocketBase('http://127.0.0.1:8090');
  ```
  - **Risk**: This makes deployment difficult as the URL cannot be changed without modifying the code.
  - **Recommendation**: Use environment variables (e.g., `import.meta.env.POCKETBASE_URL`).

### Site Configuration
- **Default Value**: `astro.config.mjs` uses the default `site: 'https://example.com'`. This should be updated to the actual production domain for SEO and sitemap generation to work correctly.

## 3. Code Quality

### Type Safety
- **Layout Props**: `src/layouts/BlogPost.astro` types its props using `CollectionEntry<'blog'>['data']`. This type is automatically generated from the local content schema in `src/content.config.ts`.
  - **Risk**: The data coming from PocketBase might not strictly align with this schema. If the PocketBase schema changes (e.g., a field becomes optional or changes type), this could lead to runtime errors or type mismatches that TypeScript won't catch effectively because the source of truth for types (local schema) is disconnected from the actual data source (PocketBase).

## 4. Infrastructure (Docker)

### Dockerfile Optimization
- **Node Modules**: The `Dockerfile` copies `node_modules` from the build stage to the runtime stage:
  ```dockerfile
  COPY --from=build /app/node_modules ./node_modules
  ```
  - **Issue**: This copies *all* dependencies, including potentially unnecessary build artifacts or dev dependencies (if installed).
  - **Recommendation**: For a cleaner and smaller image, consider reinstalling only production dependencies in the runtime stage (`npm ci --omit=dev`) or ensuring `node_modules` are pruned before copying.
