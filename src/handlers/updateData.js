import { buildResponse } from "../../services/buildResponse";
import { connectToDatabase } from "../../services/mongoConnect";
import { updateData } from "../../services/query";
require("dotenv").config();

export const handler = async (event) => {
  const id = event.pathParameters.id;
  const connectDB = await connectToDatabase();
  const now = new Date();
  const body = JSON.parse(event.body);
  const TABLE_NAME = process.env.TABLE_NAME;

  const data = {
    title: body.title,
    status: body.status,
    updatedAt: now.toISOString(),
  };

  const update = await updateData(connectDB, TABLE_NAME, { id: id }, {$set:data});
  try {
    let response;
    response = buildResponse(200, update);
    console.log(`create response => ${response.body}`);
    return response;
  } catch (err) {
    console.log(`error occured ${err.message}`);
  }
};
