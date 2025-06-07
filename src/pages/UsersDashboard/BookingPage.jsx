import { useState } from "react";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BookingPage = () => {
  const flight = JSON.parse(localStorage.getItem("selectedFlight"));
  const [step, setStep] = useState("details");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setStep("payment");
  };

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      const bookingId = "BK" + Date.now();

      const bookingDetails = {
        ...flight,
        passenger: getValues(),
        bookingId,
        status: "confirmed",
      };

      const history = JSON.parse(
        localStorage.getItem("bookingHistory") || "[]"
      );
      history.push(bookingDetails);
      localStorage.setItem("bookingHistory", JSON.stringify(history));
      localStorage.setItem("latestBooking", JSON.stringify(bookingDetails));

      navigate("/booking/confirmation");
    }, 2000);
  };

  if (!flight) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-700">No flight selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 antialiased">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full p-8 md:p-12 border border-gray-100 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
          Book Your Flight
        </h2>

        {step === "details" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              1. Complete your passenger details
            </h3>

            <div>
              <label className="font-semibold text-gray-700 mb-2 block">
                Gender:
              </label>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 text-lg text-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    value="Male"
                    {...register("gender", { required: true })}
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  Male
                </label>
                <label className="inline-flex items-center gap-2 text-lg text-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    value="Female"
                    {...register("gender", { required: true })}
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">Gender is required</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Name should be as per government ID
              </p>
              <div className="flex gap-4">
                <input
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                />
                <input
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                />
              </div>
              {(errors.firstName || errors.lastName) && (
                <p className="text-red-500 text-sm mt-1">
                  Name fields are required
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Date of Birth (DD-MM-YYYY)"
                {...register("dob", {
                  required: "Date of Birth is required",
                  pattern: {
                    value: /^\d{2}-\d{2}-\d{4}$/,
                    message: "Please enter DOB in format: DD-MM-YYYY",
                  },
                })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
              />
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <Info size={14} className="flex-shrink-0" />
                <span>Please enter DOB in format: 25-04-1998</span>
              </div>
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mt-8">
              2. Contact Details
            </h3>

            <div>
              <input
                placeholder="Mobile Number"
                {...register("phone", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Valid email is required",
                  },
                })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-gray-800">
              <p className="text-lg mb-2">
                <span className="font-semibold text-blue-700">Flight:</span>{" "}
                {flight.airline}{" "}
                <span className="font-mono text-sm text-blue-600">
                  ({flight.flightNumber})
                </span>
              </p>
              <p className="text-lg mb-3">
                <span className="font-semibold text-blue-700">Route:</span>{" "}
                <span className="font-medium bg-blue-100 px-2 py-0.5 rounded-md">
                  {flight.from}
                </span>{" "}
                →{" "}
                <span className="font-medium bg-blue-100 px-2 py-0.5 rounded-md">
                  {flight.to}
                </span>
              </p>
              <p className="text-3xl font-extrabold text-blue-800 mt-4">
                Total Price: ₹{flight.price}
              </p>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-6"
            >
              Proceed to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <div className="mt-4 text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              Complete Payment
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Processing payment of{" "}
              <span className="font-bold text-emerald-600">
                ₹{flight.price}
              </span>
              ...
            </p>
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin-slow"></div>
                <p className="animate-pulse text-emerald-600 text-xl font-medium">
                  Please wait, confirming your booking...
                </p>
              </div>
            ) : (
              <button
                onClick={handlePayment}
                className="w-full inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-6"
              >
                Make Payment
              </button>
            )}

            <style jsx>{`
              @keyframes spin-slow {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
              .animate-spin-slow {
                animation: spin-slow 1.5s linear infinite;
                border-top-color: #10b981; /* emerald-500 */
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
