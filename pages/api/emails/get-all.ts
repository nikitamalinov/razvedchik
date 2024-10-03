import prisma from "@/lib/client";
import { isValidToken } from "@/utils/auth";

import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken } = schema.parse(req.query);
  if (!isValidToken(email, idToken)) {
    return res.status(405).json({ message: "Invalid token" });
  }

  const emails = await prisma.users.findMany({
    where: {
      deleted_at: null,
    },
    select: {
      email: true,
    },
  });
  emails.sort();

  return res.status(200).json(emails);
}
