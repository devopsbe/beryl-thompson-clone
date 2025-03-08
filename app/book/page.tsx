export default function BookPage() {
  return (
    <div className="container-custom py-12 bg-background dark:bg-background-dark transition-colors duration-300">
      <h1 className="text-center text-secondary dark:text-white">Serialized Book</h1>
      <div className="w-24 h-1 bg-primary mx-auto my-8"></div>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-center mb-12 text-secondary-light dark:text-gray-300">
          Follow our chapter-by-chapter book release coming this summer.
        </p>
        
        <div className="bg-white dark:bg-background-darkAlt p-8 rounded-lg shadow-md text-center mb-12">
          <div className="mx-auto w-48 h-64 bg-primary/20 dark:bg-primary/40 mb-6 flex items-center justify-center">
            <p className="text-primary dark:text-primary-light font-bold">Book Cover Coming Soon</p>
          </div>
          
          <h2 className="text-2xl mb-4 text-secondary dark:text-white">Begin From Within: The Journey to the Self</h2>
          <p className="mb-8 text-secondary-light dark:text-gray-300">
            A comprehensive guide to shifting the energy of your experiences from discord to harmony through trusting what you hear when you listen.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button className="btn btn-primary">Subscribe for Updates</button>
            <button className="btn btn-secondary dark:bg-gray-700 dark:text-white">Learn More</button>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl mb-6 text-secondary dark:text-white">Upcoming Chapters</h3>
          
          <div className="divide-y dark:divide-gray-700">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-secondary dark:text-white">Chapter 1: The Beginning</h4>
                  <p className="text-gray-600 dark:text-gray-400">June 2025</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Coming Soon</span>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-secondary dark:text-white">Chapter 2: The Head and Heart</h4>
                  <p className="text-gray-600 dark:text-gray-400">July 2025</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Coming Soon</span>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-secondary dark:text-white">Chapter 3: Listening Inward</h4>
                  <p className="text-gray-600 dark:text-gray-400">August 2025</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Coming Soon</span>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-secondary dark:text-white">Chapter 4: Shifting Energy</h4>
                  <p className="text-gray-600 dark:text-gray-400">September 2025</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-background-darkAlt p-6 rounded-lg">
          <h3 className="text-xl mb-4 text-secondary dark:text-white">Subscribe for Chapter Notifications</h3>
          <p className="mb-4 text-secondary-light dark:text-gray-300">Be the first to know when new chapters are released.</p>
          
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              className="flex-grow p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-dark dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
              placeholder="Your email address"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 