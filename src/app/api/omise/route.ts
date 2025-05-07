import { NextRequest, NextResponse } from "next/server";
import Omise from "omise";

const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY!,
  secretKey: process.env.OMISE_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  const { amount, token } = await req.json();

  try {
    const charge = await omise.charges.create({
      amount: amount * 100, // คูณ 100 (หน่วยสตางค์)
      currency: "thb",
      card: token,
    });

    return NextResponse.json({ charge });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
