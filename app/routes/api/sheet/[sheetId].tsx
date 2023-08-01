import { HandlerContext, Handlers } from "$fresh/server.ts";

import { getSheet, updateSheet, deleteSheet } from "../../../functions/sheet_functions.tsx"

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    console.log(`GET request for ${_ctx.params.sheetId} received`);
    return await getSheet(_ctx.params.sheetId); 
  },

  async PUT(_req: Request, _ctx: HandlerContext) {
    console.log(`PUT request for ${_ctx.params.sheetId} received`);
    return await updateSheet(_req, _ctx.params.sheetId);
  },

  async DELETE(_req: Request, _ctx: HandlerContext) {
    console.log(`DELETE request for ${_ctx.params.sheetId} received`);
    return await deleteSheet(_ctx.params.sheetId);
  }
};
