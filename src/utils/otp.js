export const generateOTP = () => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 5; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
  return otp;
}