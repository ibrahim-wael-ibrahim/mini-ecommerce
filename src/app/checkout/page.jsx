"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useGetOrderPriceQuery,
} from "@/features/order/orderApi";
import {
  useGetCartItemsQuery,
  useClearCartMutation,
} from "@/features/cart/cartApi";
import ProgressIndicator from "@/components/checkout/ProgressIndicator";
import LoginStep from "@/components/checkout/LoginStep";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import ReviewStep from "@/components/checkout/ReviewStep";
import SuccessStep from "@/components/checkout/SuccessStep";
import { getFormattedPriceComponents } from "@/utils/getFormattedPrice";
import BlobShape from "@/components/atoms/BlobShape";
import { useTranslations } from "next-intl";

const CheckoutController = () => {
  const t = useTranslations("checkout");
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingAddress, setShippingAddress] = useState({
    city: "",
    street: "",
    building: "",
  });
  const [sessionUrl, setSessionUrl] = useState(null); // New state for session_url

  const { token } = useSelector((state) => state.auth);
  const localCart = useSelector((state) => state.cart.items);
  const { data: serverCart = [] } = useGetCartItemsQuery(undefined, {
    skip: !token,
  });
  const { data: orderPrice } = useGetOrderPriceQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [clearCart] = useClearCartMutation();
  console.log(orderPrice);
  const cartItems = token ? serverCart : localCart;
  const [totalPriceS, totalPriceVal] = getFormattedPriceComponents(
    orderPrice?.data.grand_total,
  );

  const handleLoginSuccess = () => setCurrentStep(2);
  const handleAddressSubmit = (data) => {
    setShippingAddress(data);
    setCurrentStep(3);
  };
  const handlePaymentSubmit = () => setCurrentStep(4);
  const handleEditAddress = () => setCurrentStep(2);
  const handleEditPayment = () => setCurrentStep(3);

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        shipping_street_address: `${shippingAddress.street}, ${shippingAddress.building}`,
        shipping_country: "Egypt",
        shipping_state: shippingAddress.city,
        payment_method: paymentMethod,
      };
      const res = await createOrder(orderData).unwrap();
      res?.data?.session_url && setSessionUrl(res?.data?.session_url);
      await clearCart().unwrap();
      setCurrentStep(5);
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  useEffect(() => {
    if (token && currentStep === 1) setCurrentStep(2);
  }, [token]);

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <LoginStep onSuccess={handleLoginSuccess} />;
      case 2:
        return <AddressStep onSubmit={handleAddressSubmit} />;
      case 3:
        return (
          <PaymentStep
            method={paymentMethod}
            onMethodChange={setPaymentMethod}
            onSubmit={handlePaymentSubmit}
          />
        );
      case 4:
        return (
          <ReviewStep
            cartItems={cartItems}
            shippingAddress={shippingAddress}
            paymentMethod={paymentMethod}
            totalPriceS={totalPriceS}
            totalPriceVal={totalPriceVal}
            onEditAddress={handleEditAddress}
            onEditPayment={handleEditPayment}
            onCreateOrder={handleCreateOrder}
            isLoading={isLoading}
          />
        );
      case 5:
        return <SuccessStep sessionUrl={sessionUrl} />; // Pass sessionUrl to SuccessStep
      default:
        return <LoginStep onSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <section className="min-h-[80dvh] p-8 my-28 flex flex-col justify-start items-center mx-auto container">
      <div className="mx-auto px-4 py-8 w-full">
        {currentStep < 5 && (
          <>
            <ProgressIndicator currentStep={currentStep} />
            <div className="flex flex-col justify-start items-center w-full gap-2">
              <span className="w-full min-h-[0.1px] bg-customControlBg/60 mb-8" />
              <h1 className="lg:text-5xl text-3xl font-extrabold capitalize">
                {t("checkoutController.title")}
              </h1>
              <p className="opacity-60 capitalize">
                {t("checkoutController.subtitle")}
              </p>
            </div>
          </>
        )}
        <section className="mx-auto my-8 w-full container">
          {getStepContent()}
        </section>
      </div>
      <BlobShape
        PathSvg="/images/blob/BLOB_8.svg"
        dirX="right"
        dirY="top-1/4"
      />
      <BlobShape PathSvg="/images/blob/BLOB_9.svg" dirX="left" dirY="top-2/4" />
    </section>
  );
};

export default CheckoutController;
