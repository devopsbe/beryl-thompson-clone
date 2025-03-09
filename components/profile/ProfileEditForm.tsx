import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProfileImageUploader from './ProfileImageUploader';

interface ProfileEditFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ onSave, onCancel }: ProfileEditFormProps) {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [profileImage, setProfileImage] = useState<string | null>(session?.user?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image: profileImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update the session with new user data
      await update({
        ...session,
        user: {
          ...session?.user,
          name,
          image: profileImage,
        },
      });

      setSuccess('Profile updated successfully!');
      
      // Call the onSave callback after a short delay to show the success message
      setTimeout(() => {
        onSave();
      }, 1500);
    } catch (err: any) {
      console.error('Profile update error:', err);
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-md text-sm">
          {success}
        </div>
      )}

      <div className="mb-6">
        <ProfileImageUploader 
          onImageUpload={handleImageUpload} 
          currentImage={session?.user?.image || null}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary dark:text-white mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300 flex-1 flex justify-center ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 