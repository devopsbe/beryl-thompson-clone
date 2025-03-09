import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/database";
import User from "@/models/User";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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
          const passwordMatch = await bcrypt.compare(credentials.password, user.password || '');
          
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }
          
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectToDB();
          console.log("Google sign-in attempt for:", user.email);
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            console.log("Existing user found:", existingUser.email);
            // Update the existing user's Google account info
            existingUser.name = user.name || existingUser.name;
            existingUser.image = user.image || existingUser.image;
            existingUser.emailVerified = new Date();
            
            // Add or update Google account
            const existingAccount = existingUser.accounts?.find(
              (acc: any) => acc.provider === "google"
            );
            
            if (!existingAccount) {
              if (!existingUser.accounts) {
                existingUser.accounts = [];
              }
              existingUser.accounts.push({
                provider: "google",
                providerAccountId: account.providerAccountId,
              });
            }
            
            await existingUser.save();
            console.log("User updated successfully");
          } else {
            console.log("Creating new user for:", user.email);
            // Create a new user
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
              role: "user",
              accounts: [
                {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                },
              ],
            });
            console.log("New user created successfully");
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image || token.picture;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role ?? "user";
        session.user.image = token.picture || null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure we redirect to a valid URL in our application
      console.log("Redirect callback called with URL:", url, "and baseURL:", baseUrl);
      
      // If the URL is relative or matches our base URL, allow it
      if (url.startsWith('/') || url.startsWith(baseUrl)) {
        return url;
      }
      
      // Default to home page
      return baseUrl;
    }
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 