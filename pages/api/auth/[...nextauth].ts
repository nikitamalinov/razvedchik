import NextAuth from "next-auth";
import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/lib/client";
import GoogleProvider from "next-auth/providers/google";
const {
  AUTH0_CLIENT_ID = "",
  AUTH0_CLIENT_SECRET = "",
  AUTH0_ISSUER_BASE_URL = "",
  GOOGLE_CLIENT_ID: clientId = "",
  GOOGLE_CLIENT_SECRET: clientSecret = "",
} = process.env;

const redis = new Redis();

async function isEmailInRedis(email: string): Promise<boolean> {
  const isMember = await redis.sismember("emails", email);
  return isMember === 1;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId,
        clientSecret,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        if (user && user.email) {
          const isAllowedUser = await isEmailInRedis(user.email);
          if (isAllowedUser) {
            return true;
          }
        }
        return "/join-us";
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
    debug: true,
  });
}
