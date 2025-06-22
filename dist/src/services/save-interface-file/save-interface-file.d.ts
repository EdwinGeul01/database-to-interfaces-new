/**
 *  function to save the interface file.
 * @param fileContent
 * @param params
 * @param params.fileName - The name of the file to save. Defaults to 'interface.json'.
 * @param params.filePath - The path where the file will be saved. Defaults to './interfaces/'.
 */
export declare function saveInterfaceFile(fileContent: string, params?: {
    fileName?: string;
    filePath?: string;
}): Promise<void>;
