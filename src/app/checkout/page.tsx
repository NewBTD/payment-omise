// app/checkout/page.tsx

import { Suspense } from "react";
import CheckoutPageContent from "./CheckoutPageContent";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  const productId = await searchParams.productId;

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <h2 className="text-3xl font-bold mb-6">รายละเอียดคำสั่งซื้อ</h2>

          <Suspense fallback={<p>กำลังโหลดสินค้า...</p>}>
            <CheckoutPageContent productId={productId} />
          </Suspense>
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">สรุปรายการสั่งซื้อ</h2>
        </div>
      </div>
    </div>
  );
}
