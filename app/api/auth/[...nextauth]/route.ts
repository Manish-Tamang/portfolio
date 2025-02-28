import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    id: string;
  }
}

const googleId = process.env.AUTH_GOOGLE_ID as string;
const googleSecret = process.env.AUTH_GOOGLE_SECRET as string;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id as string; 
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", 
});

export { handler as GET, handler as POST };
