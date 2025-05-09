"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

declare global {
  interface Window {
    Omise: any;
  }
}

export default function CreditPay({
  setStatus,
  amount,
}: {
  setStatus: Dispatch<SetStateAction<boolean>>;
  amount: number;
}) {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    amount: amount,
  });
  const [isOmiseReady, setOmiseReady] = useState(false);

  // 1️⃣ โหลดสคริปต์ และตั้งค่า publicKey
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.omise.co/omise.js";
    script.async = true;
    script.onload = () => {
      if (window.Omise) {
        window.Omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY!);
        setOmiseReady(true);
        console.log("Omise.js loaded and public key set");
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, cardNumber, expiryMonth, expiryYear, securityCode, amount } = form;

    // 2️⃣ ตรวจสอบว่าพร้อมสร้าง token หรือไม่
    if (!isOmiseReady || !window.Omise?.createToken) {
      alert("ระบบยังไม่พร้อม กรุณาลองใหม่อีกครั้ง");
      return;
    }

    // เรียกสร้างโทเค็นผ่าน Omise.createToken
    window.Omise.createToken(
      "card",
      {
        name,
        number: cardNumber,
        expiration_month: expiryMonth,
        expiration_year: expiryYear,
        security_code: securityCode,
      },
      async (statusCode: number, response: any) => {
        if (response.object === "error") {
          alert("เกิดข้อผิดพลาด: " + response.message);
          return;
        }
        const token = response.id;

        // ส่งโทเค็นไป backend เพื่อสร้าง charge
        const res = await fetch("/api/omise", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, token }),
        });
        const data = await res.json();

        if (data.charge?.status === "successful") {
          alert("ชำระเงินสำเร็จแล้ว!");
          setStatus(true);
        } else {
          alert("ชำระเงินไม่สำเร็จ โปรดลองใหม่");
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto rounded"
    >
      <label htmlFor="">หมายเลขบัตร</label>
      <input
        type="text"
        name="cardNumber"
        placeholder="1234  5678  9101  1121"
        value={form.cardNumber}
        onChange={handleChange}
        max="16"
        required
        className="w-full border-2 border-[#D2CFD0] p-2 rounded"
      />
      <input
        type="text"
        name="name"
        placeholder="ชื่อบนบัตร"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border-2 border-[#D2CFD0] p-2 rounded"
      />

      <div className="flex space-x-2">
        <input
          type="text"
          name="expiryMonth"
          placeholder="เดือนหมดอายุ (MM)"
          value={form.expiryMonth}
          onChange={handleChange}
          required
          className="w-1/2 border-2 border-[#D2CFD0] p-2 rounded"
        />
        <input
          type="text"
          name="expiryYear"
          placeholder="ปีหมดอายุ (YYYY)"
          value={form.expiryYear}
          onChange={handleChange}
          required
          className="w-1/2 border-2 border-[#D2CFD0] p-2 rounded"
        />
      </div>

      <input
        type="text"
        name="securityCode"
        placeholder="CVC"
        value={form.securityCode}
        onChange={handleChange}
        required
        className="w-full border-2 border-[#D2CFD0] p-2 rounded"
      />

      <button
        type="submit"
        disabled={!isOmiseReady}
        className="w-full bg-[#E69806] hover:opacity-80 cursor-pointer font-bold text-white py-2 rounded  disabled:bg-gray-400"
      >
        {isOmiseReady ? "ยืนยันการชำระเงิน" : "กำลังโหลด..."}
      </button>
      <p className="text-sm text-[#A6A0A1]">
        ข้อมูลที่ระบุในคำสั่งซื้อนี้ของคุณ จะถูกนำไปสนับสนุนการพัฒนา บริการ
        และการใช้งานเว็บไซต์ของเรา
        เพื่อให้ประสบการณ์การใช้งานของคุณดียิ่งขึ้นท่านสามารถอ่านรายละเอียดเพิ่มเติมได้ที่{" "}
        <a href="" className="underline text-[#E69806] hover:opacity-90">
          นโยบายความเป็นส่วนตัว{" "}
        </a>
      </p>
    </form>
  );
}
