// import db config
import db from "..";

// collection name
const COLLECTION_NAME = "requests";

// mapping the request document
export type Request = {
  id?: string;
  apiId: string;
  keyword?: string;
  status: string;
  urls: string[];
};

// retrieve all clients
export const get = async (): Promise<Array<Request> | undefined> => {
  const snapshot = await db
    .collection(COLLECTION_NAME)
    .get()
    .catch((error) => {
      console.log(`Error getting documents from ${COLLECTION_NAME}`, error);
    });
  const data: Array<any> = [];

  if (snapshot) {
    snapshot.docs.map((_data) =>
      data.push({
        id: _data.id, 
        ..._data.data(), 
      })
    );

    // return and convert back it array of request
    return data as Array<Request>;
  }
};

// create a request
export const create = async (
  request: Request
): Promise<Request | undefined> => {
  const docRef = await db
    .collection(COLLECTION_NAME)
    .add(request)
    .catch((error) => {
      console.log(`Error creating the document on ${COLLECTION_NAME}`, error);
    });
  if (docRef) {
    // return created request
    return {
      id: docRef.id,
      ...request,
    } as Request;
  }
};

// update a request
export const update = async (
  id: string,
  request: Request
): Promise<Request | undefined> => {
  await db
    .collection(COLLECTION_NAME)
    .doc(id)
    .update(request)
    .catch((error) => {
      console.log(`Error updating the document from ${COLLECTION_NAME}`, error);
    });

  if (db) {
    // return updated request
    return {
      id: id,
      ...request,
    } as Request;
  }
};

// delete a request
export const remove = async (id: string) => {
  await db
    .collection(COLLECTION_NAME)
    .doc(id)
    .delete()
    .catch((error) => {
      console.log(`Error removing the document from ${COLLECTION_NAME}`, error);
    });
};
