import { KeyValueStoreLike } from './types.js';

export class CachedKeyValueStore implements KeyValueStoreLike {
    #cache: Record<string, unknown> = {};

    constructor(private kvstore: KeyValueStoreLike) {
        // class constructor
    }

    async getValue<T = unknown>(key: string): Promise<T | null> {
        if (!this.#cache[key]) {
            const result = await this.kvstore.getValue<T>(key);
            if (result !== null) {
                this.#cache[key] = result;
            }
        }
        return (this.#cache[key] || null) as T | null;
    }

    async setValue<T>(key: string, value: T | null): Promise<void> {
        if (this.#cache[key] === value
            || (this.#cache[key] == null && value == null)
        ) {
            return;
        }

        if (value === null) {
            await this.kvstore.setValue(key, null);
            delete this.#cache[key];
        } else {
            await this.kvstore.setValue(key, value);
            this.#cache[key] = value;
        }
    }
}
