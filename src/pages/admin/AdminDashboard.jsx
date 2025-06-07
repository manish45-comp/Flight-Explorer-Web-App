import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import BookingList from "./BookingLIst";
import RecentBookingCard from "./RecentBookingCard";
import FlightManager from "./FlightManager";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("bookingHistory") || "[]"));
  }, []);

  return (
    <div className="container mx-auto min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-gray-800 leading-tight">
          Admin Dashboard
        </h2>
        <button
          onClick={() => {
            dispatch(logout());
            toast.success("Logout Successfully");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          Logout <LogOut size={20} />
        </button>
      </div>

      <RecentBookingCard />
      <BookingList bookings={bookings} />
      <FlightManager />
    </div>
  );
};

export default AdminDashboard;
