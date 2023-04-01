import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { addSheet } from "../../../controllers/sheets.ts";

const TEST_INSERTED_ID = 1234

mf.install();
mf.mock("POST@/app/data-yceyo/endpoint/data/v1/action/insertOne", (_req) => {
  return new Response(`{"insertedId":${TEST_INSERTED_ID}}`, {
    status: 200,
  });
});

Deno.test("add sheet endpoint should return a 400 status when request has no body", async () => {
  const request: any = {
    "hasBody": false,
  };
  const response: any = {
    status: null,
    body: null,
  };

  await addSheet({ request, response });
  assertEquals(response.status, 400);

  assertEquals(response.body, {
    success: false,
    msg: "No Data",
  });
});

Deno.test("add sheet endpoint should return a 201 status and appropriate response body when request is valid", async () => {
  const requestBody = {
    "title": "TEST_SHEET",
    "complete": false,
    "sheetId": "TEST_SHEET_ID",
    "enabled": true,
  };

  const request: any = {
    hasBody: true,
    body: () => ({
      value: requestBody,
    }),
  };
  const response: any = {
    status: null,
    body: null,
  };

  await addSheet({ request, response });

  assertEquals(response.status, 201);
  assertEquals(response.body, {
    success: true,
    data: requestBody,
    insertedId: TEST_INSERTED_ID,
  });
});

Deno.test("add sheet endpoint should return an error message when an error occurs", async () => {
  const errorMessage = "oopsy doopsy doo error time"

  const request: any = {
    hasBody: true,
    body: () => {
      throw new Error(errorMessage);
    },
  };
  const response: any = {
    body: null,
  };

  await addSheet({ request, response });

  // assertEquals(response.status, 201);
  assertEquals(response.body, {
    success: false,
    msg: `Error: ${errorMessage}`,
  });
});
