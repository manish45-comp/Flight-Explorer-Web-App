import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import FlightReducer from "../features/flights/flightsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    flights: FlightReducer,
  },
});
