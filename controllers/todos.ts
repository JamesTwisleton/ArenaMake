import { config } from "https://deno.land/x/dotenv/mod.ts";
const { MONGO_DATA_API_KEY, MONGO_APP_ID } = config();

const BASE_URI = `https://eu-west-2.aws.data.mongodb-api.com/app/${MONGO_APP_ID}/endpoint/data/v1/action`;

const DATA_SOURCE = "Cluster0";
const DATABASE = "todo_db";
const COLLECTION = "todos";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": MONGO_DATA_API_KEY
  },
  body: ""
};

const addTodo = async ({
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
        const todo = await body.value;
        const URI = `${BASE_URI}/insertOne`;
        const query = {
          collection: COLLECTION,
          database: DATABASE,
          dataSource: DATA_SOURCE,
          document: todo
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        console.log(dataResponse);
        const { insertedId } = await dataResponse.json();
        
        response.status = 201;
        response.body = {
          success: true,
          data: todo,
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
  
  export { addTodo };