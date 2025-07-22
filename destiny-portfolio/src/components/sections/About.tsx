export default function About() {
  return (
    // Enhanced background with subtle gradient and pattern
    <section id="about" className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(153,27,27,0.3),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          {/* Enhanced section label with maroon accent */}
          <p className="text-lg text-maroon-700 mb-4 font-semibold tracking-wide uppercase">
            (About Destiny)
          </p>
          {/* Improved typography with better contrast */}
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight font-inter">
            I&apos;m a passionate content creator driven by creativity and 
            authentic storytelling. I specialize in building meaningful 
            connections between brands and their audiences through compelling 
            digital narratives.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-2xl p-8 h-96">
            <div className="w-full h-full bg-gradient-to-br from-maroon-700 to-maroon-900 rounded-lg flex items-center justify-center">
              <p className="text-white font-semibold text-xl">Your Photo Here</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 h-96 flex flex-col justify-between">
            <p className="text-2xl md:text-4xl text-maroon-800 font-semibold leading-tight">
              Creating content that resonates and drives meaningful engagement
            </p>
            <div className="text-8xl md:text-9xl text-maroon-800 font-bold text-right">
              100+
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}