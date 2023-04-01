import { config } from "https://deno.land/x/dotenv/mod.ts";
const { MONGO_DATA_API_KEY, MONGO_APP_ID } = config();

const BASE_URI = `https://eu-west-2.aws.data.mongodb-api.com/app/${MONGO_APP_ID}/endpoint/data/v1/action`;

const DATA_SOURCE = "Cluster0";
const DATABASE = "arena_db";
const COLLECTION = "sheets";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": MONGO_DATA_API_KEY
  },
  body: ""
};

const addSheet = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = {
          success: false,
          msg: "No Data",
        };
      } else {
        const body = await request.body();
        const sheet = await body.value;
        const URI = `${BASE_URI}/insertOne`;
        const query = {
          collection: COLLECTION,
          database: DATABASE,
          dataSource: DATA_SOURCE,
          document: sheet
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        const { insertedId } = await dataResponse.json();
        
        response.status = 201;
        response.body = {
          success: true,
          data: sheet,
          insertedId
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

const getSheets = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allSheets = await dataResponse.json();

    if (allSheets) {
      response.status = 200;
      response.body = {
        success: true,
        data: allSheets,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getSheet = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const URI = `${BASE_URI}/findOne`;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: { sheetId: params.id }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const sheet = await dataResponse.json();
  
  if (sheet) {
    response.status = 200;
    response.body = {
      success: true,
      data: sheet,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No sheet found",
    };
  }
};

const updateSheet = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const { title, complete } = await body.value;
    const URI = `${BASE_URI}/updateOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { sheetId: params.id },
      update: { $set: { title, complete } }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const sheetUpdated = await dataResponse.json();
    
    response.status = 200;
    response.body = { 
      success: true,
      sheetUpdated 
    };
    
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteSheet = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  try {
    const URI = `${BASE_URI}/deleteOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { sheetId: params.id }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const sheetDeleted = await dataResponse.json();

    response.status = 201;
    response.body = {
      sheetDeleted
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getEnabledSheetsCount = async ({ response }: { response: any }) => {
  const URI = `${BASE_URI}/aggregate`;
  const pipeline = [
    {
      $match: {
        complete: false
      }
    }, 
    {
      $count: 'enabled'
    }
  ];
  const query = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: COLLECTION,
    pipeline
  };

  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const incompleteCount = await dataResponse.json();
  
  if (incompleteCount) {
    response.status = 200;
    response.body = {
      success: true,
      incompleteCount,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No enabled sheets found",
    };
  }
};
  
export { addSheet, getSheets, getSheet, updateSheet, deleteSheet, getEnabledSheetsCount };