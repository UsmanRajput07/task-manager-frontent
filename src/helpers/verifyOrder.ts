import payment from "@/sevices/payment";
import type { razorpayResponse } from "@/Types/payment/Order";
import { toast } from "sonner";

const verifyOrder = async (data: razorpayResponse) => {
  try {
    const res = await payment.verifyOrder({
      razorpayOrderId: data.razorpay_order_id,
      razorpayPaymentId: data.razorpay_payment_id,
    });
    if (res.status === 200) {
      toast.success("payment verified");
    }
    // return res;
  } catch {
    toast.error("failed to verify payment");
    return;
  }
};

export default verifyOrder;
