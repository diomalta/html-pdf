import { IGlobalState } from '../interfaces/pdf.interface.js';

export async function waitForClient({ client }: IGlobalState) {
  let attempts = 0;
  while (!client) {
    if (attempts > 50) {
      throw new Error('Unable to establish connection with Chrome client.');
    }
    await new Promise((resolve) => setTimeout(resolve, 1));
    attempts++;
  }
}
