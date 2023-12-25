import { writeFile } from 'node:fs/promises';

export async function writeDataToFile(path: string, data: string) {
  await writeFile(path, data);
}
