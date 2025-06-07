import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Define a mapping of airlines to their image URLs
const AIRLINE_IMAGES = {
  IndiGo:
    "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/6E.svg",
  "Air India":
    "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/AI.svg",
  SpiceJet:
    "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/SG.svg",
  Vistara:
    "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/UK.svg",
  "Akasa Air":
    "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/QP.svg",
  // Add more airlines and their corresponding image URLs here
};

const FlightDetailsForm = ({ initialData = {}, onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData,
  });

  const selectedAirline = watch("airline");
  const [airlineImage, setAirlineImage] = useState("");

  // Update airline image when selectedAirline changes
  useEffect(() => {
    if (selectedAirline && AIRLINE_IMAGES[selectedAirline]) {
      setAirlineImage(AIRLINE_IMAGES[selectedAirline]);
      setValue("img", AIRLINE_IMAGES[selectedAirline]); // Set the img field value in the form data
    } else {
      setAirlineImage("");
      setValue("img", "");
    }
  }, [selectedAirline, setValue]);

  const onSubmit = (data) => {
    onSubmitForm(data);
  };

  const commonInputClasses =
    "w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {initialData?.flightNumber ? "Edit Flight Details" : "Add New Flight"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
      >
        {/* Flight Number */}
        <div>
          <label htmlFor="flightNumber" className={labelClasses}>
            Flight Number
          </label>
          <input
            id="flightNumber"
            type="text"
            {...register("flightNumber", {
              required: "Flight number is required",
            })}
            className={commonInputClasses}
          />
          {errors?.flightNumber && (
            <p className={errorClasses}>{errors.flightNumber.message}</p>
          )}
        </div>

        {/* Airline */}
        <div>
          <label htmlFor="airline" className={labelClasses}>
            Airline
          </label>
          <select
            id="airline"
            {...register("airline", { required: "Airline is required" })}
            className={commonInputClasses + " cursor-pointer"}
          >
            <option value="">Select Airline</option>
            {Object.keys(AIRLINE_IMAGES).map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
          {errors.airline && (
            <p className={errorClasses}>{errors.airline.message}</p>
          )}
        </div>

        {/* Airline Image Preview */}
        {airlineImage && (
          <div className="md:col-span-2 flex justify-center py-2">
            <img
              src={airlineImage}
              alt={selectedAirline}
              className="h-16 w-auto object-contain"
            />
          </div>
        )}

        {/* From City */}
        <div>
          <label htmlFor="from" className={labelClasses}>
            From
          </label>
          <select
            id="from"
            {...register("from", { required: "Origin city is required" })}
            className={commonInputClasses + " cursor-pointer"}
          >
            <option value="">Select Origin</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Goa">Goa</option>
          </select>
          {errors.from && <p className={errorClasses}>{errors.from.message}</p>}
        </div>

        {/* To City */}
        <div>
          <label htmlFor="to" className={labelClasses}>
            To
          </label>
          <select
            id="to"
            {...register("to", { required: "Destination city is required" })}
            className={commonInputClasses + " cursor-pointer"}
          >
            <option value="">Select Destination</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Goa">Goa</option>
          </select>
          {errors.to && <p className={errorClasses}>{errors.to.message}</p>}
        </div>

        {/* Departure Time */}
        <div>
          <label htmlFor="departureTime" className={labelClasses}>
            Departure Time
          </label>
          <input
            id="departureTime"
            type="datetime-local" // Use datetime-local for both date and time
            {...register("departureTime", {
              required: "Departure time is required",
            })}
            className={commonInputClasses}
          />
          {errors.departureTime && (
            <p className={errorClasses}>{errors.departureTime.message}</p>
          )}
        </div>

        {/* Arrival Time */}
        <div>
          <label htmlFor="arrivalTime" className={labelClasses}>
            Arrival Time
          </label>
          <input
            id="arrivalTime"
            type="datetime-local" // Use datetime-local for both date and time
            {...register("arrivalTime", {
              required: "Arrival time is required",
            })}
            className={commonInputClasses}
          />
          {errors.arrivalTime && (
            <p className={errorClasses}>{errors.arrivalTime.message}</p>
          )}
        </div>

        {/* Travel Date - Can be derived from departureTime but explicitly asked for */}
        {/* If travelDate is meant to be separate, keep it. Otherwise, it's redundant with datetime-local.
            For simplicity and given the example, I'll assume it might be useful to keep it as a simple date. */}
        <div>
          <label htmlFor="travelDate" className={labelClasses}>
            Travel Date
          </label>
          <input
            id="travelDate"
            type="date"
            {...register("travelDate", { required: "Travel date is required" })}
            className={commonInputClasses}
          />
          {errors.travelDate && (
            <p className={errorClasses}>{errors.travelDate.message}</p>
          )}
        </div>

        {/* Stops */}
        <div>
          <label htmlFor="stops" className={labelClasses}>
            Stops
          </label>
          <input
            id="stops"
            type="number"
            {...register("stops", {
              required: "Number of stops is required",
              min: 0,
              valueAsNumber: true,
            })}
            className={commonInputClasses}
          />
          {errors.stops && (
            <p className={errorClasses}>{errors.stops.message}</p>
          )}
        </div>

        {/* available seats */}
        <div>
          <label htmlFor="availableseats" className={labelClasses}>
            Available Seats
          </label>
          <input
            id="availableseats"
            type="number"
            {...register("availableseats", {
              required: "Available Seats is required",
              min: 0,
              valueAsNumber: true,
            })}
            className={commonInputClasses}
          />
          {errors.price && (
            <p className={errorClasses}>{errors.pravailableseatsice.message}</p>
          )}
        </div>

        {/* booked seats */}
        <div>
          <label htmlFor="bookedseats" className={labelClasses}>
            Booked Seats
          </label>
          <input
            id="bookedseats"
            type="number"
            {...register("bookedseats", {
              required: "Booked Seats is required",
              min: 0,
              valueAsNumber: true,
            })}
            className={commonInputClasses}
          />
          {errors.price && (
            <p className={errorClasses}>{errors.pravailableseatsice.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className={labelClasses}>
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            {...register("price", {
              required: "Price is required",
              min: 0,
              valueAsNumber: true,
            })}
            className={commonInputClasses}
          />
          {errors.price && (
            <p className={errorClasses}>{errors.price.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className={labelClasses}>
            Trip Type
          </label>
          <select
            id="type"
            {...register("type", { required: "Trip type is required" })}
            className={commonInputClasses + " cursor-pointer"}
          >
            <option value="">Select Trip Type</option>
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="multi-city">Multi City</option>
          </select>
          {errors.type && <p className={errorClasses}>{errors.type.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting
              ? "Saving..."
              : initialData?.flightNumber
              ? "Update Flight"
              : "Add Flight"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightDetailsForm;
