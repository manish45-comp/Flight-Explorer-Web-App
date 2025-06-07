import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const booking = JSON.parse(localStorage.getItem("latestBooking"));

  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-700">No booking found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 antialiased">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full p-8 md:p-12 border border-gray-100 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />{" "}
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2 leading-tight">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 text-lg">Your adventure awaits.</p>
        </div>

        <div className="space-y-6 text-gray-700">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">Booking ID:</span>
            <span className="font-mono text-lg text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md tracking-wider">
              {booking.bookingId}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">Name:</span>
            <span className="text-gray-800 text-lg">
              {booking.passenger.name}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-blue-600 text-lg break-all">
              {booking.passenger.email}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">Flight:</span>
            <span className="text-gray-800 text-lg">
              {booking.airline}{" "}
              <span className="font-mono text-sm">
                ({booking.flightNumber})
              </span>
            </span>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600 block mb-1">
              Route:
            </span>
            <div className="text-lg text-gray-800 flex items-center justify-between">
              <span className="font-medium bg-gray-50 px-3 py-1 rounded-md">
                {booking.from}
              </span>
              <svg
                className="w-6 h-6 mx-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
              <span className="font-medium bg-gray-50 px-3 py-1 rounded-md">
                {booking.to}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">Departure:</span>
            <span className="text-gray-800 text-lg font-medium">
              {booking.departureTime}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t-2 border-emerald-100">
            <span className="font-bold text-xl text-emerald-700">
              Amount Paid:
            </span>
            <span className="font-extrabold text-2xl text-emerald-600">
              ₹{booking.price}
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            onClick={() => navigate("/dashboard")}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
