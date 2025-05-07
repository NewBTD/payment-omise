"use client";
import QRCODE from "qrcode";
import Image from "next/image";
import { useState } from "react";

export default function PromptPayPage() {
  const [qrUrl, setQrUrl] = useState<string>("");

  async function handleGenerateQR() {
    const res = await fetch("/api/promptpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: "0620031879", amount: 1 }),
    });

    const data = await res.json();
    // setQrUrl(data.result);
    const qrcodeUrl = await QRCODE.toDataURL(data.result, {
      errorCorrectionLevel: "H",
    });
    setQrUrl(qrcodeUrl);
    // {QRCODE.toDataURL(qrUrl, { errorCorrectionLevel: 'H' })}
  }

  return (
    <div className="p-6">
      <button
        onClick={handleGenerateQR}
        className="p-2 bg-blue-600 text-white rounded"
      >
        สร้าง QR พร้อมเพย์
      </button>
      {qrUrl && (
        <Image src={qrUrl} alt="PromptPay QR" className="mt-4 w-64 h-64" />
      )}
    </div>
  );
}
