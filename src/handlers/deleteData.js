import { buildResponse } from "../../services/buildResponse";
import { connectToDatabase } from "../../services/mongoConnect";
import { deleteData } from "../../services/query";
require("dotenv").config();

export const handler = async (event) => {
  const connectDB = await connectToDatabase();
  const TABLE_NAME = process.env.TABLE_NAME;
  const id = event.pathParameters.id;

  const deleteResponse = await deleteData(connectDB, TABLE_NAME, { id });
  try {
    let response;
    response = buildResponse(200, deleteResponse)
    console.log(`create response => ${response.body}`);
    return response;
  } catch (err) {
    console.log(`error occured ${err.message}`);
  }
};
