"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    OmiseCard: any;
  }
}

export default function CreditCardPage() {
  useEffect(() => {
    window.OmiseCard.configure({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
    });
  }, []);

  const handlePay = () => {
    window.OmiseCard.open({
      frameLabel: "ร้านค้าของคุณ",
      buttonLabel: "ชำระเงิน",
      amount: 10000, // 100 บาท (หน่วยสตางค์)
      currency: "THB",
      onCreateTokenSuccess: async (token: string) => {
        const res = await fetch("/api/omise", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 100, // 100 บาท
            token,
          }),
        });

        const data = await res.json();
        if (data.charge?.status === "successful") {
          alert("ชำระเงินสำเร็จแล้ว!");
        } else {
          alert("มีบางอย่างผิดพลาด");
        }
      },
      onFormClosed: () => {},
    });
  };

  return (
    <div className="p-6">
      <button
        onClick={handlePay}
        className="p-2 bg-purple-500 text-white rounded"
      >
        จ่ายด้วยบัตรเครดิต (Omise)
      </button>
    </div>
  );
}
