'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../theme/ThemeProvider';
import { useSession, signOut } from 'next-auth/react';

interface NavLink {
  href: string;
  label: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  
  // Define navigation links
  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/classes', label: 'Classes' },
    { href: '/appointments', label: 'Appointments' },
    { href: '/book', label: 'Book' },
    { href: '/contact', label: 'Contact Us' }
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close user menu if it's open
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);
  
  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isUserMenuOpen) setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isUserMenuOpen]);
  
  // Handle clicks outside menus to close them
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Mobile menu outside click
      if (
        isMobileMenuOpen && 
        mobileMenuRef.current && 
        mobileMenuButtonRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) && 
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      
      // User menu outside click
      if (
        isUserMenuOpen && 
        userMenuRef.current && 
        userMenuButtonRef.current && 
        !userMenuRef.current.contains(event.target as Node) && 
        !userMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMobileMenuOpen, isUserMenuOpen]);
  
  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      // Find all focusable elements
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement.focus();
      }
    }
  }, [isMobileMenuOpen]);

  // Mark component as mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  // ThemeToggle component
  const ThemeToggleButton = () => {
    // Only try to use the theme hook when in the browser
    if (!mounted) {
      // Return a placeholder during SSR
      return (
        <button 
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-secondary dark:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Toggle theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </button>
      );
    }
    
    // In the browser, use the actual theme context
    const { resolvedTheme, toggleTheme } = useTheme();
    
    return (
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-secondary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {resolvedTheme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        )}
      </button>
    );
  };
  
  // Get first name from full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };
  
  return (
    <>
      <header className="bg-white dark:bg-background-darkAlt shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container-custom py-4 flex justify-between items-center">
          {/* Logo/Site Name */}
          <div className="font-bold text-2xl">
            <Link href="/" className="text-primary dark:text-primary-light hover:text-primary-dark transition-colors">
              Begin From Within
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex space-x-8">
              {navLinks.map((link) => {
                const isActive = 
                  link.href === '/' 
                    ? pathname === '/' 
                    : pathname.startsWith(link.href);
                
                return (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={isActive ? 'active-nav-link dark:text-primary-light' : 'nav-link dark:text-gray-300 dark:hover:text-white'}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Auth Buttons & Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggleButton />
            
            {status === 'loading' ? (
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button 
                  ref={userMenuButtonRef}
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-secondary dark:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm font-medium">
                    {session.user?.name ? getFirstName(session.user.name) : 'Account'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div 
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-background-darkAlt rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      Signed in as<br/>
                      <span className="font-medium text-secondary dark:text-white">{session.user?.email}</span>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link 
                      href="/account/classes" 
                      className="block px-4 py-2 text-sm text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Your Classes
                    </Link>
                    <Link 
                      href="/account/appointments" 
                      className="block px-4 py-2 text-sm text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Your Appointments
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="btn btn-secondary dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="btn btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile: Theme Toggle and Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggleButton />
            <button 
              ref={mobileMenuButtonRef}
              className="text-2xl text-secondary dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              aria-controls="mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden bg-white dark:bg-background-darkAlt shadow-md z-40 transition-colors duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="container-custom py-4" aria-label="Mobile Navigation">
            <ul className="space-y-4">
              {navLinks.map((link) => {
                const isActive = 
                  link.href === '/' 
                    ? pathname === '/' 
                    : pathname.startsWith(link.href);
                
                return (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`${isActive ? 'active-nav-link dark:text-primary-light' : 'nav-link dark:text-gray-300 dark:hover:text-white'} block py-2`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              
              <li className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                {status === 'loading' ? (
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                ) : session ? (
                  <>
                    <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
                      Signed in as <span className="font-medium text-secondary dark:text-white">{session.user?.name}</span>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block py-2 nav-link dark:text-gray-300 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      href="/account/classes" 
                      className="block py-2 nav-link dark:text-gray-300 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Classes
                    </Link>
                    <Link 
                      href="/account/appointments" 
                      className="block py-2 nav-link dark:text-gray-300 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Appointments
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 text-red-600 dark:text-red-400"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/signin" 
                      className="block py-2 nav-link dark:text-gray-300 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block py-2 text-primary dark:text-primary-light font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header; 