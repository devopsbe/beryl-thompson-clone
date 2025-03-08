import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the ParallaxEffect component with no SSR
const ParallaxEffect = dynamic(() => import('../components/ParallaxEffect'), { ssr: false });

// Client Component for Hero Section
const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary z-[-3] opacity-90 animate-gradient parallax-layer depth-3"></div>
      
      {/* Pattern overlay with parallax effect */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10 z-[-2] parallax-layer depth-2"></div>
      
      {/* Portal effect - circular gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] portal-circle animate-depth-pulse"></div>
      </div>
      
      {/* Expanding circles - journey inward visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-white/20 animate-circle-expand"></div>
        <div className="w-10 h-10 rounded-full bg-white/20 animate-circle-expand" style={{ animationDelay: '1s' }}></div>
        <div className="w-10 h-10 rounded-full bg-white/20 animate-circle-expand" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Central meditation ripple */}
      <div className="absolute h-24 w-24 rounded-full bg-primary-light/20 meditation-ripple"></div>
      
      {/* Content that floats in from the depth */}
      <div className="container-custom relative z-10 animate-float-in">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-wider leading-tight hero-text animate-depth-pulse">
          A JOURNEY TO<br />THE SELF
        </h1>
        <p className="text-xl md:text-3xl tracking-wide mb-10 max-w-3xl mx-auto parallax-layer depth-1">
          TRUST WHAT YOU HEAR WHEN YOU LISTEN
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/services" className="btn btn-primary btn-lg pulse-animation">
            Our Services
          </Link>
          <Link href="/classes" className="btn btn-outline">
            Join Our Classes
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator with depth effect */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce parallax-layer depth-1">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
      
      {/* Include the ParallaxEffect component for JS interactions */}
      <ParallaxEffect />
    </section>
  );
};

// Server Component
export default function Home() {
  return (
    <>
      {/* Hero Section with Parallax Effects */}
      <HeroSection />

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-300">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-primary dark:text-primary-light mb-2">ABOUT THAT JOURNEY...</h2>
            <div className="w-24 h-1 bg-primary mx-auto my-6"></div>
            
            <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-96 bg-gradient-to-r from-primary/10 to-primary/30 flex items-center justify-center">
                  <div className="absolute w-40 h-40 rounded-full bg-primary/20 meditation-ripple"></div>
                  <span className="relative text-5xl text-primary">✧</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary dark:text-white">Begin From Within!</h3>
                <p className="text-secondary-light dark:text-gray-300 leading-relaxed">
                  The <em className="text-primary dark:text-primary-light">Journey to the Self</em> is a personal system of self-management that allows anyone who is intentional to shift the energy of their experiences from discord to harmony through trusting what you hear when you listen.
                </p>
                <p className="text-secondary-light dark:text-gray-300 leading-relaxed">
                  It is said that the longest distance any of us will ever travel is the distance from the head to the heart. I call this the <em className="text-primary dark:text-primary-light">Journey to the Self</em> — the authentic, essence Self — the True Self.
                </p>
                <Link href="/about" className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark group">
                  Learn more about our approach
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="container-custom max-w-4xl">
          <h4 className="text-2xl mb-4 text-secondary dark:text-white">PROCESS</h4>
          <p className="text-secondary-light dark:text-gray-300">
            Through regular guidance that reflects back to the Self and then practice, each student is actually practicing living through the heart center. Since the process is a return to the original Self, practice causes you to remember yourSelf and you realize that the new "habit" really isn't new. Since 1994, this process has worked for 100% of those who apply it.
          </p>
          
          {/* New Call to Action for Our New Features */}
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-primary dark:text-primary-light mb-4">
                <i className="fas fa-book"></i>
              </div>
              <h3 className="text-xl mb-2 text-secondary dark:text-white">Serialized Book</h3>
              <p className="mb-4 text-secondary-light dark:text-gray-300">Follow our chapter-by-chapter book release this summer.</p>
              <Link href="/book" className="btn btn-primary inline-block">
                Learn More
              </Link>
            </div>
            
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-primary dark:text-primary-light mb-4">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="text-xl mb-2 text-secondary dark:text-white">Online Classes</h3>
              <p className="mb-4 text-secondary-light dark:text-gray-300">Subscribe monthly ($20) or annually ($200) for exclusive classes.</p>
              <Link href="/classes" className="btn btn-primary inline-block">
                Subscribe Now
              </Link>
            </div>
            
            <div className="bg-white dark:bg-background-darkAlt p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl text-primary dark:text-primary-light mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="text-xl mb-2 text-secondary dark:text-white">Appointments</h3>
              <p className="mb-4 text-secondary-light dark:text-gray-300">Request a free 15-minute Skype introduction.</p>
              <Link href="/appointments" className="btn btn-primary inline-block">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white dark:bg-background-darkAlt transition-colors duration-300">
        <div className="container-custom max-w-4xl">
          <h4 className="text-2xl mb-4 text-secondary dark:text-white">CONTACT</h4>
          <p className="text-secondary-light dark:text-gray-300">BeginFromWithin@msn.com</p>
          <p className="text-secondary-light dark:text-gray-300">520.403.8210</p>
        </div>
      </section>
    </>
  );
}