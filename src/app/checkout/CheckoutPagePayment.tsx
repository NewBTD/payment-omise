"use client";
import React, { useEffect, useState } from "react";
import PromptpayPay from "../promptpay/PromptpayPay";
import CreditPay from "../creditcard/CreditPay";
import { Order } from "../types/Order";
import Image from "next/image";

const CheckoutPagePayment = ({ orderId }: { orderId?: string }) => {
  const [payType, setPayType] = useState<string>("credit");
  const [isPaySuccess, setIsPaySuccess] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // ✅ สร้าง async function ภายใน useEffect
    const fetchOrder = async (id: string) => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Order = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setOrder(null);
      }
    };

    if (orderId) {
      fetchOrder(orderId); // ✅ เรียก async function ตรงนี้
    } else {
      setOrder(null);
    }
  }, [orderId]);

  if (!order) {
    return <p>ไม่พบสินค้าที่เลือก</p>;
  }
  return (
    <div className="py-16 px-8 bg-[#FCFCFC] rounded-2xl shadow-lg">
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
          <div className="grid grid-cols-6 gap-2 my-2">
            {/* wrapper ต้องเป็น relative และยืดเต็มความสูง */}
            <div className="col-span-1 relative h-full rounded overflow-hidden">
              <Image
                src={order.product.images[0]}
                alt={order.product.description}
                fill // ให้ Image ขยายเต็ม container
                style={{ objectFit: "cover" }} // ให้รูปครอบเต็มโดยไม่เสียอัตราส่วน
              />
            </div>
            <div className="col-span-5 py-4">
              <p className="font-bold">{order.product.name}</p>
              <div className="flex justify-between">
                <p>X1</p>
                <p>{order.net}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFF7] px-6 py-2 rounded-2xl my-4">
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
          {payType === "credit" && (
            <CreditPay amount={order.net} setStatus={setIsPaySuccess} />
          )}
          {payType === "promptpay" && <PromptpayPay amount={order.net} />}
        </>
      )}
    </div>
  );
};

export default CheckoutPagePayment;
