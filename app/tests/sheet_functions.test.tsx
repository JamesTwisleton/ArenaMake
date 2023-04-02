import { config } from "https://deno.land/x/dotenv/mod.ts";
import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import {
  addSheet,
  deleteSheet,
  getSheet,
  updateSheet,
} from "../functions/sheet_functions.tsx";

const {
  MONGO_APP_ID,
} = config();
const TEST_INSERTED_ID = 1234;

mf.install();
mf.mock(
  `POST@/app/${MONGO_APP_ID}/endpoint/data/v1/action/insertOne`,
  (_req) => {
    // return new Response(`{"wow":"cool"}`);

    const responseBody = JSON.stringify({
      insertedId: TEST_INSERTED_ID,
    });

    const responseInit: ResponseInit = {
      status: 200,
      headers: { "content-type": "application/json" },
    };

    return new Response(responseBody, responseInit);
  },
);

Deno.test("Should successfully insert a new sheet and return the inserted data", async () => {
  const sheet = { sheetId: "value", "data": "wow" };
  const response = await addSheet(sheet);

  assertEquals(response.status, 201);
  assertEquals(
    await response.text(),
    `{
              success: true,
              data: ${JSON.stringify(sheet)},
              insertedId: "${TEST_INSERTED_ID}"
            }`,
  );
});

// Deno.test("add sheet endpoint should return a 400 status when request has no body", async () => {
//   const request: any = {
//     "hasBody": false,
//   };

//   const response = await addSheet(request);
//   console.log(response)
//   // assertEquals(response.status, 400);

//   // assertEquals(response.body, {
//   //   success: false,
//   //   msg: "No Data",
//   // });
// });

// Deno.test("add sheet endpoint should return a 201 status and appropriate response body when request is valid", async () => {
//   const requestBody = {
//     "title": "TEST_SHEET",
//     "complete": false,
//     "sheetId": "TEST_SHEET_ID",
//     "enabled": true,
//   };

//   const request: any = {
//     hasBody: true,
//     body: () => ({
//       value: requestBody,
//     }),
//   };
//   const response: any = {
//     status: null,
//     body: null,
//   };

//   await addSheet({ request, response });

//   assertEquals(response.status, 201);
//   assertEquals(response.body, {
//     success: true,
//     data: requestBody,
//     insertedId: TEST_INSERTED_ID,
//   });
// });

// Deno.test("add sheet endpoint should return an error message when an error occurs", async () => {
//   const errorMessage = "oopsy doopsy doo error time"

//   const request: any = {
//     hasBody: true,
//     body: () => {
//       throw new Error(errorMessage);
//     },
//   };
//   const response: any = {
//     body: null,
//   };

//   await addSheet({ request, response });

//   // assertEquals(response.status, 201);
//   assertEquals(response.body, {
//     success: false,
//     msg: `Error: ${errorMessage}`,
//   });
// });

// it('should return a 400 status when the request body is not valid JSON', async () => {
//   const invalidJson = '{ invalid: json }';
//   const req = new Request('/', { method: 'POST', body: invalidJson });
//   const response = await addSheet(req);

//   expect(response.status).toBe(400);
//   expect(await response.text()).toBe('Invalid request!');
// });

// it('should return a 503 status when an error occurs', async () => {
//   const sheet = { key: 'value' };
//   const scope = nock(BASE_URI)
//     .post('/insertOne', {
//       collection: COLLECTION,
//       database: DATABASE,
//       dataSource: DATA_SOURCE,
//       document: sheet,
//     })
//     .replyWithError('An error occurred.');

//   const req = new Request('/', { method: 'POST', body: JSON.stringify(sheet) });
//   const response = await addSheet(req);

//   expect(response.status).toBe(503);
//   expect(await response.text()).toBe('An unknown error occurred!');
//   scope.done();
// });
// });
// In this test suite, three test cases are defined:

// When the request body contains valid JSON data, the addSheet function should insert the new sheet and return the inserted data with a 201 status.
// When the request body contains invalid JSON data, the function should return a 400 status with the message "Invalid request!".
// When an error occurs during the request, the function should return a 503 status with the message "An unknown error occurred!".
