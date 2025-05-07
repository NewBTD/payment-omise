// app/checkout/CheckoutPageContent.tsx

"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/Product";

export default function CheckoutPageContent({
  productId,
}: {
  productId?: string;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      // Mock การดึงข้อมูลสินค้า (จริงๆ จะ fetch จาก backend ได้)
      const products: Product[] = [
        { id: "p1", name: "รองเท้า", price: 1500, image: "/images/shoes.jpg" },
        { id: "p2", name: "กระเป๋า", price: 2000, image: "/images/bag.jpg" },
      ];

      const found = products.find((p) => p.id === productId);
      setProduct(found ?? null);
    }
  }, [productId]);

  if (!product) {
    return <p>ไม่พบสินค้าที่เลือก</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`ทำการสั่งซื้อ ${product.name} เรียบร้อยแล้ว!`);
  };

  return (
    <div id="order-detail" className="">
        <div className="flex justify-between">
         <p>รายการคำสั่งซื้อที่ {}</p>
         <div>
            <p></p>
            <p></p>
         </div>
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
