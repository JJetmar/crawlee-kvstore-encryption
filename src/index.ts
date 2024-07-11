import type { KeyValueStoreLike } from './types.js';

import { EncryptedKeyValueStore } from './encrypted-key-value-store.js'
export { EncryptedKeyValueStore } from './encrypted-key-value-store.js'

export function encryptKeyValueStore(keyValueStore: KeyValueStoreLike, secretKey: string): EncryptedKeyValueStore {
    return new EncryptedKeyValueStore(keyValueStore, secretKey);
}
