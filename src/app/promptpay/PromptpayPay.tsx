"use client";
import QRCODE from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PromptpayPay() {
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function generateQR() {
      try {
        const res = await fetch("/api/promptpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: "0620031879", amount: 1 }),
        });
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        const url = await QRCODE.toDataURL(data.result, {
          errorCorrectionLevel: "H",
        });
        setQrUrl(url);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    generateQR();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        qrUrl && (
          <>
            <Image
              src={qrUrl}
              width={256}
              height={256}
              alt="PromptPay QR"
              className="mt-4 w-64 h-64"
            />
            <p className="text-sm text-[#A6A0A1]">
              ข้อมูลที่ระบุในคำสั่งซื้อนี้ของคุณ จะถูกนำไปสนับสนุนการพัฒนา
              บริการ และการใช้งานเว็บไซต์ของเรา
              เพื่อให้ประสบการณ์การใช้งานของคุณดียิ่งขึ้นท่านสามารถอ่านรายละเอียดเพิ่มเติมได้ที่{" "}
              <a href="" className="underline text-[#E69806] hover:opacity-90">
                นโยบายความเป็นส่วนตัว{" "}
              </a>
            </p>
          </>
        )
      )}
    </div>
  );
}
