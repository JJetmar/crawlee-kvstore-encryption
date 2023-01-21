import type { KeyValueStoreLike } from './types';
import { EnryptedKeyValueStore } from './encrypted-key-value-store';

export function encryptKeyValueStore(keyValueStore: KeyValueStoreLike, secretKey: string): EnryptedKeyValueStore {
    return new EnryptedKeyValueStore(keyValueStore, secretKey);
}
