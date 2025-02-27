import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.AUTH_GOOGLE_ID as string;
const googleSecret = process.env.AUTH_GOOGLE_SECRET as string;

console.log("Google ID:", googleId); // Add these
console.log("Google Secret:", googleSecret); // Add these

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
  debug: process.env.NODE_ENV === "development", // Enable debug mode
});

export { handler as GET, handler as POST };
