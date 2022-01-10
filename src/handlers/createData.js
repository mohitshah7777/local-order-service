import { v4 as uuid } from "uuid";
import { connectToDatabase } from "../../services/mongoConnect";
import { insertData } from "../../services/query";
import { buildResponse } from "../../services/buildResponse"
require('dotenv').config();

export const handler = async (event) => {
  const connectDB = await connectToDatabase();
  const now = new Date();
  const body = JSON.parse(event.body);
  const TABLE_NAME = process.env.TABLE_NAME;

  const users = {
    id: uuid(),
    title: body.title,
    status: body.status,
    createdAt: now.toISOString(),
  };

  const create = await insertData(connectDB, TABLE_NAME, users);
  console.log("table name =>", TABLE_NAME);
  try {
    let response;
    response = buildResponse(201, create);
    console.log(`create response => ${response.body}`);
    return response;
  } catch (err) {
     console.log(`error occured ${err}`);
  }
};