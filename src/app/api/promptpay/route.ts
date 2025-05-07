import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'promptpay-qr';
import generatePayload from 'promptpay-qr'

// import { generatePromptpayPayload } from '../../lib/generatePromptpayPayload';

export async function POST(req: NextRequest) {
  const { phoneNumber, amount } = await req.json();

  try {
    console.log(amount);
    const result =  generatePayload(phoneNumber, {amount:amount})
    console.log('Result:', result);
    // const payload = generatePromptpayPayload(phoneNumber, amount);
    // const qrCodeUrl = await QRCode.toDataURL(payload, { errorCorrectionLevel: 'H' });
    // console.log('QR Code URL:', qrCodeUrl);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'สร้าง QR ไม่สำเร็จ', details: String(error) }, { status: 500 });
  }
}
