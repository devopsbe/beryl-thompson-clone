'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/profile');
    } else if (status === 'authenticated') {
      setLoading(false);
      // Set profile image if available in session
      if (session?.user?.image) {
        setProfileImage(session.user.image);
      }
    }
  }, [status, router, session]);

  // Handle profile image click
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFeedbackMessage({
        type: 'error',
        text: 'Please select a valid image file (JPEG, PNG, GIF, or WEBP)'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFeedbackMessage({
        type: 'error',
        text: 'Image size must be less than 5MB'
      });
      return;
    }

    try {
      setUploadingImage(true);
      setFeedbackMessage(null);

      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Upload image
      const response = await fetch('/api/user/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      // Update local state
      setProfileImage(data.image);
      
      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          image: data.image
        }
      });

      setFeedbackMessage({
        type: 'success',
        text: 'Profile image updated successfully'
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setFeedbackMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to upload image'
      });
    } finally {
      setUploadingImage(false);
    }
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
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-8">My Profile</h1>
        
        {feedbackMessage && (
          <div className={`mb-6 p-4 rounded-md ${
            feedbackMessage.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'
          }`}>
            {feedbackMessage.text}
          </div>
        )}
        
        <div className="bg-white dark:bg-background-darkAlt shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-dark p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image with Upload Capability */}
              <div 
                className="relative group cursor-pointer"
                onClick={handleProfileImageClick}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border-4 border-white/30">
                  {profileImage ? (
                    <div className="w-full h-full relative">
                      <Image 
                        src={profileImage} 
                        alt={session?.user?.name || 'User'} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-white text-5xl font-bold">
                      {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                    {uploadingImage ? (
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-white/80 text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to change
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="text-white text-center md:text-left">
                <h2 className="text-3xl font-bold">{session?.user?.name || 'User'}</h2>
                <p className="text-white/80 mt-2 text-lg">{session?.user?.email}</p>
                <div className="inline-block mt-3 px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm">
                  {session?.user?.role === 'admin' ? 'Administrator' : 'Member'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Account Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 space-y-4">
                  <div className="flex flex-col">
                    <span className="text-secondary-light dark:text-gray-400 text-sm">Full Name</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.name || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-light dark:text-gray-400 text-sm">Email Address</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-light dark:text-gray-400 text-sm">Member ID</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.id.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-light dark:text-gray-400 text-sm">Account Type</span>
                    <span className="text-secondary dark:text-white font-medium">
                      {session?.user?.role === 'admin' ? 'Administrator' : 'Standard Member'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full btn btn-secondary dark:bg-gray-700 dark:text-white flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile Details
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Journey Progress
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-secondary-light dark:text-gray-400">Your Journey to Self</span>
                      <span className="text-primary dark:text-primary-light font-medium">25% Complete</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-dark w-1/4 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary dark:text-white">Classes Attended</h4>
                        <p className="text-secondary-light dark:text-gray-400 text-sm">2 of 8 classes completed</p>
                        <div className="mt-2">
                          <Link href="/account/classes" className="text-primary dark:text-primary-light text-sm font-medium hover:underline">
                            View Class Schedule →
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20 rounded-full flex items-center justify-center text-primary dark:text-primary-light shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary dark:text-white">Next Appointment</h4>
                        <p className="text-secondary-light dark:text-gray-400 text-sm">No upcoming appointments</p>
                        <div className="mt-2">
                          <Link href="/account/appointments" className="text-primary dark:text-primary-light text-sm font-medium hover:underline">
                            Schedule Appointment →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/account/classes" 
                  className="btn btn-secondary dark:bg-gray-700 dark:text-white flex items-center justify-center gap-2 py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  View My Classes
                </Link>
                <Link 
                  href="/account/appointments" 
                  className="btn btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 