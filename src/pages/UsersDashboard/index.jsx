import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCurrentDate } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import FiltersPanel from "./FiltersPanel";
import FlightsList from "./FlightsList";
import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import { fetchFlights } from "../../features/flights/flightThunks";

const UserDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState("");
  const [searchData, setSearchData] = useState(null);

  const { flights: allFlights, isLoading } = useSelector(
    (state) => state.flights
  );

  const [filters, setFilters] = useState({
    timeslot: "",
    airlines: [],
    stops: "",
  });

  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  const handleSearch = (data) => {
    setSearchData(data);
    dispatch(fetchFlights());
  };

  useEffect(() => {
    if (!searchData) return;
    let results = [...allFlights];

    results = results.filter((flight) => {
      const matchFrom = flight.from === searchData.from;
      const matchTo = flight.to === searchData.to;
      const matchType = flight.type === searchData.type;
      const matchesDate = searchData.travelDate
        ? flight.travelDate === searchData.travelDate
        : true;

      return matchFrom && matchTo && matchType && matchesDate;
    });

    if (filters.airlines.length > 0) {
      results = results.filter((flight) =>
        filters.airlines.includes(flight.airline)
      );
    }

    if (filters.stops) {
      results = results.filter(
        (flight) => flight.stops === parseInt(filters.stops)
      );
    }

    if (filters.timeslot) {
      const timeRanges = {
        morning: [5, 12],
        afternoon: [12, 17],
        evening: [17, 20],
        night: [20, 24],
      };

      const [start, end] = timeRanges[filters.timeslot];

      results = results.filter((flight) => {
        const utcDate = new Date(flight.departureTime);

        const istOffsetMs = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(utcDate.getTime() + istOffsetMs);

        const hourIST = istDate.getHours();
        return hourIST >= start && hourIST < end;
      });
    }

    setFilteredFlights(results);
  }, [searchData, filters, allFlights]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      airlines: checked
        ? [...prev.airlines, value]
        : prev.airlines.filter((airline) => airline !== value),
    }));
  };

  const handleBook = (flight) => {
    localStorage.setItem("selectedFlight", JSON.stringify(flight));
    navigate("/booking");
  };

  return (
    <div className="container mx-auto min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex items-center justify-end my-2 ">
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-300 p-2 rounded-md text-red-700 font-semibold hover:bg-red-200 cursor-pointer flex items-center justify-center gap-1"
        >
          Logout <LogOut />
        </button>
      </div>
      <SearchForm
        register={register}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
        isSubmitting={isSubmitting}
        currentDate={currentDate}
      />

      <div className="flex flex-col lg:flex-row lg:gap-8 mt-8">
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div className="flights flex-grow bg-white rounded-md shadow-lg p-5">
          {isLoading ? (
            <div className="animate-pulse h-100 bg-gray-100 rounded-2xl flex items-center justify-center">
              <div class="loader"></div>
            </div>
          ) : filteredFlights.length > 0 ? (
            <FlightsList
              filteredFlights={filteredFlights}
              isLoading={isLoading}
              handleBook={handleBook}
            />
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No flights available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
