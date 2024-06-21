import { isValidToken } from "@/utils/auth";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
  addedEmail: z.string().email()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken, addedEmail } = schema.parse(JSON.parse(req.body));
  if (!isValidToken(email, idToken)) {
    return res.status(405).json({ message: "Invalid token" });
  }
  await kv.sadd("adminWhiteList", addedEmail);
  return res.status(200).json({ message: "Success" });
}