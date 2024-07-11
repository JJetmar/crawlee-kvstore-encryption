import { encryptKeyValueStore } from '../src/';

describe('Testing EncryptedKeyValueStore', () => {
    const mockedKeyValueStore = {
        getValue: jest.fn(),
        setValue: jest.fn(),
    };

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test("Get null value", async () => {
        const encryptedKeyValueStore = encryptKeyValueStore(mockedKeyValueStore, 'MY_TEST_SECRET_KEY');
        await encryptedKeyValueStore.getValue('UNEXISTING_KEY');

        expect(mockedKeyValueStore.getValue).toBeCalledTimes(1);
    });

    test("Set null value", async () => {
        const encryptedKeyValueStore = encryptKeyValueStore(mockedKeyValueStore, 'MY_TEST_SECRET_KEY');
        await encryptedKeyValueStore.setValue('ANOTHER_UNEXISTING_KEY', null);

        expect(mockedKeyValueStore.setValue).toBeCalledTimes(1);
        expect(mockedKeyValueStore.setValue).toBeCalledWith('ANOTHER_UNEXISTING_KEY', null);
    });

    test("Encrypting and Decrypt value", async () => {
        const encryptedKeyValueStore = encryptKeyValueStore(mockedKeyValueStore, 'MY_TEST_SECRET_KEY');

        let calledKey: string;
        let calledValue: string;

        mockedKeyValueStore.setValue.mockImplementation((key: string, value: string) => {
            calledKey = key;
            calledValue = value;
        })

        await encryptedKeyValueStore.setValue('EXISTING_KEY', 'SECRET_VALUE');

        expect(calledKey!).toEqual('EXISTING_KEY');
        expect(calledValue!).not.toEqual('SECRET_VALUE');

        mockedKeyValueStore.getValue.mockImplementation((key: string) => {
            calledKey = key;
            return Promise.resolve(calledValue);
        });

        const decryptedValue = await encryptedKeyValueStore.getValue('EXISTING_KEY');
        expect(decryptedValue!).toEqual('SECRET_VALUE');
    });
});
