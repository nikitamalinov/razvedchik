import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import prisma from "@/lib/client";

const schema = z.object({
  eventName: z.string().min(1).max(255),
  location: z.string().min(1).max(255),
  from: z.string().min(1).max(255),
  to: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  imageUrl: z.string(),
  buttonOption: z.string(),
  squareSiteLink: z.string(),
  ticketPrice: z.string(),
  disclaimer: z.string(),
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

    await prisma.calendar.create({
      data: {
        event_name: event.eventName,
        location: event.location,
        from: event.from,
        to: event.to,
        email: event.email,
        imageUrl: event.imageUrl,
        buttonOption: event.buttonOption,
        squareSiteLink: event.squareSiteLink,
        ticketPrice: event.ticketPrice,
        disclaimer: event.disclaimer,
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
