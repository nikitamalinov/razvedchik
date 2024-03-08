import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import prisma from "@/lib/client";

const schema = z.object({
  email: z.string().email(),
  eventId: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const event = schema.parse(req.body);

    await prisma.calendar.delete({
      where: {
        id: parseInt(event.eventId.slice(0, -1)),
      },
    });

    res.status(200).json({ message: "Event Created" });
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
