import { describe, it, expect, vi } from 'vitest';
import { pb } from './pocketbase';
import PocketBase from 'pocketbase';

// Mock PocketBase
vi.mock('pocketbase', () => {
    return {
        default: class {
            baseUrl: string;
            constructor(baseUrl: string) {
                this.baseUrl = baseUrl;
            }
        },
    };
});

describe('pocketbase client', () => {
    it('should be an instance of PocketBase', () => {
        expect(pb).toBeInstanceOf(PocketBase);
    });

    it('should be initialized with the correct URL', () => {
        expect((pb as any).baseUrl).toBe('http://127.0.0.1:8090');
    });
});
