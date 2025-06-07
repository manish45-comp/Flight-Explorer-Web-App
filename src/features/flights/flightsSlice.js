// src/features/flights/flightSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchFlights, saveFlight, removeFlight } from "./flightThunks";

const initialState = {
  flights: [],
  isLoading: false,
  isError: null,
};

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })

      .addCase(saveFlight.fulfilled, (state, action) => {
        const { type, flight } = action.payload;
        if (type === "update") {
          state.flights = state.flights.map((f) =>
            f.id === flight.id ? flight : f
          );
        } else {
          state.flights.push(flight);
        }
      })

      .addCase(removeFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((f) => f.id !== action.payload);
      });
  },
});

export default flightSlice.reducer;
