# Crawlee Storage extensions

Package for [Crawlee](https://github.com/apify/crawlee) that brings some extensions to the Storages.


Currently supports:
- Key-Value Store encryption

## Installation

```shell
npm install crawlee-storage-extensions
```

### KvStore encryption & decryption example

```javascript
import { KeyValueStore, Configuration } from 'crawlee';
import { encryptKeyValueStore } from 'crawlee-storage-extensions';

// Opens Default KvStore
const kvStore = await KeyValueStore.open(Config.defaultKeyValueStoreId);

// Secret key is used to encrypt and decrypt the values 
const encryptedKvStore = encryptKeyValueStore(kvStore, 'MY_SECRET_KEY');

await encryptedKvStore.setValue('MY_KEY', 'MY_VALUE'); // Stores the value in encrypted form

const encryptedValue = await kvStore.getValue('MY_KEY'); // Loads the value in encrypted form
console.log(encryptedValue); // 

const decryptedValue = await encryptedKvStore.getValue('MY_KEY'); // Loads the decrypted value
console.log(encryptedValue); //
```

## Contribution
New features are added on-the-go as needed, feel free to create pull-request with your own changes.
