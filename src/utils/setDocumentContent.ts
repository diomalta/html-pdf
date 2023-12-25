import { IGlobalState } from '../interfaces/pdf.interface.js';

export async function setDocumentContent(
  { client }: IGlobalState,
  html: string,
) {
  const { frameTree } = await client!.Page.getResourceTree();
  await client!.Page.setDocumentContent({
    html,
    frameId: frameTree.frame.id,
  });
}
