import * as fs from 'fs/promises'

const DEFAULT_FILE_NAME = 'interface.json'
const DEFAULT_PATH = './interfaces/'

/**
 *  function to save the interface file.
 * @param fileContent
 * @param params
 * @param params.fileName - The name of the file to save. Defaults to 'interface.json'.
 * @param params.filePath - The path where the file will be saved. Defaults to './interfaces/'.
 */
export async function saveInterfaceFile(
	fileContent: string,
	params?: {
		fileName?: string
		filePath?: string
	}
): Promise<void> {
	const fileName = params?.fileName ?? DEFAULT_FILE_NAME
	const filePath = params?.filePath ?? DEFAULT_PATH
	const fullPath = `${filePath}${fileName}`

	try {
		await fs.mkdir(filePath, { recursive: true }) // Ensure the directory exists
		await fs.writeFile(fullPath, fileContent, 'utf8') // Write the file content
	} catch (error) {
		console.error(`Error creating directory ${filePath}:`, error)
		throw error
	}
}
