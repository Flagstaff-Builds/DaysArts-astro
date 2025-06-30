import contactInfoData from '../content/contactInfo.json';

export type ContactInfo = {
  email: string;
  phone?: string;
  facebookPage?: string;
};

export const contactInfo = contactInfoData as ContactInfo;

// Helper function to format phone number for tel: links
export function formatPhoneForTel(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  // Add +1 prefix if not present
  return cleaned.startsWith('1') ? `+${cleaned}` : `+1${cleaned}`;
}

// Helper function to format phone number for display
export function formatPhoneDisplay(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  // Return original if not 10 digits
  return phone;
}