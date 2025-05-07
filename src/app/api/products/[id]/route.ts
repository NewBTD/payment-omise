import { NextRequest, NextResponse } from "next/server";
import { products } from "../../../mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error); // เพื่อ debug เพิ่มเติม
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
