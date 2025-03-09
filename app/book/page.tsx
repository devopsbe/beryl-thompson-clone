import dynamic from 'next/dynamic';

// Dynamically import the CountdownTimer component with no SSR
const CountdownTimer = dynamic(() => import('../../components/CountdownTimer'), { ssr: false });

export default function BookPage() {
  return (
    <div className="container-custom py-12 bg-background dark:bg-background-dark transition-colors duration-300">
      <h1 className="text-center text-secondary dark:text-white">Serialized Book</h1>
      <div className="w-24 h-1 bg-primary mx-auto my-8"></div>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-center mb-12 text-secondary-light dark:text-gray-300">
          Follow our chapter-by-chapter book release coming this summer.
        </p>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/15 p-8 rounded-lg shadow-md mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative h-64 w-full shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="book-container">
                    <div className="book">
                      <div className="book-cover">
                        <div className="book-spine"></div>
                        <div className="book-title">
                          <h3 className="text-lg text-white font-bold">Journey to the Self</h3>
                          <p className="text-sm text-white/80">By Beryl Thompson</p>
                        </div>
                      </div>
                      <div className="book-pages"></div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
            <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl mb-4 text-secondary dark:text-white">Begin From Within: The Journey to the Self</h2>
              <p className="mb-4 text-secondary-light dark:text-gray-300">
            A comprehensive guide to shifting the energy of your experiences from discord to harmony through trusting what you hear when you listen.
          </p>
          
              <div className="mt-6">
                {/* Countdown Timer */}
                <CountdownTimer targetDate={new Date(new Date().getFullYear(), 5, 22)} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl mb-6 text-secondary dark:text-white">Upcoming Chapters</h3>
          
          <div className="divide-y dark:divide-gray-700">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-secondary dark:text-white">Chapter 1: The Beginning</h4>
                  <p className="text-gray-600 dark:text-gray-400">June 22, 2025</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">First Release</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg shadow-md">
          <h3 className="text-xl mb-2 text-secondary dark:text-white font-bold">Stay Updated</h3>
          <p className="mb-6 text-secondary-light dark:text-gray-300">Subscribe to receive notifications when each chapter is released.</p>
          
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              className="flex-grow p-3 border border-primary/20 dark:border-primary/30 bg-white/90 dark:bg-background-dark/90 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
              placeholder="Your email address"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap shadow-md hover:shadow-lg transition-shadow">
              Notify Me
            </button>
          </form>
          <p className="mt-4 text-xs text-secondary-light/70 dark:text-gray-400">We respect your privacy. You can unsubscribe at any time.</p>
        </div>
      </div>
    </div>
  );
} 