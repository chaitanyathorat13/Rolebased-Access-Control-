import bcrypt from "bcryptjs";

export const hashPayload = async (payoad) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPayload = await bcrypt.hash(payoad, salt);
  return hashedPayload;
};

export const comparePayload = async (payload, hashedPayload) => {
  return await bcrypt.compare(payload, hashedPayload);
};
