import { config } from "https://deno.land/x/dotenv/mod.ts";
const { MONGO_DATA_API_KEY, MONGO_APP_ID } = config();

const BASE_URI =
  `https://eu-west-2.aws.data.mongodb-api.com/app/${MONGO_APP_ID}/endpoint/data/v1/action`;

const DATA_SOURCE = "Cluster0";
const DATABASE = "arena_db";
const COLLECTION = "sheets";

const HTTP_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": MONGO_DATA_API_KEY,
  },
  body: "",
};

export {BASE_URI, DATA_SOURCE, DATABASE, COLLECTION, HTTP_OPTIONS }