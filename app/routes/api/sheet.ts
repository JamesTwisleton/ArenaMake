import { HandlerContext, Handlers } from "$fresh/server.ts";

import { addSheet } from "../../functions/sheet_functions.tsx"

export const handler: Handlers = {
  async POST(_req: Request, _ctx: HandlerContext) {
    console.log(`Add sheet request received`);
    return await addSheet(await _req.json());
  }
};
