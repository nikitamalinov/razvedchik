import prisma from "@/lib/client";
import { isValidToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
  emailToDelete: z.string().email(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken, emailToDelete } = schema.parse(JSON.parse(req.body));
  if (!isValidToken(email, idToken)) {
    return res.status(405).json({ message: "Invalid token" });
  }

  await prisma.users.update({
    where: {
      email: emailToDelete,
    },
    data: {
      deleted_at: new Date(),
    },
  });

  return res.status(200).json({ message: "Success" });
}
