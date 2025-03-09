export default function AppointmentsPage() {
  return (
    <>
      {/* Appointments Header */}
      <section className="py-16 bg-primary/10 dark:bg-primary/5 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-light">Book an Appointment</h1>
            <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
            <p className="text-lg text-secondary-light dark:text-gray-300">
              Begin your journey with a complimentary 15-minute Intro. 
              Submit your request below and we'll reach out to schedule your session.
            </p>
          </div>
        </div>
      </section>
      
      {/* Appointment Form Section */}
      <section className="py-16 bg-white dark:bg-background-dark transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-background dark:bg-background-darkAlt p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Request a Intro</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-secondary dark:text-white">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-secondary dark:text-white">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-secondary dark:text-white">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-secondary dark:text-white">Reason for Appointment</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                    rows={4}
                    placeholder="Briefly describe why you're interested in an appointment and what you hope to achieve"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mr-2 accent-primary"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-secondary-light dark:text-gray-300">
                    I understand this is a request form. If approved, I will receive scheduling details via email.
                  </label>
                </div>
                
                <div>
                  <button type="submit" className="btn btn-primary py-3 px-6">
                    <i className="fas fa-calendar-check mr-2"></i>
                    Submit Request
                  </button>
                </div>
              </form>
              
              <div className="mt-8 p-5 bg-primary/5 dark:bg-primary/10 rounded-md border-l-4 border-primary">
                <h4 className="text-lg font-semibold mb-2 text-secondary dark:text-white">What Happens Next</h4>
                <ol className="text-sm text-secondary-light dark:text-gray-300 space-y-2 list-decimal list-inside">
                  <li>We'll review your request within 1-2 business days</li>
                  <li>If approved, you'll receive an email with scheduling options for your free 15-minute Intro</li>
                  <li>After the introduction, you can decide if you'd like to continue with paid sessions</li>
                  <li>All Intros are conducted via Skype.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-background dark:bg-background-darkAlt transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary dark:text-white">What Others Are Saying</h2>
            <div className="w-16 h-1 bg-primary mx-auto my-6"></div>
          </div>
          
          <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
            {/* First Testimonial */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-md relative pb-14 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="absolute top-4 left-4 text-primary/20 dark:text-primary/10 group-hover:text-primary/30 dark:group-hover:text-primary/20 transition-colors duration-300">
                <i className="fas fa-quote-left text-6xl"></i>
              </div>
              <div className="relative z-10">
                <p className="text-secondary-light dark:text-gray-300 mb-6 pt-6 leading-relaxed">
                  "The Journey Through the Self process has given me the tools to navigate life through my heart, authentically express my truth, and resolve shame. To say my life is changed completely is an understatement."
                </p>
                <div className="flex items-center mb-8">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary/30 transition-colors duration-300">
                    <span className="font-bold text-lg">AR</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-secondary dark:text-white text-lg">Alexis Royall</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 border-t border-gray-100 dark:border-gray-800 pt-2 w-5/6 group-hover:border-primary/20 transition-colors duration-300">
                <p className="text-xs text-secondary-light dark:text-gray-400 italic">Client since 2023</p>
              </div>
            </div>
            
            {/* Second Testimonial */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-md relative pb-14 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="absolute top-4 left-4 text-primary/20 dark:text-primary/10 group-hover:text-primary/30 dark:group-hover:text-primary/20 transition-colors duration-300">
                <i className="fas fa-quote-left text-6xl"></i>
              </div>
              <div className="relative z-10">
                <p className="text-secondary-light dark:text-gray-300 mb-6 pt-6 leading-relaxed">
                  "I met Beryl in the midst of devastation, understanding that a temporary fix wouldn't do. She has guided me to and through my Self, showing me true Empowerment."
                </p>
                <div className="flex items-center mb-8">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary/30 transition-colors duration-300">
                    <span className="font-bold text-lg">AR</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-secondary dark:text-white text-lg">Alexis Royall</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 border-t border-gray-100 dark:border-gray-800 pt-2 w-5/6 group-hover:border-primary/20 transition-colors duration-300">
                <p className="text-xs text-secondary-light dark:text-gray-400 italic">Client since 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="/contact" className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark group transition-colors duration-300">
              <span>Share your journey with us</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
} 