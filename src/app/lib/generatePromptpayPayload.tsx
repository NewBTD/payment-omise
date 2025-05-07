import crc from 'crc';

function formatTLV(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
}

function formatPhone(phone: string): string {
  let number = phone.replace(/[^0-9]/g, '');
  if (number.startsWith('0')) {
    number = '66' + number.substring(1);
  }
  return number;
}

export function generatePromptpayPayload(phone: string, amount?: number): string {
  // ✅ สร้าง TLV สำหรับ Merchant Account (ซ้อนกัน)
  const merchantAccountInfo = [
    formatTLV('00', 'A000000677010111'), // AID for PromptPay
    formatTLV('01', formatPhone(phone))  // เบอร์พร้อมเพย์ (Tag 01)
  ].join('');
  
  // ✅ ต้อง wrap ซ้ำเป็น TLV ด้วย Tag 29
  const merchantAccountTLV = formatTLV('29', merchantAccountInfo);

  const payload = [
    formatTLV('00', '01'),       // Payload Format Indicator
    formatTLV('01', '11'),       // Point of Initiation Method (Dynamic)
    merchantAccountTLV,          // ✅ ใช้ Tag 29 ที่ถูก wrap แล้ว
    formatTLV('52', '0000'),     // Merchant Category Code
    formatTLV('53', '764'),      // Currency Code: THB
    amount ? formatTLV('54', amount.toFixed(2)) : '', // Amount
    formatTLV('58', 'TH'),       // Country Code
    formatTLV('59', 'Merchant'), // Merchant Name
    formatTLV('60', 'Bangkok'),  // Merchant City
  ].filter(Boolean); // remove any blank entries
  // ✅ คำนวณ CRC (Tag 63)
  const raw = payload.join('') + '6304';
  const crcValue = crc.crc16ccitt(Buffer.from(raw, 'utf8')).toString(16).toUpperCase().padStart(4, '0');
  return raw + crcValue;
}
