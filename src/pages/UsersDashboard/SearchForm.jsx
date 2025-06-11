import { ArrowRightLeft } from "lucide-react";
import Button from "../../components/common/Buttons/Button";

const SearchForm = (props) => {
  const { register, handleSubmit, handleSearch, isSubmitting, currentDate } =
    props;
  return (
    <form
      onSubmit={handleSubmit((data) => handleSearch(data))}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-5 bg-white rounded-lg shadow-lg mb-8"
    >
      <select
        {...register("type", { required: "Trip type is required" })}
        className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        <option value="">Trip Type</option>
        <option value="one-way">One Way</option>
        <option value="round-trip">Round Trip</option>
        <option value="multi-city">Multi City</option>
      </select>
      <select
        {...register("from", {
          required: "Origin city is required",
        })}
        className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        <option value="">Where From?</option>
        <option value="Pune">Pune IN</option>
        <option value="Mumbai">Mumbai IN</option>
        <option value="Delhi">Delhi IN</option>
        <option value="Kolkata">Kolkata IN</option>
        <option value="Goa">Goa IN</option>
        <option value="Hyderabad">Hyderabad IN</option>
        <option value="Chennai">Chennai IN</option>
      </select>
      <div className="flex items-center justify-center col-span-1">
        <ArrowRightLeft
          size={24}
          className="text-blue-500 self-center hidden sm:block"
        />
      </div>
      <select
        {...register("to", {
          required: "Destination city is required",
        })}
        className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        <option value="">Where To?</option>
        <option value="Pune">Pune IN</option>
        <option value="Mumbai">Mumbai IN</option>
        <option value="Delhi">Delhi IN</option>
        <option value="Kolkata">Kolkata IN</option>
        <option value="Goa">Goa IN</option>
        <option value="Hyderabad">Hyderabad IN</option>
        <option value="Chennai">Chennai IN</option>
      </select>
      <input
        type="date"
        min={currentDate}
        {...register("travelDate")}
        className="p-2 border border-gray-300 rounded-lg bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <Button
        onClick={() => {}}
        className="col-span-full lg:col-span-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {!isSubmitting ? "Search" : "Searching"}
      </Button>
    </form>
  );
};

export default SearchForm;
