'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Register user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Account created successfully! Signing you in...');

      // Auto sign-in after successful registration
      setTimeout(async () => {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError('Sign-in failed after registration. Please sign in manually.');
        } else if (result?.ok) {
          router.push('/');
          router.refresh();
        }
      }, 1500);
    } catch (err: any) {
      console.error('Sign-up error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background dark:bg-background-dark p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-background-darkAlt shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Begin Your Journey</h1>
            <p className="text-white/80 mt-2">Create an account to start your personal journey</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-md text-sm">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary dark:text-white mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Beryl Thompson"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary dark:text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary dark:text-white mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary dark:text-white mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors duration-300 flex justify-center ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-secondary-light dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary dark:text-primary-light hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 text-center">
          <div className="inline-block h-1 w-16 bg-primary rounded-full"></div>
          <p className="mt-4 text-sm text-secondary-light dark:text-gray-400 italic">
            "The longest distance any of us will ever travel is the distance from the head to the heart."
          </p>
        </div>
      </div>
    </div>
  );
} 