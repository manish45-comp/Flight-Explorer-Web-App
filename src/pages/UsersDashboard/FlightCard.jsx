import { converToNormalTime } from "../../utils/helper";
import { ArrowRight } from "lucide-react";

const FlightCard = ({ flight, handleBook }) => {
  return (
    <div className="mb-5 flex border border-gray-200 items-center gap-8 p-5 rounded-md bg-white shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-5">
        <img
          className="w-14 h-14 object-contain"
          src={flight.img}
          alt="airline-logo"
        />
        <div>
          <p className="font-bold text-gray-800">{flight.airline}</p>
          <p className="text-sm text-gray-600">{flight.flightNumber}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8 text-base">
        <p className="font-medium text-gray-800">
          {converToNormalTime(flight.departureTime)}
        </p>
        <div className="flex flex-col items-center w-24">
          <p className="font-medium text-gray-700 mb-1">{flight.stops} Stop</p>
          <ArrowRight className="text-gray-500" size={20} />
        </div>
        <p className="font-medium text-gray-800">
          {converToNormalTime(flight.arrivalTime)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            Available Seats: {flight.availableseats}
          </p>
          <p className="text-sm font-semibold text-gray-500">
            Booked Seats: {flight.bookedseats}
          </p>
        </div>
        <p className="text-2xl font-extrabold text-blue-700">₹{flight.price}</p>
        <button
          onClick={() => handleBook(flight)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
