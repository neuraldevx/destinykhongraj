type Service = {
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
  // Optional: tweak how the background image is placed
  // position: CSS object like 'center', '50% 30%', 'top', etc.
  position?: string;
  // fit: 'cover' keeps full-bleed; 'contain' avoids cropping (may letterbox)
  fit?: 'cover' | 'contain';
  // gallery images for the Pinterest-like showcase
  gallery?: string[];
};

export const services: Service[] = [
  {
    title: "SOCIAL MEDIA & CONTENT CREATION",
    description:
      "I’ve managed multi-platform content calendars, grown engagement, and launched products through TikTok Shop- all while concepting and creating content that's scroll-stopping. I leverage my graphic design skills to create compelling visuals and messaging that engage audiences across multiple social platforms.",
    keywords: ["Content Calendars", "TikTok Shop", "Graphic Design", "Engagement"],
    imageUrl: "/images/services/image-1.png",
    position: '50% 50%', // Move focus higher to center face
    fit: 'contain', // Avoid cropping
    gallery: [
      "/images/hero/image-1.png",
      "/images/projects/project-1.jpg",
      "/images/hero/image-2.png",
      "/images/services/image-1.png",
      "/images/hero/image-3.png",
      "/images/projects/project-2.jpg",
      "/images/hero/image-4.png",
      "/images/projects/project-4.jpg",
    ],
  },
  {
    title: "MARKETING AND CONTENT STRATEGY",
    description:
      "I blend storytelling and strategy to craft campaigns that connect and convert. From branded emails, influencer gifting, events, and SEO-driven content, I lead 360° marketing efforts that are data-backed, visually compelling.",
    keywords: ["Campaigns", "Email", "Influencers", "Events", "SEO"],
    imageUrl: "/images/services/image-2.png",
    position: '50% 50%', // Move focus higher to center face
    fit: 'cover', // Avoid cropping
    gallery: [
      "/images/hero/image-5.png",
      "/images/projects/project-2.jpg",
      "/images/hero/image-6.png",
      "/images/services/image-2.png",
      "/images/hero/image-7.png",
      "/images/projects/project-4.jpg",
      "/images/hero/image-8.png",
    ],
  },
  {
    title: "E-COMMERCE",
    description:
      "I support e-commerce growth through content, strategy, and design. I’ve created product graphics, Amazon storefronts while also running a freelance web design studio where I’ve built custom Shopify sites for emerging fashion brands. I also design email flows that align with each brand’s voice and convert browsers into loyal customers.",
    keywords: ["Shopify", "Amazon", "Product Graphics", "Email Flows"],
    imageUrl: "/images/services/image-3.png",
    position: '90% 90%', // Move focus higher to center face
    gallery: [
      "/images/projects/project-1.jpg",
      "/images/services/image-3.png",
      "/images/hero/image-2.png",
      "/images/hero/image-9.png",
      "/images/projects/project-4.jpg",
    ],
  },
  {
    title: "PUBLICATIONS",
    description:
      "As a former managing editor, I’ve led editorial teams, produced full-length magazine issues, and collaborated with creatives to shape cohesive, compelling print and digital stories.",
    keywords: ["Editorial", "Print", "Digital", "Team Leadership"],
    imageUrl: "/images/services/image-4.png",
    position: '90% 90%', // Move focus higher to center face
    fit: 'cover', // Avoid cropping
    gallery: [
      "/images/services/image-4.png",
      "/images/hero/image-3.png",
      "/images/projects/project-2.jpg",
      "/images/hero/image-1.png",
      "/images/hero/image-7.png",
    ],
  },
  {
    title: "FASHION STYLING",
    description:
      "My styling roots run deep. From working editorial shoots to retail floor styling, I understand how to visually translate trends, brand identity, and personal expression into wearable storytelling.",
    keywords: ["Styling", "Editorial", "Retail", "Trends"],
    imageUrl: "/images/services/image-5.png",
    position: '15% 15%', // Move focus higher to center face
    gallery: [
      "/images/services/image-5.png",
      "/images/hero/image-4.png",
      "/images/projects/project-1.jpg",
      "/images/hero/image-6.png",
      "/images/hero/image-8.png",
    ],
  },
];
