import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import useIdleTimer from "./hooks/useIdleTimer";
import UserDashboard from "./pages/UsersDashboard";
import BookingPage from "./pages/UsersDashboard/BookingPage";
import BookingConfirmation from "./pages/UsersDashboard/BookingConfirmation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FlightDetailsForm from "./pages/admin/FlightDetailsForm";
import toast, { Toaster } from "react-hot-toast";
import UnauthorizedPage from "./components/common/unauthorized/unauthorized";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIdle = () => {
    dispatch(logout());
    navigate("/");
    toast("You have been logged out due to inactivity.", {
      icon: "😒",
    });
  };

  useIdleTimer(handleIdle, 5 * 60 * 1000);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/flightdetails-form"
          element={
            <ProtectedRoute role="admin">
              <FlightDetailsForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/booking"
          element={
            <ProtectedRoute role="user">
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/confirmation"
          element={
            <ProtectedRoute role="user">
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
