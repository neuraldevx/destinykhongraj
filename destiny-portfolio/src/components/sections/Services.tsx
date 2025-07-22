import { services } from "@/data/services";

export default function Services() {
  return (
    // Enhanced background with sophisticated gradient
    <section id="services" className="px-4 py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_40%,rgba(107,114,128,0.1)_50%,transparent_60%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced section title with better typography */}
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-maroon-800 font-inter tracking-tight">
          Services
        </h2>

        <div className="space-y-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
  index: number;
};

function ServiceCard({ title, description, keywords, imageUrl, index }: ServiceCardProps) {
  return (
    // Enhanced card with better shadows, backdrop, and hover effects
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-maroon-200">
      <div className="flex flex-col lg:flex-row justify-between mb-8">
        <h3 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-4 lg:mb-0">
          {title}
        </h3>
        <span className="text-2xl md:text-4xl font-semibold text-gray-400">
          (0{index})
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {keywords.map((keyword, keyIndex) => (
              <span
                key={keyIndex}
                className="px-4 py-2 bg-gray-200 text-maroon-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-maroon-700 to-maroon-900 rounded-xl h-64 lg:h-80 flex items-center justify-center">
            <p className="text-white font-semibold text-lg">
              {imageUrl ? "Image" : "Service Image"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}