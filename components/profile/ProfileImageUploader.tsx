import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface ProfileImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string | null;
}

export default function ProfileImageUploader({ onImageUpload, currentImage }: ProfileImageUploaderProps) {
  const { data: session } = useSession();
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        // Pass the base64 image to parent component
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative w-28 h-28 rounded-full cursor-pointer overflow-hidden group transition-all ${uploading ? 'opacity-70' : ''}`}
        onClick={handleImageClick}
      >
        {previewImage ? (
          <Image 
            src={previewImage} 
            alt="Profile"
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary text-4xl font-bold">
            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        
        {/* Overlay with camera icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        {/* Loading spinner */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <p className="text-sm text-secondary-light dark:text-gray-400 mt-2">
        Click to change profile picture
      </p>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
} 