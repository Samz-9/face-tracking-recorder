'use client';
import CarouselSection from './components/carousel';
import { useState, useEffect } from 'react';

const AnimatedText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setupScrollNavbarEffect('navbar', 50);
  }, []);

  const setupScrollNavbarEffect = (navbarId, scrollThreshold = 5) => {
    const navbar = document.getElementById(navbarId);
    navbar.classList.add('transition-all', 'duration-300');
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('bg-slate-900/80', 'backdrop-blur-sm', 'border-slate-700/50');
      } else {
        navbar.classList.remove('bg-slate-900/80', 'bg-transparent', 'backdrop-blur-sm', 'border-slate-700/50');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  };

  return (
    <nav id='navbar' className="fixed bg-transparent top-0 left-0 right-0 z-50 w-full px-4 py-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI Hire Studio
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button onClick={() => scrollToSection('plans')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
            Plans
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <a href='/face-rec'><button className="px-6 py-2 bg-gray-300 text-gray-900 rounded-full font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button></a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-400 transition-colors"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden mt-4 bg-gray-900/50 backdrop-blur-md rounded-lg p-4 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="flex flex-col space-y-4">
          <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors py-2">About Us</button>
          <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors py-2">Services</button>
          <button onClick={() => scrollToSection('plans')} className="text-gray-300 hover:text-white transition-colors py-2">Plans</button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors py-2">Contact</button>
          <a href='/face-rec'><button className="px-6 py-2 bg-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center mt-2">
            Get Started
          </button></a>
        </div>
      </div>
    </nav>

  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute bg-gradient-to-b from-gray-800 via-[#2C0368] to-[#0a0a0a] inset-0"></div>
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 className="text-5xl space-y-4 mt-6 md:text-7xl font-bold mb-6">
          <span className="block bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-[length:300%_100%] animate-[gradient_8s_ease-in-out_infinite,fadeInUp_1s_ease-out_1s_both] bg-clip-text text-transparent">
            The new best way to hire Talent
          </span>
          <span className="block animate-[fadeInUp_1s_ease-out_1s_both] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            'AI Hire Studio'
          </span>
        </h1>

        <p className="text-lg md:text-xl font-semibold text-gray-300">
          AI Hire Studio is a cutting edge application designed to{' '}
          <span className="text-orange-500 font-normal">auto evaluate</span>
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-1">
          <span className="text-orange-500">candidates</span> for{' '}
          <span className="text-pink-700">steadiness</span> through{' '}
          <span className="text-purple-700">auto interviews</span>.
        </p>

        <p className="text-lg md:text-2xl font-bold text-white mt-2 mb-3">
          So You <span className="text-yellow-400">HIRE RIGHT TALENT</span> That Stays!
        </p>

        <a href='/face-rec' className="relative inline-flex sm:h-16 h-12 mt-20 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 md:px-10 py-1 sm:text-xl md:text-lg text-base font-medium text-white backdrop-blur-3xl">Get Started</span>
        </a>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const words = ["Evaluation", "Hiring", "Tests"];
  const [wordIndex, setWordIndex] = useState(0);          
  const [charIndex, setCharIndex] = useState(0);          
  const [isDeleting, setIsDeleting] = useState(false);     
  const [displayText, setDisplayText] = useState(''); 
  const Speed = 300;
  const pause = 10000; 

  useEffect(() => {
    let timeout; 
    const typeWriterLogic = () => {
      const currentWord = words[wordIndex];
      let currentDelay = Speed;

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        currentDelay = Speed;

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length); 
          currentDelay = pause;
        }
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        currentDelay = Speed;

        if (charIndex === currentWord.length) {
          setIsDeleting(true);
          currentDelay = pause;
        }
      }

      timeout = setTimeout(typeWriterLogic, currentDelay);
    };
    timeout = setTimeout(typeWriterLogic, Speed); 
    return () => clearTimeout(timeout);
  }, [wordIndex, charIndex, isDeleting]); 

  return (
    <section id="services" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-slate-800"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Our Values
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#32BAFF] to-white animate-[ourvalues_4s_ease-in-out_infinite]"></span>
            </span>
          </h2>
          <p className="text-2xl text-yellow-400 font-semibold after:content-['|'] after:inline-block after:animate-[blink_0.75s_ease-in-out_infinite] after:font-thin">We Offer {displayText}</p>
        </div>
      <CarouselSection />
      </div>
    </section>
  );
};

const PlansSection = () => {
  const words = ["Easy", "Fantastic", "Convenient"];
  const [wordIndex, setWordIndex] = useState(0);          
  const [charIndex, setCharIndex] = useState(0);          
  const [isDeleting, setIsDeleting] = useState(false);     
  const [displayText, setDisplayText] = useState(''); 
  const Speed = 300;
  const pause = 10000; 

  useEffect(() => {
    let timeout; 
    const typeWriterLogic = () => {
      const currentWord = words[wordIndex];
      let currentDelay = Speed;

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        currentDelay = Speed;

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length); 
          currentDelay = pause;
        }
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        currentDelay = Speed;

        if (charIndex === currentWord.length) {
          setIsDeleting(true);
          currentDelay = pause;
        }
      }

      timeout = setTimeout(typeWriterLogic, currentDelay);
    };
    timeout = setTimeout(typeWriterLogic, Speed); 
    return () => clearTimeout(timeout);
  }, [wordIndex, charIndex, isDeleting]); 

  return (
    <section id="plans" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Value Plans
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#32BAFF] to-white animate-[ourvalues_4s_ease-in-out_infinite]"></span>
            </span>
          </h2>
          <p className="text-2xl text-yellow-400 font-semibold after:content-['|'] after:inline-block after:animate-[blink_0.75s_ease-in-out_infinite] after:font-thin">AI Hire Studio is {displayText}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-3xl">
            <div className="bg-slate-800 rounded-3xl p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                  <div className="text-6xl mb-6 text-[250px]">🕺🏻</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Goes as low as</h3>
                  <div className="text-6xl font-bold text-white mb-2">
                    $2 <span className="text-2xl text-gray-400">/Interview</span>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <button className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
                      Contact Us
                    </button>
                    <a href='/face-rec'><button className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-slate-900 transition-all">
                      Get Started
                    </button></a>
                  </div>
                </div>

                <div className="lg:w-1/2 lg:pl-8">
                  <div className="space-y-3">
                    {[
                      'Patented Steadiness Score',
                      'Personality Evaluation',
                      'Retention filter',
                      'One to Many Auto Interviews',
                      'Faster Hiring',
                      'Analytical visualization of personality',
                      'Employee Steadiness',
                      'Higher Retention',
                      'Low Employee Turnover'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-green-400 text-xl">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 py-16 border-t border-slate-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-start space-y-8 md:space-y-0">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              AI Hire Studio
            </h3>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Helpful Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Socials</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <span>📱</span>
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <span>🐦</span>
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2025. AI Hire Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PlansSection />
      <Footer />
    </div>
  );
}