import { config } from "https://deno.land/x/dotenv/mod.ts";
const {
  MONGO_DATA_API_KEY,
  MONGO_URI,
  MONGO_SHEETS_COLLECTION,
  MONGO_DATA_SOURCE,
  MONGO_DATABASE,
} = config();

const HTTP_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": MONGO_DATA_API_KEY,
  },
  body: "",
};

type Sheet = {sheetId: string, data: any};

const addSheet = async (sheet: Sheet) => {
  try {
    const URI = `${MONGO_URI}/insertOne`;
    const query = {
      collection: MONGO_SHEETS_COLLECTION,
      database: MONGO_DATABASE,
      dataSource: MONGO_DATA_SOURCE,
      document: sheet,
    };
    HTTP_OPTIONS.body = JSON.stringify(query);
  
    const dataResponse = await fetch(URI, HTTP_OPTIONS);
    
    const { insertedId } = await dataResponse.json();
    
    return new Response(
      `{
              success: true,
              data: ${JSON.stringify(sheet)},
              insertedId: "${insertedId}"
            }`,
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    console.log("An error occurred: " + err.message);
    console.log("Full error trace: " + err);
    if (err.message === "Unexpected end of JSON input") {
      return new Response("Invalid request!", { status: 400 });
    }
    return new Response("An unknown error occurred!", { status: 503 });
  }
};

const getSheet = async (id: string) => {
  try {
    const URI = `${MONGO_URI}/findOne`;
    const query = {
      collection: MONGO_SHEETS_COLLECTION,
      database: MONGO_DATABASE,
      dataSource: MONGO_DATA_SOURCE,
      filter: { sheetId: id },
    };
    HTTP_OPTIONS.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, HTTP_OPTIONS);
    const sheet = await dataResponse.json();
    if (sheet["document"]) {
      return new Response(JSON.stringify(sheet["document"]), { status: 200 });
    } else {
      return new Response(`Sheet ${id} not found!`, { status: 404 });
    }
  } catch (err) {
    console.log("An error occurred: " + err.message);
    return new Response("An unknown error occurred!", { status: 503 });
  }
};

const updateSheet = async (_req: Request, id: string) => {
  try {
    const sheet = await _req.json();
    const { title, complete } = sheet;
    const URI = `${MONGO_URI}/updateOne`;
    const query = {
      collection: MONGO_SHEETS_COLLECTION,
      database: MONGO_DATABASE,
      dataSource: MONGO_DATA_SOURCE,
      filter: { sheetId: id },
      update: { $set: { title, complete } },
    };
    HTTP_OPTIONS.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, HTTP_OPTIONS);
    const sheetUpdated = await dataResponse.json();

    return new Response(
      `{success: true}`,
      { status: 200 },
    );
  } catch (err) {
    console.log("An error occurred: " + err.message);
    if (err.message === "Unexpected end of JSON input") {
      return new Response("Invalid request!", { status: 400 });
    }
    return new Response("An unknown error occurred!", { status: 503 });
  }
};

const deleteSheet = async (sheetId: string) => {
  try {
    const URI = `${MONGO_URI}/deleteOne`;
    const query = {
      collection: MONGO_SHEETS_COLLECTION,
      database: MONGO_DATABASE,
      dataSource: MONGO_DATA_SOURCE,
      filter: { sheetId: sheetId },
    };
    HTTP_OPTIONS.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, HTTP_OPTIONS);
    const sheetDeleted = await dataResponse.json();
    if (sheetDeleted.deletedCount === 0) {
      return new Response(
        null,
        { status: 404 },
      );
    } else {
      return new Response(
        null,
        { status: 200 },
      );
    }
  } catch (err) {
    console.log("An error occurred: " + err.message);
    if (err.message === "Unexpected end of JSON input") {
      return new Response("Invalid request!", { status: 400 });
    }
    return new Response("An unknown error occurred!", { status: 503 });
  }
};

export { addSheet, deleteSheet, getSheet, updateSheet };
