const FiltersPanel = (props) => {
  const { filters, setFilters, handleCheckboxChange } = props;
  return (
    <div className="filters lg:min-w-[250px] border border-gray-200 p-4 rounded-md bg-white shadow-lg mb-6 lg:mb-0 h-min">
      <div className="flex items-center justify-between mb-6">
        <p className="font-semibold text-lg">Filters</p>
        <button
          className="text-blue-500 hover:text-blue-700 active:scale-95 transition-all cursor-pointer text-sm"
          onClick={() => setFilters({ timeslot: "", airlines: [], stops: "" })}
        >
          Clear Filters
        </button>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold text-gray-700">Time Slot</p>
        <select
          value={filters.timeslot}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, timeslot: e.target.value }))
          }
          className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
        >
          <option value="">All</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold text-gray-700">Airlines</p>
        {["Air India", "IndiGo", "SpiceJet", "Vistara", "Akasa Air"].map(
          (airline) => (
            <div key={airline} className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                value={airline}
                checked={filters.airlines.includes(airline)}
                onChange={handleCheckboxChange}
                className="accent-blue-500"
              />
              <label className="text-gray-700">{airline}</label>
            </div>
          )
        )}
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Stops</p>
        <select
          value={filters.stops}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, stops: e.target.value }))
          }
          className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
        >
          <option value={""}>All</option>
          <option value={"0"}>non-stop</option>
          <option value={"1"}>1-stop</option>
          <option value={"2"}>2-stop</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersPanel;
