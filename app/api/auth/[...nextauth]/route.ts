import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/database";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectToDB();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          // If user doesn't exist
          if (!user) {
            throw new Error("No user found with this email");
          }
          
          // Check password
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
});

export { handler as GET, handler as POST }; 