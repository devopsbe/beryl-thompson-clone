import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** User's ID */
      id: string;
      /** User's role */
      role?: 'user' | 'admin';
      /** User's profile image */
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    /** User's role */
    role?: 'user' | 'admin';
    /** User's profile image */
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** User's ID */
    id: string;
    /** User's role */
    role?: 'user' | 'admin';
    /** User's profile image */
    picture?: string;
  }
} 