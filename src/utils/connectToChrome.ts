import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { IChromeInitParams } from '../interfaces/chrome.interface.js';
import { configs } from '../configs.js';
import { IGlobalState } from '../interfaces/pdf.interface.js';

export async function connectToChrome(
  { client }: IGlobalState,
  options?: IChromeInitParams,
) {
  const chrome = await launch({
    port: options?.port || configs.port,
    chromeFlags: options?.chromeFlags || configs.chromeFlags,
    chromePath: options?.chromePath || configs.chromePath,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  client = await CDP({ port: chrome.port });
}
