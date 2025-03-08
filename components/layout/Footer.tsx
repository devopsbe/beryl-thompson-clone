const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary dark:bg-background-darkAlt text-white py-8 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            Begin From Within
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-white hover:text-primary-light">Home</a>
            <a href="#" className="text-white hover:text-primary-light">Services</a>
            <a href="#" className="text-white hover:text-primary-light">Classes</a>
            <a href="#" className="text-white hover:text-primary-light">Appointments</a>
            <a href="#" className="text-white hover:text-primary-light">Book</a>
            <a href="#" className="text-white hover:text-primary-light">Contact</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} BeginFromWithin - All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <a 
              href="#" 
              className="text-white hover:text-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 rounded-full p-2"
              aria-label="Facebook"
              title="Follow us on Facebook"
            >
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a 
              href="#" 
              className="text-white hover:text-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 rounded-full p-2"
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a 
              href="#" 
              className="text-white hover:text-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 rounded-full p-2"
              aria-label="LinkedIn"
              title="Connect with us on LinkedIn"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-400 dark:text-gray-500 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-center md:justify-start gap-2 md:gap-4">
            <a 
              href="#" 
              className="hover:text-white transition-colors duration-300 focus:outline-none focus:underline"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-white transition-colors duration-300 focus:outline-none focus:underline"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
          </div>
          <p className="mt-2">
            BeginFromWithin@msn.com | 520.403.8210
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 