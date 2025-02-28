// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.AUTH_GOOGLE_ID as string;
const googleSecret = process.env.AUTH_GOOGLE_SECRET as string;

if (!googleId || !googleSecret) {
  console.error("AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET is not defined!");
  throw new Error("Google OAuth configuration is missing.");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name as string;
        token.picture = profile.picture as string;
        token.sub = profile.sub as string; 
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };