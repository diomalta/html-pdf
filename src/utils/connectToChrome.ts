import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { IChromeInitParams } from '../interfaces/chrome.interface.js';
import { configs } from '../configs.js';

export async function connectToChrome(options?: IChromeInitParams) {
  const chrome = await launch({
    port: options?.port || configs.port,
    chromeFlags: options?.chromeFlags || configs.chromeFlags,
    chromePath: options?.chromePath || configs.chromePath,
  });

  const client = await CDP({ port: chrome.port });

  return {
    chrome,
    client,
  };
}
