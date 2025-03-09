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
    } & DefaultSession['user'];
  }

  interface User {
    /** User's role */
    role?: 'user' | 'admin';
  }
} 