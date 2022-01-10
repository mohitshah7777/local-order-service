import { buildResponse } from '../../services/buildResponse';
import { connectToDatabase } from '../../services/mongoConnect';
import { getOneData } from '../../services/query';
const ObjectID = require('mongodb').ObjectId;
require('dotenv').config();

export const handler = async (event, context) => {
    const id = event.pathParameters.id;
    const TABLE_NAME = process.env.TABLE_NAME;
    console.log("id =>",id);

    const connectDB = await connectToDatabase();
    const toDo = await getOneData(connectDB, TABLE_NAME, {id: id});
    console.log("todo object =>", toDo);

    try {
        let response;
        response = buildResponse(200, toDo)
        return response;
    } catch (err) {
        let errorResponse;
        errorResponse = buildResponse(502, "Internal server error");
      return errorResponse;
  }
}