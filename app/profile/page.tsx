'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/profile');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-t-4 border-primary border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-secondary-light dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-16 bg-background dark:bg-background-dark">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-8">My Profile</h1>
        
        <div className="bg-white dark:bg-background-darkAlt shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-white text-center md:text-left">
                <h2 className="text-2xl font-bold">{session?.user?.name || 'User'}</h2>
                <p className="text-white/80 mt-1">{session?.user?.email}</p>
                <p className="text-white/70 text-sm mt-1">
                  {session?.user?.role === 'admin' ? 'Administrator' : 'Member'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                  Account Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-secondary-light dark:text-gray-400 w-24">Name:</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.name || 'Not provided'}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary-light dark:text-gray-400 w-24">Email:</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.email}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary-light dark:text-gray-400 w-24">Member ID:</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.id.substring(0, 8)}...
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary-light dark:text-gray-400 w-24">Account Type:</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.role === 'admin' ? 'Administrator' : 'Standard Member'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                  Journey Progress
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-secondary-light dark:text-gray-400">Your Journey to Self</span>
                    <span className="text-sm text-primary dark:text-primary-light">25% Complete</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary dark:bg-primary-light w-1/4 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-secondary dark:text-white">Classes Attended</h4>
                      <p className="text-secondary-light dark:text-gray-400 text-xs">2 of 8 classes completed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-secondary dark:text-white">Next Appointment</h4>
                      <p className="text-secondary-light dark:text-gray-400 text-xs">No upcoming appointments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/account/classes" 
                className="btn btn-secondary dark:bg-gray-700 dark:text-white flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                My Classes
              </Link>
              <Link 
                href="/account/appointments" 
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 