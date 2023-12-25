import {
  connectToChrome,
  setDocumentContent,
  waitForClient,
  writeDataToFile,
  printToPDF,
} from './utils/index.js';

import { configs } from './configs.js';
import { IChromeInitParams } from './interfaces/chrome.interface.js';
import { IGlobalState, IHtmlToPdfParams } from './interfaces/pdf.interface.js';

const state = {
  chrome: undefined as IGlobalState['chrome'] | undefined,
  client: undefined as IGlobalState['client'] | undefined,
};

export async function init(options?: IChromeInitParams) {
  try {
    const { client, chrome } = await connectToChrome(options);
    state.chrome = chrome;
    state.client = client;
  } catch (err) {
    console.error(`Couldn't connect to Chrome:\n\n${err}`);
    throw err;
  }
}

export async function close() {
  if (state.client) {
    await state.client.close();
  }

  if (state.chrome) {
    state.chrome.kill();
  }
}

export async function convertHtmlToPdf({
  html,
  outputOptions,
}: IHtmlToPdfParams) {
  try {
    await waitForClient(state);
    await setDocumentContent(state, html);
    const data = await printToPDF(state);

    switch (outputOptions.type) {
      case 'file':
        await writeDataToFile(outputOptions.path ?? configs.path, data);
        return;
      case 'buffer':
        return Buffer.from(data, 'base64');
      case 'base64':
      default:
        return data;
    }
  } catch (err) {
    console.error(`Failed to generate PDF:\n\n${err}`);
    throw err;
  }
}
