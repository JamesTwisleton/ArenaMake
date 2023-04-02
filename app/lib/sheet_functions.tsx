import {
  BASE_URI,
  COLLECTION,
  DATA_SOURCE,
  DATABASE,
  HTTP_OPTIONS,
} from "./constants.tsx";

const getSheet = async (id: string) => {
  try {
    const URI = `${BASE_URI}/findOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
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

const addSheet = async (_req: Request) => {
  try {
    const sheet = await _req.json();
    const URI = `${BASE_URI}/insertOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
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
    console.log("An error occurred: " + err.message);
    if (err.message === "Unexpected end of JSON input") {
      return new Response("Invalid request!", { status: 400 });
    }
    return new Response("An unknown error occurred!", { status: 503 });
  }
};

const updateSheet = async (_req: Request, id: string) => {
  try {
    const sheet = await _req.json();
    const { title, complete } = sheet;
    const URI = `${BASE_URI}/updateOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
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

const deleteSheet = async (id: string) => {
  try {
    const URI = `${BASE_URI}/deleteOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { sheetId: id },
    };
    HTTP_OPTIONS.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, HTTP_OPTIONS);
    const sheetDeleted = await dataResponse.json();
    if(sheetDeleted.deletedCount===0){
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

export { addSheet, getSheet, updateSheet, deleteSheet };
