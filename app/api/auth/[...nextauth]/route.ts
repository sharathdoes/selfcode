import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";

console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✓ Set" : "✗ Missing");

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        
        try {
          const user = await prisma.user.findUnique({ 
            where: { email: credentials.email } 
          });
          
          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log("❌ Invalid password");
            return null;
          }

          console.log("✅ User authenticated successfully");
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  // Remove session config to use database sessions with Prisma adapter
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? undefined;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    async session({ session, token, user }) {
     
      // With database sessions, user object is available
      if (user) {
        session.user.id = user.id;
      }
      // With JWT sessions, token is available
      else if (token) {
        session.user.id = token.id;
        session.user.name = token.name ?? undefined;
        session.user.email = token.email ?? undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  debug: true,
  logger: {
    error(code, metadata) {
    },
    warn(code) {
    },
    debug(code, metadata) {
    },
  },
});

export { handler as GET, handler as POST };