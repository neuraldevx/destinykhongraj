'use client';

/**
 * Navigation Component
 * Fixed header navigation with smooth scroll functionality
 * Features backdrop blur, responsive design, and brand coloring
 */
export default function Navigation() {
  /**
   * Smooth scroll to section by ID
   * @param {string} sectionId - The ID of the target section element
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll behavior for better UX
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Enhanced navigation with sophisticated backdrop and subtle gradient border
    <nav className="fixed top-0 left-0 right-0 z-50 bg-mist/95 backdrop-blur-lg border-b border-aluminum/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-mist">
            Destiny Khongraj
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-aluminum hover:text-coral transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-aluminum hover:text-coral transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-aluminum hover:text-coral transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('footer')}
              className="text-aluminum hover:text-coral transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          <button className="bg-coral hover:bg-rose text-midnight px-4 py-2 rounded-full transition-colors duration-200">
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
}