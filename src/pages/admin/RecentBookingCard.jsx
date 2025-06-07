import {
  ArrowBigRight,
  Calendar,
  IndianRupee,
  Pin,
  Plane,
  Ticket,
} from "lucide-react";
import { useEffect, useState } from "react";

const RecentBookingCard = () => {
  const [latestbooking, setLatestBooking] = useState({});
  useEffect(() => {
    setLatestBooking(JSON.parse(localStorage.getItem("latestBooking") || {}));
  }, []);
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-6">
      <p className="text-xl font-bold text-gray-800 mb-5">Recent Booking</p>
      {latestbooking ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Ticket className="text-red-400" />
            </span>
            <p className="text-gray-700">
              <strong className="font-medium text-gray-800">
                Booking ID:{" "}
              </strong>
              {latestbooking.bookingId}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">👤</span>
            <p className="text-gray-700">
              <strong className="font-medium text-gray-800">Passenger: </strong>
              {latestbooking.passenger?.firstName}{" "}
              {latestbooking.passenger?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Plane className="text-amber-300" />
            </span>
            <p className="text-gray-700">
              <strong className="font-medium text-gray-800">Flight: </strong>
              {latestbooking.airline} ({latestbooking.flightNumber})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Pin className="text-orange-400" />
            </span>
            <p className="text-gray-700">
              <strong className="font-medium text-gray-800">Route: </strong>
            </p>
            {latestbooking.from} <ArrowBigRight /> {latestbooking.to}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Calendar />
            </span>

            <p className="text-gray-700">
              <strong className="font-medium text-gray-800">Date: </strong>
              {latestbooking.travelDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <IndianRupee className="text-green-500" />
            </span>
            <p className="text-lg font-bold text-blue-600">
              ₹{latestbooking.price}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No recent bookings found.
        </p>
      )}
    </div>
  );
};

export default RecentBookingCard;
