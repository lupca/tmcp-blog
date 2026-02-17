import { describe, it, expect } from 'vitest';
import { SITE, NAV_LINKS, SOCIAL_LINKS, HERO, TOPICS, ABOUT, FOOTER } from './consts';

describe('Constants', () => {
    it('SITE config should be valid', () => {
        expect(SITE.title).toBeTruthy();
        expect(SITE.description).toBeTruthy();
        expect(SITE.url).toContain('https://');
    });

    it('NAV_LINKS should have items', () => {
        expect(NAV_LINKS.length).toBeGreaterThan(0);
        NAV_LINKS.forEach(link => {
            expect(link.label).toBeTruthy();
            expect(link.href).toBeTruthy();
        });
    });

    it('SOCIAL_LINKS should be configured', () => {
        expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
    });

    it('HERO should have content', () => {
        expect(HERO.headline).toBeTruthy();
        expect(HERO.cta.href).toBe('/blog');
    });

    it('TOPICS should be defined', () => {
        expect(TOPICS.length).toBeGreaterThan(0);
    });

    it('ABOUT section should be populated', () => {
        expect(ABOUT.title).toBeTruthy();
        expect(ABOUT.sections.length).toBeGreaterThan(0);
    });

    it('FOOTER should have copyright and links', () => {
        expect(FOOTER.copyright).toBeTruthy();
        expect(FOOTER.links.length).toBeGreaterThan(0);
    });
});
