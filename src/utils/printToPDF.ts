import { IGlobalState } from '../interfaces/pdf.interface.js';

export async function printToPDF({ client }: IGlobalState) {
  const { data } = await client!.Page.printToPDF();
  return data;
}
