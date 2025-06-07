import FormLink from "../../components/common/FormLinks/FormLink";
import { useNavigate } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-8 items-center">
        <div className="mb-6 mt-2">
          <h1 className="text-3xl font-black text-gray-800">Register</h1>
        </div>

        <RegistrationForm />
        <FormLink
          text="Already have an Account?"
          actionText="Sign In"
          onActionClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Register;
