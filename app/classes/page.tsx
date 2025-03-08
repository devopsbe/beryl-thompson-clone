'use client';

import { useEffect, useState } from 'react';

export default function ClassesPage() {
  const [billingOption, setBillingOption] = useState<'monthly' | 'annual'>('monthly');

  // Update pricing and toggle based on selected billing option
  const updateBillingView = (option: 'monthly' | 'annual') => {
    setBillingOption(option);
  };

  // Add better handling for the toggle buttons - using state instead of DOM manipulation
  useEffect(() => {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const annualBtn = document.getElementById('annualBtn');

    if (monthlyBtn && annualBtn) {
      if (billingOption === 'monthly') {
        monthlyBtn.classList.add('bg-primary', 'text-white');
        annualBtn.classList.remove('bg-primary', 'text-white');
      } else {
        annualBtn.classList.add('bg-primary', 'text-white');
        monthlyBtn.classList.remove('bg-primary', 'text-white');
      }
    }
  }, [billingOption]);

  // For keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, option: 'monthly' | 'annual') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      updateBillingView(option);
    }
  };

  return (
    <div className="container-custom py-16 bg-background dark:bg-background-dark transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-secondary dark:text-white">Pre-recorded Class Subscriptions</h1>
      <div className="w-32 h-1 bg-primary mx-auto my-8 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-lg md:text-xl text-secondary-light dark:text-gray-300 mb-16">
          Access our library of pre-recorded journey sessions at your own pace. Perfect for those who prefer self-guided exploration on their journey to the self.
        </p>
        
        <div className="bg-background-alt dark:bg-background-darkAlt p-10 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-secondary dark:text-white">What's Included</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-xl shadow-md dark:shadow-gray-900/30 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 group-hover:scale-110">
                <svg className="w-8 h-8 text-primary dark:text-primary-light transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-light">Video Content</h3>
              <p className="text-secondary-light dark:text-gray-300">High-quality recorded sessions on various aspects of the Journey to the Self</p>
            </div>
            
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-xl shadow-md dark:shadow-gray-900/30 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 group-hover:scale-110">
                <svg className="w-8 h-8 text-primary dark:text-primary-light transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-light">Exercises</h3>
              <p className="text-secondary-light dark:text-gray-300">Downloadable workbooks and practice exercises to deepen your self-discovery</p>
            </div>
            
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-xl shadow-md dark:shadow-gray-900/30 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 group-hover:scale-110">
                <svg className="w-8 h-8 text-primary dark:text-primary-light transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary dark:text-white transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-light">Community</h3>
              <p className="text-secondary-light dark:text-gray-300">Access to our members-only discussion forum to share experiences</p>
            </div>
          </div>
        </div>
        
        {/* Single Subscription Card with Toggle */}
        <div className="max-w-2xl mx-auto bg-background-alt dark:bg-background-darkAlt p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 mb-16">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-full" role="radiogroup" aria-label="Billing period">
              <button 
                id="monthlyBtn"
                className="relative px-4 sm:px-6 py-2 rounded-full text-secondary-light dark:text-gray-300 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onClick={() => updateBillingView('monthly')}
                onKeyDown={(e) => handleKeyDown(e, 'monthly')}
                role="radio"
                aria-checked={billingOption === 'monthly'}
                tabIndex={billingOption === 'monthly' ? 0 : -1}
                aria-label="Monthly billing"
              >
                Monthly
              </button>
              <button 
                id="annualBtn"
                className="px-4 sm:px-6 py-2 rounded-full text-secondary-light dark:text-gray-300 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onClick={() => updateBillingView('annual')}
                onKeyDown={(e) => handleKeyDown(e, 'annual')}
                role="radio"
                aria-checked={billingOption === 'annual'}
                tabIndex={billingOption === 'annual' ? 0 : -1}
                aria-label="Annual billing"
              >
                Annual
              </button>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-secondary dark:text-white">Subscription</h3>
            <p className="text-secondary-light dark:text-gray-300">Access to all our pre-recorded content</p>
          </div>
          
          <div id="priceDisplay" className="text-center mb-6">
            <span id="priceAmount" className="text-5xl font-bold text-secondary dark:text-white">
              {billingOption === 'monthly' ? '$20' : '$200'}
            </span>
            <span id="pricePeriod" className="text-secondary-light dark:text-gray-400 font-medium">
              {billingOption === 'monthly' ? '/month' : '/year'}
            </span>
            <span id="saveText" className="block text-sm text-green-600 dark:text-green-400 mt-2">
              {billingOption === 'monthly' 
                ? 'Save $40 with annual billing ($200/year)' 
                : 'Save $40 compared to monthly billing'}
            </span>
          </div>
          
          <div className="my-8 space-y-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-secondary-light dark:text-gray-300">Full access to all pre-recorded classes</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-secondary-light dark:text-gray-300">Unlimited access to growing content library</span>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-secondary-light dark:text-gray-300">Downloadable resources & exercises</span>
            </div>
          </div>
          
          <button className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Subscribe Now
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-secondary-light dark:text-gray-400 mb-6">
            Coming soon: Integration with Teachable/Thinkific platforms for an enhanced learning experience with more interactive features and progress tracking.
          </p>
          
          <a href="/contact" className="inline-flex items-center space-x-2 text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none focus:underline">
            <span>Contact us with your questions</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 