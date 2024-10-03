import prisma from "@/lib/client";

import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
const schema = z.object({
  email: z.string().email(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = schema.parse(req.query);

  const isInSet = await prisma.users.findFirst({
    where: {
      email: email,
      deleted_at: null,
    },
  });

  let isAllowed = false;
  if (isInSet) {
    isAllowed = true;
  }

  return res.status(200).json({ isAllowed: isAllowed });
}
