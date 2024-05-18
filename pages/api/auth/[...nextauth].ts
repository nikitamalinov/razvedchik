import NextAuth from "next-auth";
import Redis from "ioredis";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/lib/client";

const {
import GoogleProvider from "next-auth/providers/google";
  AUTH0_CLIENT_ID = "",
  AUTH0_CLIENT_SECRET = "",
const redis = new Redis();

async function isEmailInRedis(email: string): Promise<boolean> {
  const isMember = await redis.sismember("emails", email);
  return isMember === 1;
}
  AUTH0_ISSUER_BASE_URL = "",
} = process.env;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      Auth0Provider({
        clientId: AUTH0_CLIENT_ID,
  GOOGLE_CLIENT_ID: clientId = "",
  GOOGLE_CLIENT_SECRET: clientSecret = "",
} = process.env;
  
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
        return '/join-us';
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
    debug: true,
  });
}
        clientSecret: AUTH0_CLIENT_SECRET,
        issuer: AUTH0_ISSUER_BASE_URL,
      }),
    ],
    callbacks: {
      async signIn({ user, profile, account }) {
        console.log("user: ", user);
        console.log("profile", profile);
        console.log("account", account);

        let emailList = [
          process.env.ADMIN_ONE || "",
          process.env.ADMIN_TWO || "",
          process.env.ADMIN_THREE || "",
          process.env.ADMIN_FOUR || "",
        ];
        if (user && user.email) {
          if (emailList.includes(user.email)) {
            return true;
          } else {
            const isAllowedUser = await prisma.admin.findUnique({
              where: {
                email: user.email,
              },
              select: {
                email: true,
              },
            });
            if (isAllowedUser !== undefined) {
              return true;
            }
          }
        }
        return false;
      },
    },
    pages: {
      // error: "/auth/error",
    },
    debug: true,
  });
}
