import type { User } from "@/Types/user";
import { loadRazorpay } from "./loadRazorpay";
import type { initRazorpay, razorpayResponse } from "@/Types/payment/Order";
import verifyOrder from "./verifyOrder";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initRazorpayPayment = async (data: initRazorpay, user: User) => {
  const isLoaded = await loadRazorpay();

  if (!isLoaded) {
    console.error("Razorpay SDK failed to load");
    return;
  }

  const options = {
    key: data.keyId,
    amount: data.amount,
    currency: data.currency,
    order_id: data.orderId,
    name: "LearnKaro Ed",
    handler: (response: razorpayResponse) => {
      verifyOrder(response);
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
  };

  const paymentObj = new window.Razorpay(options);
  paymentObj.open();
};
