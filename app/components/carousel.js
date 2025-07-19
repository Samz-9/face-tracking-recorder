'use client'
import { useState ,useCallback,useEffect} from 'react'
export default function CarouselSection() {
  const slides = [
    {
      title: "Employees that Stays",
      image: "https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg",
      points: [
        "Reduce employee turnover",
        "Use patented Steadiness Score for retention"
      ]
    },
    {
      title: "Automated AI Evaluations of Interviews",
      image: "https://img.freepik.com/free-vector/flat-feedback-concept-illustrated_23-2148946027.jpg?t=st=1729239526~exp=1729243126~hmac=b083f37919cc41468f6723aec3bec633e2bf7804efb32ceaf6faadbd67b3317b&w=826",
      points: [
        "Unbiased AI based Evaluation",
        "Reduce Hiring Human Error"
      ]
    },
    {
      title: "Faster Hiring",
      image: "https://img.freepik.com/free-vector/visual-data-concept-illustration_114360-1713.jpg?t=st=1729239495~exp=1729243095~hmac=81ad09ab39d1c5fb754b4eb650497bc4906fe4c3106691f11f4037fb18e08b36&w=826",
      points: [
        "Complete interviews 10X faster",
        "Reduce Hiring Cost by 80%"
      ]
    }
  ];

  // State to keep track of the current active slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]); // useCallback to memoize the function

  // Function to go to the previous slide
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]); // useCallback to memoize the function

  // Function to go to a specific slide (for pagination dots)
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []); // useCallback to memoize the function

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [goToNextSlide]); // Re-run effect if goToNextSlide changes (though useCallback prevents this)

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 md:mb-0 mb-20">
      <div className="overflow-hidden rounded-2xl"> {/* Added rounded-2xl here for consistency */}
        {/* The transform style is now dynamically controlled by currentSlide state */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0" style={{ width: '100%' }}>
              <div className="flex flex-col h-[500px] md:h-fit md:flex-row bg-gradient-to-r from-indigo-900 to-black rounded-2xl items-center md:p-10 p-3 md:gap-8 gap-4">
                <img
                  alt="service"
                  className="md:w-1/2 w-full md:h-auto h-52 object-cover rounded-2xl"
                  src={slide.image}
                />
                <div className="flex flex-col items-center sm:gap-5 lg:gap-10 md:space-y-3 space-y-1 w-full md:w-1/2">
                  <h1
                    className="inline-block leading-normal lg:mr-5 md:mr-3 mr-2 flowing-gradient text-center font-bold text-2xl md:text-4xl lg:text-5xl pb-2"
                    // These inline styles for gradient animation would ideally be in global CSS or tailwind.config.js
                    style={{
                      background: 'linear-gradient(270deg, rgb(255, 107, 107), rgb(255, 217, 61), rgb(50, 186, 255), rgb(255, 107, 107)) 0% 0% / 400% 400% text',
                      WebkitTextFillColor: 'transparent',
                      animation: '7s ease 0s infinite normal none running flowingColors',
                      opacity: 1,
                      willChange: 'opacity, transform',
                      transform: 'none',
                    }}
                  >
                    {slide.title}
                  </h1>
                  <ul className="text-gray-200 font-bold tracking-tight text-base lg:text-xl w-full pt-4 lg:text-center flex flex-col gap-2 xl:pl-16 lg:pl-8 pl-2 whitespace-nowrap">
                    {slide.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center gap-2">
                        <button className="bg-[#e6e6e6] rounded-full p-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </button>
                        <div
                          className="text-[#b5b5b5a4] bg-clip-text inline-block animate-shine"
                          // These inline styles for shine animation would ideally be in global CSS or tailwind.config.js
                          style={{
                            backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            animationDuration: '3s',
                          }}
                        >
                          {point}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Navigation Buttons (hidden on smaller screens) */}
      <div className="hidden lg:block">
        <button
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-1/2"
          aria-label="Previous slide"
          onClick={goToPrevSlide} // Added onClick handler
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 h-6 text-black">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        <button
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition absolute -right-2 top-1/2 -translate-y-1/2 translate-x-1/2"
          aria-label="Next slide"
          onClick={goToNextSlide} // Added onClick handler
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-6 h-6 text-black">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Buttons and Pagination Dots */}
      <div className="flex flex-col items-center mt-8 md:mt-6">
        <div className="flex items-center gap-4 mb-4 lg:hidden">
          <button
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition relative"
            aria-label="Previous slide"
            onClick={goToPrevSlide} // Added onClick handler
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 h-6 text-black">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition relative"
            aria-label="Next slide"
            onClick={goToNextSlide} // Added onClick handler
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-6 h-24 text-black">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-center gap-2">
          {/* Pagination Dots */}
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-20 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-yellow-500' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)} // Added onClick handler
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};