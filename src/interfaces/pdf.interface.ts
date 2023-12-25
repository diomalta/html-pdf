import type { Client } from 'chrome-remote-interface';

export interface IHtmlToPdfParams {
  html: string;
  outputOptions: {
    type?: 'base64' | 'buffer' | 'file';
    path?: string;
  };
}

export interface IGlobalState {
  client: Client | undefined;
}
