'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const InfoBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Show the info box after a short delay when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 bg-white dark:bg-background-darkAlt shadow-lg rounded-lg transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'w-64' : 'w-80'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-primary p-3 cursor-pointer" onClick={toggleCollapse}>
        <div className="flex items-center text-white">
          <i className="fas fa-info-circle mr-2"></i>
          <h3 className="font-medium">Begin From Within</h3>
        </div>
        <button 
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label={isCollapsed ? "Expand information" : "Collapse information"}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
        </button>
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-96'}`}>
        <div className="p-4">
          <p className="text-secondary dark:text-white text-sm mb-3">
            Begin your journey to self-discovery and inner harmony.
          </p>
          
          <div className="text-xs text-secondary-light dark:text-gray-300 mb-3">
            <div className="flex items-start mb-2">
              <i className="fas fa-envelope text-primary mr-2 mt-1"></i>
              <span>BeginFromWithin@msn.com</span>
            </div>
            <div className="flex items-start mb-2">
              <i className="fas fa-phone text-primary mr-2 mt-1"></i>
              <span>520.403.8210</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Link 
              href="/services" 
              className="btn btn-primary btn-sm text-center text-xs"
            >
              Explore Our Services
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-outline btn-sm text-center text-xs border-primary text-primary dark:border-primary-light dark:text-primary-light hover:bg-primary/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox; 