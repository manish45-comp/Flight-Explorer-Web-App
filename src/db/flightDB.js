import { openDB } from "idb";

const DB_NAME = "FlightAppDB";
const FLIGHT_STORE = "flights";

// Initialize the database and create the flight store if it doesn't exist
export const initFlightDB = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FLIGHT_STORE)) {
        db.createObjectStore(FLIGHT_STORE, { keyPath: "id" }); // "id" should be unique for each flight
      }
    },
  });
};

// Add a new flight
export const addFlight = async (flight) => {
  const db = await initFlightDB();
  await db.add(FLIGHT_STORE, flight);
};

// Get a flight by its ID
export const getFlight = async (id) => {
  const db = await initFlightDB();
  return db.get(FLIGHT_STORE, id);
};

// Update a flight (by overwriting the existing record with same ID)
export const updateFlight = async (flight) => {
  const db = await initFlightDB();
  await db.put(FLIGHT_STORE, flight);
};

// Delete a flight by ID
export const deleteFlight = async (id) => {
  const db = await initFlightDB();
  await db.delete(FLIGHT_STORE, id);
};

// Get all flights
export const getAllFlights = async () => {
  const db = await initFlightDB();
  return db.getAll(FLIGHT_STORE);
};
