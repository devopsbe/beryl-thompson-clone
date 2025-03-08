export default function ContactPage() {
  return (
    <>
      {/* Contact Header/Hero */}
      <section className="py-16 bg-primary/10 dark:bg-primary/5 transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-light">Get In Touch</h1>
            <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
            <p className="text-lg text-secondary-light dark:text-gray-300">
              We're here to guide you on your journey to self-discovery and inner harmony. 
              Reach out with any questions about our services or to begin your journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Content */}
      <section className="py-16 bg-white dark:bg-background-dark transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Contact Information */}
              <div className="md:col-span-5 bg-background dark:bg-background-darkAlt p-8 rounded-lg shadow-md">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-primary dark:text-primary-light">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-light mr-4">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary dark:text-white">Email</h4>
                        <p className="text-secondary-light dark:text-gray-300">BeginFromWithin@msn.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-light mr-4">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary dark:text-white">Phone</h4>
                        <p className="text-secondary-light dark:text-gray-300">520.403.8210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary-light mr-4">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary dark:text-white">Available Hours</h4>
                        <p className="text-secondary-light dark:text-gray-300">
                          Monday - Friday: 9am - 5pm<br />
                          Saturday: 10am - 2pm<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold mb-4 text-secondary dark:text-white">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 p-3 rounded-full text-primary dark:text-primary-light transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a 
                      href="#" 
                      className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 p-3 rounded-full text-primary dark:text-primary-light transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a 
                      href="#" 
                      className="bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 p-3 rounded-full text-primary dark:text-primary-light transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-7">
                <h3 className="text-2xl font-bold mb-6 text-secondary dark:text-white">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-secondary dark:text-white">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-secondary dark:text-white">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-secondary dark:text-white">Subject</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-secondary dark:text-white">Your Message</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-background-darkAlt dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300" 
                      rows={6}
                      placeholder="How can we help you on your journey?"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className="mr-2 accent-primary"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-secondary-light dark:text-gray-300">
                      I consent to having this website store my information for future contact.
                    </label>
                  </div>
                  
                  <div>
                    <button type="submit" className="btn btn-primary py-3 px-6">
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-background dark:bg-background-darkAlt transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary dark:text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-primary mx-auto my-6"></div>
            <p className="text-secondary-light dark:text-gray-300 mb-12">
              Find answers to common questions about our services and approach.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-secondary dark:text-white">What is the Journey to the Self?</h3>
              <p className="mt-2 text-secondary-light dark:text-gray-300">
                The Journey to the Self is a personal system of self-management that allows anyone 
                who is intentional to shift the energy of their experiences from discord to harmony 
                through trusting what you hear when you listen.
              </p>
            </div>
            
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-secondary dark:text-white">How do I get started?</h3>
              <p className="mt-2 text-secondary-light dark:text-gray-300">
                You can begin by exploring our services or contacting us for a 15-minute 
                introductory session. This will help us understand your needs and recommend 
                the best path forward on your journey.
              </p>
            </div>
            
            <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-secondary dark:text-white">Do you offer virtual sessions?</h3>
              <p className="mt-2 text-secondary-light dark:text-gray-300">
                Yes, all our consultations and sessions are available virtually. We use secure 
                video conferencing to provide the same quality experience as in-person sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 