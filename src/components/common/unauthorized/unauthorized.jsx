import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the login/home page
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="shadow bg-blue-50 rounded-lg flex flex-col gap-6 items-center container w-[450px] p-8 text-center">
        <div className="my-5">
          <h1 className="text-3xl font-black text-red-600 mb-2">
            Unauthorized Access
          </h1>
          <p className="text-lg text-gray-700">
            You do not have permission to view this page.
          </p>
        </div>

        <p className="text-gray-600 text-sm">
          Please log in with appropriate credentials or contact support if you
          believe this is an error.
        </p>

        <button
          onClick={handleGoHome}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
