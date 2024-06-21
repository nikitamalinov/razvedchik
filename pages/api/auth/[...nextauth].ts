import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/lib/client";
import axios from "axios";
const {
  AUTH0_CLIENT_ID = "",
  AUTH0_CLIENT_SECRET = "",
  AUTH0_ISSUER_BASE_URL = "",
} = process.env;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      Auth0Provider({
        clientId: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        issuer: AUTH0_ISSUER_BASE_URL,
      }),
    ],
    callbacks: {
      async signIn({ user, profile, account }) {
        if (user && user.email) {
          const email = user.email;

          // Email Check
          const emailExists = await axios.get(
            `https://razvedchik.org/api/emails/get-value`,
            {
              params: { email: email },
            }
          );
          console.log("EE: ", emailExists);
          if (emailExists.data.isAllowed) {
            return true;
          }
        }
        return "/not-authorized";
      },
      async session({ session, token, user }) {
        session.idToken = token.idToken || "";
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.idToken = account.id_token;
        }
        return token;
      },
    },
    pages: {
      // error: "/auth/error",
    },
    debug: true,
  });
}
