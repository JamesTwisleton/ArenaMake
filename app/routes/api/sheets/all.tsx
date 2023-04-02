// import { HandlerContext, Handlers } from "$fresh/server.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const { MONGO_DATA_API_KEY, MONGO_APP_ID } = config();

// const BASE_URI =
//   `https://eu-west-2.aws.data.mongodb-api.com/app/${MONGO_APP_ID}/endpoint/data/v1/action`;



// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": MONGO_DATA_API_KEY,
//   },
//   body: "",
// };

// export const handler: Handlers = {
//   async GET(_req: Request, _ctx: HandlerContext) {
//     const sheet = await getSheet(_ctx.params.sheetId);
//     return sheet;
//   },

//   async POST(_req: Request, _ctx: HandlerContext) {
//     const sheet = await addSheet(_req);
//     return sheet;
//   },
// };

// const getSheet = async (id: string) => {
//   try {
//     const URI = `${BASE_URI}/findOne`;
//     const query = {
//       collection: COLLECTION,
//       database: DATABASE,
//       dataSource: DATA_SOURCE,
//       filter: { sheetId: id },
//     };
//     options.body = JSON.stringify(query);
//     const dataResponse = await fetch(URI, options);
//     const sheet = await dataResponse.json();
//     if (sheet["document"]) {
//       return new Response(JSON.stringify(sheet["document"]), { status: 200 });
//     } else {
//       return new Response(`Sheet ${id} not found!`, { status: 404 });
//     }
//   } catch (err) {
//     console.log(err);
//     return new Response("An unknown error occurred!", { status: 503 });
//   }
// };

// const addSheet = async (_req: Request) => {
//   try {
//     const sheet = await _req.json();
//     const URI = `${BASE_URI}/insertOne`;
//     const query = {
//       collection: COLLECTION,
//       database: DATABASE,
//       dataSource: DATA_SOURCE,
//       document: sheet,
//     };
//     options.body = JSON.stringify(query);
//     const dataResponse = await fetch(URI, options);
//     const { insertedId } = await dataResponse.json();
//     return new Response(
//       `{
//             success: true,
//             data: ${JSON.stringify(sheet)},
//             insertedId: "${insertedId}"
//           }`,
//       { status: 201 },
//     );
//   } catch (err) {
//     console.log(err.message);
//     if(err.message === "Unexpected end of JSON input") {
//       return new Response("Invalid request!", { status: 400 });  
//     }
//     return new Response("An unknown error occurred!", { status: 503 });
//   }
// };

// // const getSheets = async ({ response }: { response: any }) => {
// //   try {
// //     const URI = `${BASE_URI}/find`;
// //     const query = {
// //       collection: COLLECTION,
// //       database: DATABASE,
// //       dataSource: DATA_SOURCE
// //     };
// //     options.body = JSON.stringify(query);
// //     const dataResponse = await fetch(URI, options);
// //     const allSheets = await dataResponse.json();

// //     if (allSheets) {
// //       response.status = 200;
// //       response.body = {
// //         success: true,
// //         data: allSheets,
// //       };
// //     } else {
// //       response.status = 500;
// //       response.body = {
// //         success: false,
// //         msg: "Internal Server Error",
// //       };
// //     }
// //   } catch (err) {
// //     response.body = {
// //       success: false,
// //       msg: err.toString(),
// //     };
// //   }
// // };

// // const getSheet = async ({
// //   params,
// //   response,
// // }: {
// //   params: { id: string };
// //   response: any;
// // }) => {
// //   const URI = `${BASE_URI}/findOne`;
// //   const query = {
// //     collection: COLLECTION,
// //     database: DATABASE,
// //     dataSource: DATA_SOURCE,
// //     filter: { sheetId: params.id }
// //   };
// //   options.body = JSON.stringify(query);
// //   const dataResponse = await fetch(URI, options);
// //   const sheet = await dataResponse.json();

// //   if (sheet) {
// //     response.status = 200;
// //     response.body = {
// //       success: true,
// //       data: sheet,
// //     };
// //   } else {
// //     response.status = 404;
// //     response.body = {
// //       success: false,
// //       msg: "No sheet found",
// //     };
// //   }
// // };

