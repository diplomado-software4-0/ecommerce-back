export interface StorageBase {
    upload: (file_name: string, file_buffer: Buffer) => Promise<string>
}