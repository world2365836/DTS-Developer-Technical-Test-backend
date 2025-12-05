import crypto from "crypto";

export const generateUUID = () => {
  const date = new Date().getFullYear().toString();
  const randomStr = crypto.randomBytes(8).toString("hex");

  return `${date}${randomStr}`;
};
