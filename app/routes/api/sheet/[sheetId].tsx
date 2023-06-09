import { HandlerContext, Handlers } from "$fresh/server.ts";

import { getSheet, addSheet, updateSheet, deleteSheet } from "../../../functions/sheet_functions.tsx"

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    return await getSheet(_ctx.params.sheetId); 
  },

  async POST(_req: Request, _ctx: HandlerContext) {
    return await addSheet(await _req.json());
  },

  async PUT(_req: Request, _ctx: HandlerContext) {
    return await updateSheet(_req, _ctx.params.sheetId);
  },

  async DELETE(_req: Request, _ctx: HandlerContext) {
    return await deleteSheet(_ctx.params.sheetId);
  }
};
