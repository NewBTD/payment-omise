// app/checkout/CheckoutPageContent.tsx

"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { Order } from "../types/Order";

export default function CheckoutPageContent({ orderId }: { orderId?: string }) {
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
    <div id="order-detail" className="">
      <div className="flex justify-between bg-gray-100 p-4 border rounded-t border-gray-300">
        <p className="font-bold">รายการคำสั่งซื้อที่ {order.id}</p>
        <div className="flex gap-4 items-center">
          <p className="font-bold">{order.date}</p>
          <p className="font-bold">เวลา {order.time}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4 border-gray-300 px-8">
        <div className="col-span-2">
          <p className="text-sm text-[#8C8485] font-bold">ชื่อ</p>
          <p>{order.fullName}</p>
        </div>
        <div className="col-span-3">
          <p className="text-sm text-[#8C8485] font-bold">อีเมล</p>
          <p>{order.email}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-[#8C8485] font-bold">เบอร์โทรศัพท์</p>
          <p>{order.phone}</p>
        </div>
        <div className="col-span-3">
          <p className="text-sm text-[#8C8485] font-bold">ที่อยู่</p>
          <p>{order.address}</p>
        </div>
        <div className="w-full h-[1px] bg-[#EDEDED] col-span-5"></div>
      </div>
      <div className="flex justify-between bg-gray-100 p-4 border rounded-b border-gray-300">
        <p className="font-bold">รวมทั้งสิ้น</p>
        <p className="font-bold">{order.net}</p>
      </div>
    </div>
    // <form onSubmit={handleSubmit} className="space-y-6">
    //   <div className="flex items-center space-x-4">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-24 h-24 object-cover rounded"
    //     />
    //     <div>
    //       <h2 className="text-xl font-semibold">{product.name}</h2>
    //       <p className="text-gray-600">฿{product.price.toLocaleString()}</p>
    //     </div>
    //   </div>

    //   <div>
    //     <label className="block text-sm font-medium mb-1">ชื่อ - นามสกุล</label>
    //     <input
    //       type="text"
    //       required
    //       placeholder="กรอกชื่อของคุณ"
    //       className="w-full border rounded p-2"
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-sm font-medium mb-1">
    //       ที่อยู่สำหรับจัดส่ง
    //     </label>
    //     <textarea
    //       required
    //       placeholder="กรอกที่อยู่"
    //       className="w-full border rounded p-2"
    //     ></textarea>
    //   </div>

    //   <div>
    //     <label className="block text-sm font-medium mb-1">
    //       วิธีการชำระเงิน
    //     </label>
    //     <select required className="w-full border rounded p-2">
    //       <option value="">เลือกวิธีการชำระเงิน</option>
    //       <option value="credit">บัตรเครดิต/เดบิต</option>
    //       <option value="bank">โอนผ่านธนาคาร</option>
    //       <option value="cod">เก็บเงินปลายทาง</option>
    //     </select>
    //   </div>

    //   <button
    //     type="submit"
    //     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    //   >
    //     ยืนยันคำสั่งซื้อ
    //   </button>
    // </form>
  );
}
