export default function Footer() {
  return (
    <section id="footer" className="p-4 bg-gray-100">
      <footer className="bg-gray-100 rounded-xl p-8 min-h-[600px] flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-lg text-maroon-800">
            Los Angeles, CA
          </p>
          <div className="text-maroon-800 font-semibold text-lg">
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-semibold text-maroon-800 mb-8 leading-tight">
              Let&apos;s work{" "}
              <span className="text-gray-700">together!</span>
            </h2>
            
            <button className="bg-maroon-800 hover:bg-maroon-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
              Get in Touch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center md:text-left">
          <div className="space-y-2">
            <a href="#" className="block font-semibold text-maroon-800 hover:text-gray-700 transition-colors">
              Instagram
            </a>
            <a href="#" className="block font-semibold text-maroon-800 hover:text-gray-700 transition-colors">
              YouTube
            </a>
          </div>
          
          <div className="flex justify-center">
            <p className="font-semibold text-maroon-800">©2025</p>
          </div>
          
          <div className="space-y-2 text-right">
            <a href="#" className="block font-semibold text-maroon-800 hover:text-gray-700 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="block font-semibold text-maroon-800 hover:text-gray-700 transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}