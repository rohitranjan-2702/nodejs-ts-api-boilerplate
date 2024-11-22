export function generateOTP(): number {
  // Generate a 6-digit numeric OTP
  let otp = Math.floor(100000 + Math.random() * 900000);
  console.log("Generated OTP: " + otp);

  return otp;
}

export const compareOTP = (receivedOTP: number, storedOTP: number): boolean => {
  return receivedOTP === storedOTP;
};
