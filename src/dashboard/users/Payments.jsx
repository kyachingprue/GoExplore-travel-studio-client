import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY)
const Payments = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payments;