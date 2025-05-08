"use client";
import React, { useState } from "react";
import PromptpayPay from "../promptpay/PromptpayPay";
import CreditPay from "../creditcard/CreditPay";

const CheckoutPagePayment = () => {
  const [payType, setPayType] = useState<string>("credit");
  return (
    <div className="py-16 px-8 bg-gray-100 border rounded-t border-gray-300">
      <h2 className="text-2xl font-bold mb-4">การชำระเงิน</h2>

      <p className="mb-4">ช่องทางการชำระเงิน</p>
      {/* Radio Button เลือกรูปแบบการชำระเงิน */}
      <div className="mb-6 space-y-2 flex items-center gap-4">
        <label className="flex items-center space-x-2 m-0">
          <input
            type="radio"
            name="payment"
            value="credit"
            checked={payType === "credit"}
            onChange={() => setPayType("credit")}
          />
          <span>Credit Card</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="promptpay"
            checked={payType === "promptpay"}
            onChange={() => setPayType("promptpay")}
          />
          <span>QR Code (PromptPay)</span>
        </label>
      </div>

      {/* แสดงช่องทางการจ่ายตามที่เลือก */}
      {payType === "credit" && <CreditPay />}
      {payType === "promptpay" && <PromptpayPay />}
    </div>
  );
};

export default CheckoutPagePayment;
