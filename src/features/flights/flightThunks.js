import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BIN_ID = import.meta.env.VITE_BIN_ID;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "X-Master-Key":
    "$2a$10$n5T3OyMe4qBIZgmQHDH1Me541ZhwHcxfzZMXy05/4Pg0Fq57arjcW",
  "Content-Type": "application/json",
};

// ✅ Fetch all flights
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const response = await axios.get(`${BASE_URL}/latest`, { headers });
    return response.data.record;
  }
);

// ✅ Add a new flight
export const addFlight = createAsyncThunk(
  "flights/addFlight",
  async (newFlight, { getState }) => {
    const { flights } = getState().flights;
    const updatedFlights = [...flights, newFlight];

    await axios.put(BASE_URL, updatedFlights, { headers });
    return newFlight;
  }
);

// ✅ Update existing flight
export const updateFlight = createAsyncThunk(
  "flights/updateFlight",
  async (updatedFlight, { getState }) => {
    const { flights } = getState().flights;
    const updatedFlights = flights.map((flight) =>
      flight.id === updatedFlight.id ? updatedFlight : flight
    );
    await axios.put(BASE_URL, updatedFlights, { headers });
    return updatedFlight;
  }
);

// ✅ Delete a flight
export const deleteFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (flightId, { getState }) => {
    const { flights } = getState().flights;
    const updatedFlights = flights.filter((flight) => flight.id !== flightId);
    await axios.put(BASE_URL, updatedFlights, { headers });
    return flightId;
  }
);
