import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary/85 dark:bg-primary-dark/85 py-6 transition-colors duration-300">
      <div className="container-custom max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Brand and Contact */}
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold mb-1 text-white">Begin From Within</div>
            <p className="text-white text-xs">
              <a href="mailto:BeginFromWithin@msn.com" className="text-white hover:text-white/80 transition-colors">BeginFromWithin@msn.com</a> • Sessions via Skype
            </p>
          </div>
          
          {/* Links - Single Row */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-white">
            <Link href="/" className="text-white hover:text-white/80 transition-colors">Home</Link>
            <Link href="/services" className="text-white hover:text-white/80 transition-colors">Services</Link>
            <Link href="/classes" className="text-white hover:text-white/80 transition-colors">Classes</Link>
            <Link href="/appointments" className="text-white hover:text-white/80 transition-colors">Appointments</Link>
            <Link href="/book" className="text-white hover:text-white/80 transition-colors">Book</Link>
            <Link href="/contact" className="text-white hover:text-white/80 transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 pt-4 border-t border-white/10 text-xs text-white">
          <p>&copy; {currentYear} Begin From Within. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex gap-4">
            <a href="#" className="text-white hover:text-white/80 transition-colors">Privacy</a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 