// // const updateSheet = async ({
// //   params,
// //   request,
// //   response,
// // }: {
// //   params: { id: string };
// //   request: any;
// //   response: any;
// // }) => {
// //   try {
// //     const body = await request.body();
// //     const { title, complete } = await body.value;
// //     const URI = `${BASE_URI}/updateOne`;
// //     const query = {
// //       collection: COLLECTION,
// //       database: DATABASE,
// //       dataSource: DATA_SOURCE,
// //       filter: { sheetId: params.id },
// //       update: { $set: { title, complete } }
// //     };
// //     options.body = JSON.stringify(query);
// //     const dataResponse = await fetch(URI, options);
// //     const sheetUpdated = await dataResponse.json();

// //     response.status = 200;
// //     response.body = {
// //       success: true,
// //       sheetUpdated
// //     };

// //   } catch (err) {
// //     response.body = {
// //       success: false,
// //       msg: err.toString(),
// //     };
// //   }
// // };

// // const deleteSheet = async ({
// //   params,
// //   response,
// // }: {
// //   params: { id: string };
// //   response: any;
// // }) => {
// //   try {
// //     const URI = `${BASE_URI}/deleteOne`;
// //     const query = {
// //       collection: COLLECTION,
// //       database: DATABASE,
// //       dataSource: DATA_SOURCE,
// //       filter: { sheetId: params.id }
// //     };
// //     options.body = JSON.stringify(query);
// //     const dataResponse = await fetch(URI, options);
// //     const sheetDeleted = await dataResponse.json();

// //     response.status = 201;
// //     response.body = {
// //       sheetDeleted
// //     };
// //   } catch (err) {
// //     response.body = {
// //       success: false,
// //       msg: err.toString(),
// //     };
// //   }
// // };

// // const getEnabledSheetsCount = async ({ response }: { response: any }) => {
// //   const URI = `${BASE_URI}/aggregate`;
// //   const pipeline = [
// //     {
// //       $match: {
// //         complete: false
// //       }
// //     },
// //     {
// //       $count: 'enabled'
// //     }
// //   ];
// //   const query = {
// //     dataSource: DATA_SOURCE,
// //     database: DATABASE,
// //     collection: COLLECTION,
// //     pipeline
// //   };

// //   options.body = JSON.stringify(query);
// //   const dataResponse = await fetch(URI, options);
// //   const incompleteCount = await dataResponse.json();

// //   if (incompleteCount) {
// //     response.status = 200;
// //     response.body = {
// //       success: true,
// //       incompleteCount,
// //     };
// //   } else {
// //     response.status = 404;
// //     response.body = {
// //       success: false,
// //       msg: "No enabled sheets found",
// //     };
// //   }
// // };

// // export { addSheet, getSheets, getSheet, updateSheet, deleteSheet, getEnabledSheetsCount };

// //   import { Router } from "https://deno.land/x/oak/mod.ts";
// // import {
// //     addSheet,
// //     getSheets,
// //     getSheet,
// //     updateSheet,
// //     deleteSheet,
// //     getEnabledSheetsCount
// // } from "./controllers/sheets.ts"; // Import controller methods

// // const router = new Router();

// // router.get("/", (ctx) => {
// //     ctx.response.body = `<!DOCTYPE html>
// //       <html>
// //         <head><title>ArenaMake</title><head>
// //         <body>
// //           <h1>Coming soon...?!</h1>
// //         </body>
// //       </html>
// //     `;
// //   });

// // // Implement routes
// // router
// //     .post("/api/sheet", addSheet) // Add a sheet
// //     .get("/api/sheet/:id", getSheet) // Get one sheet
// //     .put("/api/sheet/:id", updateSheet) // Update a sheet
// //     .delete("/api/sheet/:id", deleteSheet) // Delete a sheet
// //     .get("/api/sheets", getSheets) // Get all sheets
// //     .get("/api/sheets/enabled/count", getEnabledSheetsCount); // Get enabled sheet count

// // export default router;
