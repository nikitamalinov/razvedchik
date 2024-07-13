import { isValidToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import prisma from "@/lib/client";

const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, idToken } = schema.parse(req.query);
    if (!isValidToken(email, idToken)) {
      return res.status(405).json({ message: "Invalid token" });
    }

    let response = await prisma.folderOrder.findMany({
      orderBy: {
        ordinalNumber: "desc",
      },
      select: {
        cloudinaryName: true,
      },
    });

    const album = response.map((obj: any) => {
      return obj.cloudinaryName;
    });

    album.push("Other Photos");

    return res.status(200).json(album);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
