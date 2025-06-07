import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFlight,
  updateFlight,
  getAllFlights,
  deleteFlight,
} from "../../db/flightDB";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const flights = await getAllFlights();
    return flights;
  }
);

export const saveFlight = createAsyncThunk(
  "flights/saveFlight",
  async (formData, { getState }) => {
    if (formData.id) {
      await updateFlight(formData);
      return { type: "update", flight: formData };
    } else {
      const newFlight = { ...formData, id: `FL${Date.now()}` };
      await addFlight(newFlight);
      return { type: "add", flight: newFlight };
    }
  }
);

export const removeFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (id) => {
    await deleteFlight(id);
    return id;
  }
);
