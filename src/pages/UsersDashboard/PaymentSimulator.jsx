import { useEffect, useState } from "react";

const PaymentSimulator = ({ amount, onSuccess }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>Processing payment of ₹{amount}...</p>
      {loading && <p className="animate-pulse text-blue-500">Please wait...</p>}
    </div>
  );
};
