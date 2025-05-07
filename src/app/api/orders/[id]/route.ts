import { NextRequest, NextResponse } from "next/server";
import { orders } from "../../../mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const order = orders.find((p) => p.id === id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error); // เพื่อ debug เพิ่มเติม
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
