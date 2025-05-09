
// app/checkout/page.tsx

import { Suspense } from "react";
import CheckoutPageContent from "./CheckoutPageContent";
import CheckoutPagePayment from "./CheckoutPagePayment";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = await searchParams.orderId;

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <h2 className="text-3xl font-bold mb-6">รายละเอียดคำสั่งซื้อ</h2>

          <Suspense fallback={<p>กำลังโหลดสินค้า...</p>}>
            <CheckoutPageContent orderId={orderId} />
          </Suspense>
        </div>
        <div className="col-span-2">
          <CheckoutPagePayment orderId={orderId} />
        </div>
      </div>
    </div>
  );
}
