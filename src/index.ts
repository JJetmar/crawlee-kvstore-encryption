import type { KeyValueStoreLike } from './types.js';
import { EnryptedKeyValueStore } from './encrypted-key-value-store.js';

export function encryptKeyValueStore(keyValueStore: KeyValueStoreLike, secretKey: string): EnryptedKeyValueStore {
    return new EnryptedKeyValueStore(keyValueStore, secretKey);
}
