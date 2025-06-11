import { createSlice } from "@reduxjs/toolkit";
import {
  addFlight,
  deleteFlight,
  fetchFlights,
  updateFlight,
} from "./flightThunks";

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
      .addCase(addFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload);
      })
      .addCase(updateFlight.fulfilled, (state, action) => {
        const index = state.flights.findIndex(
          (f) => f.id === action.payload.id
        );
        if (index !== -1) state.flights[index] = action.payload;
      })
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((f) => f.id !== action.payload);
      });
  },
});

export default flightSlice.reducer;
