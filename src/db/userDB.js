import { openDB } from "idb";

const DB_NAME = "FlightAppDB";
const STORE_NAME = "users";

export const initDB = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    },
  });
};

export const addUser = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};

export const getUser = async (email) => {
  const db = await initDB();
  return db.get(STORE_NAME, email);
};
