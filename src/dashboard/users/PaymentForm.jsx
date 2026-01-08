import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DollarSign, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [payLoading, setPayLoading] = useState(false);


  const { data: packageData, isLoading } = useQuery({
    queryKey: ["myPackage", id],
    enabled: !!id && !!user?.email,
    retry: false, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPackage/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPayLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setPayLoading(false);
      return;
    }

    const { error, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (error) {
      console.error(error);
      setPayLoading(false);
      return;
    }

    console.log("Payment Success:", paymentMethod);
    setPayLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-sky-500" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-sky-200 to-sky-300 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-6"
      >

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl overflow-hidden border border-gray-400"
        >
          <img
            src={packageData?.image}
            alt={packageData?.title}
            className="h-60 w-full object-cover"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold text-gray-800">
              {packageData?.title}
            </h2>

            <p className="flex items-center gap-1 text-lg font-semibold text-sky-600">
              <DollarSign size={18} />
              {packageData?.price}
            </p>

            <p className="text-sm text-gray-500">
              Purchased by: {packageData?.userEmail}
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-400 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#374151",
                    "::placeholder": { color: "#9ca3af" },
                  },
                  invalid: { color: "#ef4444" },
                },
              }}
            />
          </div>

          <motion.button
            whileHover={!payLoading ? { scale: 1.05 } : {}}
            whileTap={!payLoading ? { scale: 0.95 } : {}}
            disabled={!stripe || payLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition
              ${payLoading
                ? "bg-sky-300 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
              }
            `}
          >
            {payLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Payment ${packageData?.price}
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
