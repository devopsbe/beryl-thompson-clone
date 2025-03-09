'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import ProfileImageUploader from '@/components/profile/ProfileImageUploader';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/profile');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  const handleImageUpload = async (imageUrl: string) => {
    try {
      setNewProfileImage(imageUrl);
      
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile image');
      }

      // Update the session
      await update({
        ...session,
        user: {
          ...session?.user,
          image: imageUrl,
        },
      });
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = () => {
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary dark:text-white">My Profile</h1>
          {!isEditing && (
            <button
              onClick={toggleEditMode}
              className="btn btn-secondary dark:bg-gray-700 dark:text-white flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="bg-white dark:bg-background-darkAlt shadow-lg rounded-lg overflow-hidden">
          {isEditing ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-6 text-center">Edit Profile</h2>
              <ProfileEditForm onSave={handleEditSave} onCancel={handleEditCancel} />
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-primary to-primary-dark p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div 
                    className="relative w-32 h-32 cursor-pointer group"
                    onClick={() => setIsEditing(true)}
                  >
                    {session?.user?.image ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          fill 
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-primary text-4xl font-bold">
                        {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    
                    {/* Overlay with edit hint */}
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-white text-center md:text-left">
                    <h2 className="text-3xl font-bold">{session?.user?.name || 'User'}</h2>
                    <p className="text-white/80 mt-2">{session?.user?.email}</p>
                    <p className="text-white/70 text-sm mt-1">
                      {session?.user?.role === 'admin' ? 'Administrator' : 'Member'} · Joined recently
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Account Information
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <span className="text-secondary-light dark:text-gray-400 w-24">Name:</span>
                        <span className="text-secondary dark:text-white font-medium">
                          {session?.user?.name || 'Not provided'}
                        </span>
                      </li>
                      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <span className="text-secondary-light dark:text-gray-400 w-24">Email:</span>
                        <span className="text-secondary dark:text-white font-medium">
                          {session?.user?.email}
                        </span>
                      </li>
                      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <span className="text-secondary-light dark:text-gray-400 w-24">Member ID:</span>
                        <span className="text-secondary dark:text-white font-medium">
                          {session?.user?.id.substring(0, 8)}...
                        </span>
                      </li>
                      <li className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <span className="text-secondary-light dark:text-gray-400 w-24">Account Type:</span>
                        <span className="text-secondary dark:text-white font-medium">
                          {session?.user?.role === 'admin' ? 'Administrator' : 'Standard Member'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Journey Progress
                    </h3>
                    <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-secondary-light dark:text-gray-400">Your Journey to Self</span>
                        <span className="text-sm text-primary dark:text-primary-light">25% Complete</span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary dark:bg-primary-light w-1/4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
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
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
} 