import { useState, useMemo } from "react";

function BookingList({ bookings = [] }) {
  const [search, setSearch] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("");

  const airlines = useMemo(() => {
    return Array.isArray(bookings)
      ? [...new Set(bookings.map((b) => b.airline))]
      : [];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (!Array.isArray(bookings)) return [];

    return bookings.filter((booking) => {
      const passengerName = `${booking.passenger?.firstName ?? ""} ${
        booking.passenger?.lastName ?? ""
      }`.toLowerCase();

      const matchesSearch = passengerName.includes(search.toLowerCase());
      const matchesAirline = airlineFilter
        ? booking.airline === airlineFilter
        : true;

      return matchesSearch && matchesAirline;
    });
  }, [bookings, search, airlineFilter]);

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by passenger name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
        />
        <select
          value={airlineFilter}
          onChange={(e) => setAirlineFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4"
        >
          <option value="">All Airlines</option>
          {airlines.map((airline) => (
            <option key={airline} value={airline}>
              {airline}
            </option>
          ))}
        </select>
      </div>

      {filteredBookings.length > 0 ? (
        <>
          <div className="hidden lg:grid grid-cols-5 gap-4 px-4 py-3 bg-gray-50 font-semibold text-sm text-gray-700 uppercase rounded-t-md border-b border-gray-200">
            <p>Booking ID</p>
            <p>Passenger</p>
            <p>Flight</p>
            <p>Route</p>
            <p>Amount</p>
          </div>

          {filteredBookings.map((booking, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-4 py-4 border-b border-gray-200 last:border-b-0 items-center"
            >
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800 lg:hidden">
                  Booking ID:{" "}
                </strong>
                {booking.bookingId}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800 lg:hidden">
                  Passenger:{" "}
                </strong>
                {booking.passenger?.firstName} {booking.passenger?.lastName}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800 lg:hidden">
                  Flight:{" "}
                </strong>
                {booking.airline} ({booking.flightNumber})
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800 lg:hidden">
                  From:{" "}
                </strong>
                {booking.from} → {booking.to}
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800 lg:hidden">
                  Amount:{" "}
                </strong>
                ₹{booking.price}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p className="text-gray-500 text-center py-10">No Booking Found</p>
      )}
    </div>
  );
}

export default BookingList;
