import { buildResponse } from '../../services/buildResponse';
import { connectToDatabase } from '../../services/mongoConnect';
import { getAllData } from '../../services/query';
require('dotenv').config();

export const handler = async () => {
  const TABLE_NAME = process.env.TABLE_NAME;
  const connectDB = await connectToDatabase();
  const toDo = await getAllData(connectDB, TABLE_NAME);
  console.log("todo object =>", toDo);

  try {
    let response;
    response = buildResponse(200, toDo)
    console.log(`getAllData => ${response.body}`);
    return response;
  } catch (err) {
      let errorResponse;
      errorResponse = buildResponse(502, "Internal server error");
      return errorResponse;
  }

}