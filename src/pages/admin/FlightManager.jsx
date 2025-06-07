import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XCircle, PencilLine, Trash2 } from "lucide-react";

import FlightDetailsForm from "./FlightDetailsForm";
import {
  fetchFlights,
  saveFlight,
  removeFlight,
} from "../../features/flights/flightThunks";
import toast from "react-hot-toast";

const FlightManager = () => {
  const dispatch = useDispatch();

  const { flights, isLoading } = useSelector((state) => state.flights);

  const [showFlightForm, setShowFlightForm] = useState(false);
  const [flightToEdit, setFlightToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(flights.length / itemsPerPage);

  const paginatedFlights = flights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleAddNewFlightClick = () => {
    setFlightToEdit(null);
    setShowFlightForm(true);
  };

  const handleEditFlightClick = (flight) => {
    setFlightToEdit(flight);
    setShowFlightForm(true);
  };

  const handleSaveFlight = async (formData) => {
    await dispatch(saveFlight(formData));
    formData.id
      ? toast.success("Flight updated successfully!")
      : toast.success("Flight added successfully!");
    setShowFlightForm(false);
    setFlightToEdit(null);
  };

  const handleDeleteFlight = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      await dispatch(removeFlight(id));
      toast.success("Flight deleted successfully!");
    }
  };

  const handleCancelForm = () => {
    setShowFlightForm(false);
    setFlightToEdit(null);
  };

  return (
    <div className="container mx-auto mt-10 p-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        {!showFlightForm ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Flight Management
              </h3>
              <button
                onClick={handleAddNewFlightClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center gap-2"
              >
                Add New Flight
              </button>
            </div>

            <div className="relative overflow-x-auto mt-5 shadow-md rounded-lg border border-gray-200">
              {isLoading ? (
                <p className="text-center text-gray-600 py-10">
                  Loading flights...
                </p>
              ) : paginatedFlights.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3">Airline</th>
                      <th className="px-6 py-3">Route</th>
                      <th className="px-6 py-3">Departure</th>
                      <th className="px-6 py-3">Arrival</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFlights.map((flight) => {
                      const departureTime = flight.departureTime
                        ? new Date(flight.departureTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "N/A";
                      const arrivalTime = flight.arrivalTime
                        ? new Date(flight.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A";

                      return (
                        <tr
                          key={flight.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                            {flight.img && (
                              <img
                                src={flight.img}
                                alt={flight.airline}
                                className="h-8 w-8 object-contain"
                              />
                            )}
                            <div>
                              <p>{flight.airline}</p>
                              <p className="text-xs text-gray-500">
                                {flight.flightNumber}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {flight.from} → {flight.to}
                          </td>
                          <td className="px-6 py-4">
                            {departureTime} on {flight.travelDate || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            {arrivalTime} on {flight.travelDate || "N/A"}
                          </td>
                          <td className="px-6 py-4">₹{flight.price}</td>
                          <td className="px-6 py-4 flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditFlightClick(flight)}
                              className="p-2 bg-blue-100 rounded-md text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                            >
                              <PencilLine size={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFlight(flight.id)}
                              className="p-2 bg-red-100 rounded-md text-red-700 hover:bg-red-200 flex items-center gap-1"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center bg-gray-50 border-t"
                      >
                        <div className="flex justify-center gap-4 items-center">
                          <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Prev
                          </button>
                          <span className="font-semibold text-gray-800">
                            Page {currentPage} of {totalPages || 1}
                          </span>
                          <button
                            onClick={handleNext}
                            disabled={
                              currentPage === totalPages || totalPages === 0
                            }
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No flights found.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={handleCancelForm}
              className="absolute -top-4 -right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              title="Cancel"
            >
              <XCircle size={24} className="text-gray-600" />
            </button>
            <FlightDetailsForm
              initialData={flightToEdit}
              onSubmitForm={handleSaveFlight}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightManager;
