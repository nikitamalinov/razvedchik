import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import prisma from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let unserializedEvents = await prisma.calendar.findMany({
      orderBy: {
        from: "asc",
      },
    });

    const events = JSON.stringify(unserializedEvents, (_, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
