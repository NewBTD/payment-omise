"use client";
import React, { useState } from "react";
import PromptpayPay from "../promptpay/PromptpayPay";
import CreditPay from "../creditcard/CreditPay";

const CheckoutPagePayment = () => {
  const [payType, setPayType] = useState<string>("credit");
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false);
  return (
    <div className="py-16 px-8 bg-[#FCFCFC] border rounded-t  shadow-lg">
      {isPaySuccess ? (
        <>
          <div className="flex flex-col ">
            <a href="">
              <button className="py-4 border rounded-xl text-xl font-bold my-2 cursor-pointer w-full bg-[#E69806] text-white">
                เลือกดูสินค้าเพิ่มเติม
              </button>
            </a>
            <a href="">
              <button className="py-4 border rounded-xl text-xl font-bold my-2 cursor-pointer w-full text-[#E69806] ">
                กลับหน้าหลัก
              </button>
            </a>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-[32px] font-bold mb-4">การชำระเงิน</h2>
          <div className="bg-[#FFFFF7] p-6 rounded-2xl mb-4">
            <p className="mb-4 text-[#8C8485]">ช่องทางการชำระเงิน</p>
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
                <span className={payType === "credit" ? "font-bold" : ""}>
                  Credit Card
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="promptpay"
                  checked={payType === "promptpay"}
                  onChange={() => setPayType("promptpay")}
                />
                <span className={payType === "promptpay" ? "font-bold" : ""}>
                  QR Code (PromptPay)
                </span>
              </label>
            </div>
          </div>

          {/* แสดงช่องทางการจ่ายตามที่เลือก */}
          {payType === "credit" && <CreditPay setStatus={setIsPaySuccess} />}
          {payType === "promptpay" && <PromptpayPay />}
        </>
      )}
    </div>
  );
};

export default CheckoutPagePayment;
