export interface KeyValueStoreLike {
    getValue<T = unknown>(key: string): Promise<T | null>;
    getValue<T = unknown>(key: string, defaultValue: T): Promise<T>;
    setValue<T>(key: string, value: T | null): Promise<void>;
}
