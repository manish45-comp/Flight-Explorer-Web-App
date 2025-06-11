import { converToNormalTime, getTimeSlot } from "../../utils/helper";
import { ArrowRight } from "lucide-react";

const FlightCard = ({ flight, handleBook }) => {
  const timeslot = getTimeSlot(flight?.departureTime);

  return (
    <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6 rounded-xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Airline Info */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <img
          className="w-16 h-16 object-contain rounded-full border border-gray-200 p-1 bg-white"
          src={flight.img}
          alt="airline-logo"
        />
        <div>
          <p className="font-extrabold text-gray-900 text-lg leading-tight">
            {flight?.airline}
          </p>
          <p className="text-sm text-gray-500 font-medium tracking-wide">
            {flight?.flightNumber}
          </p>
        </div>
      </div>

      {/* Flight Route & Times */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-2 md:py-0 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
        <p className="text-sm font-semibold text-gray-600 mb-2">
          {flight?.from}{" "}
          <ArrowRight className="inline-block mx-1 text-gray-400" size={16} />{" "}
          {flight?.to}
        </p>

        <div className="flex items-center justify-center gap-8 w-full">
          <div className="flex flex-col items-center">
            <p className="font-bold text-gray-800 text-xl tracking-tight">
              {converToNormalTime(flight?.departureTime)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Departure</p>
          </div>

          <div className="flex flex-col items-center flex-grow mx-4">
            <p className="font-medium text-gray-700 text-sm mb-1">
              {flight?.stops > 0
                ? `${flight?.stops} Stop${flight?.stops > 1 ? "s" : ""}`
                : "Direct"}
            </p>
            <div className="w-full h-1 bg-blue-100 rounded-full relative flex items-center">
              <span className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="absolute right-0 w-3 h-3 bg-blue-500 rounded-full"></span>
            </div>
            <p className="text-xs font-semibold text-blue-600 mt-3">
              Timeslot: {timeslot}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-gray-800 text-xl tracking-tight">
              {converToNormalTime(flight?.arrivalTime)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Arrival</p>
          </div>
        </div>
      </div>

      {/* Booking Details & Price */}
      <div className="flex flex-col items-end gap-4 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Seats:{" "}
            <span className="font-semibold text-gray-700">
              {flight?.availableseats} Available
            </span>{" "}
            /{" "}
            <span className="font-semibold text-gray-700">
              {flight?.bookedseats} Booked
            </span>
          </p>
        </div>
        <p className="text-4xl font-extrabold text-blue-700 tracking-tight">
          ₹{flight?.price}
        </p>

        <button
          onClick={() => handleBook(flight)}
          className="px-8 py-3 cursor-pointer rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
