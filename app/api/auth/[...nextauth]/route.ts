import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


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
    signIn: '/auth/signin', 
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };


