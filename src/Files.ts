import * as fs from "fs";

const fsPromises = fs.promises;

// Append, adding to the end of a file.
export async function Append(filePath : string, text : string) {
    await fsPromises.appendFile(filePath, `${text}\n`);
}

// Save to a file, deleting the existing contents of the file.
export async function Overwrite(filePath: string, data: string) {
    await fsPromises.writeFile(filePath, data);
}

// Read from a file, returning the contents as plain text.
export async function ReadFile(filePath: string): Promise<string> {
    const contents = await fsPromises.readFile(filePath);
    return contents.toString();
}

// Load JSON data from a file, optionally including a function to be used for parsing records.
export async function LoadJson(filePath: string, parser?: (this: any, key: string, value: any) => any) {
    let data: string;
    try {
        data = await ReadFile(filePath);
    } catch (e) {
        if (e.code === 'ENOENT') {
            // If the error code is 'file doesn't exist', return undefined
            return undefined;
        }

        // Otherwise, re-throw the error
        throw e;
    }

    return JSON.parse(data, parser);
}