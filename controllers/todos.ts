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

const getTodos = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allTodos = await dataResponse.json();

    if (allTodos) {
      response.status = 200;
      response.body = {
        success: true,
        data: allTodos,
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

const getTodo = async ({
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
    filter: { todoId: params.id }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const todo = await dataResponse.json();
  
  if (todo) {
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No todo found",
    };
  }
};

const updateTodo = async ({
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
      filter: { todoId: parseInt(params.id) },
      update: { $set: { title, complete } }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const todoUpdated = await dataResponse.json();
    
    response.status = 200;
    response.body = { 
      success: true,
      todoUpdated 
    };
    
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteTodo = async ({
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
      filter: { todoId: params.id }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const todoDeleted = await dataResponse.json();

    response.status = 201;
    response.body = {
      todoDeleted
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getIncompleteTodos = async ({ response }: { response: any }) => {
  const URI = `${BASE_URI}/aggregate`;
  const pipeline = [
    {
      $match: {
        complete: false
      }
    }, 
    {
      $count: 'incomplete'
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
      msg: "No incomplete todos found",
    };
  }
};
  
export { addTodo, getTodos, getTodo, updateTodo, deleteTodo, getIncompleteTodos };