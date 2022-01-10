export const getAllData = (db, table) => {
    return db
        .collection(table)
        .find()
        .toArray();
}
export const getOneData = (db, table, data) => {
    return db
        .collection(table)
        .findOne(data)
}

export const insertData = (db, table, data) => {
    return db
        .collection(table)
        .insertOne(data);
}

export const updateData = (db, table, filter, dataToUpdate) => {
    return db
        .collection(table)
        .updateOne(filter, dataToUpdate)
}

export const deleteData = (db, table, data) => {
    return db
        .collection(table)
        .deleteOne(data)
}