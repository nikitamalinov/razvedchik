import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import prisma from "@/lib/client";
import Mailgun from "mailgun-js";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  childrenInfo: z.string(),
  subscribe: z.boolean(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, childrenInfo, subscribe } = schema.parse(
      JSON.parse(req.body)
    );

    await prisma.joined.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        children_info: childrenInfo,
        subscribe: subscribe,
      },
    });

    const mg = Mailgun({
      apiKey: process.env.MAILGUN_API_KEY || "",
      domain: process.env.MAILGUN_DOMAIN || "",
    });

    let isSubed = subscribe ? "Yes" : "No";

    const data = {
      from: "Razvedchik.org <razvedchik.dnn@gmail.com>",
      to: [process.env.TO_EMAIL_ONE || "", process.env.TO_EMAIL_TWO || ""],
      subject: name + " joined.",
      "h:X-Mailgun-Variables": JSON.stringify({
        email: email,
        phone: phone,
        childrenInfo: childrenInfo,
        subscribe: isSubed,
      }),
      template: "joined",
    };

    mg.messages().send(data);

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
