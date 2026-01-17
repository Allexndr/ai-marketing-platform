
export type WebsiteContent = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  portfolio: {
    id: string;
    title: string;
    image: string;
  }[];
  contact: {
    email: string;
    instagram: string;
    telegram: string;
  };
};

export async function getWebsiteContent(): Promise<WebsiteContent> {
  const res = await fetch('http://localhost:3000/api/admin/content', {
    next: { revalidate: 0 },
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    console.error("Failed to fetch content via API");
    // Fallback if API fails
    return {
      hero: { title: "Elevating Brands", subtitle: "Beyond Reality.", cta: "Inquire" },
      about: { title: "The Art of Intelligence", description: "Luxury AI Marketing." },
      services: [],
      portfolio: [
        {
          id: "1",
          title: "Fashion Week 2025",
          image: "/luxury_ai_fashion_hero_1768629144406.png"
        },
        {
          id: "2",
          title: "Aurum & Cloud",
          image: "/luxury_product_perfume_1768629159001.png"
        }
      ],
      contact: { email: "", instagram: "", telegram: "" }
    };
  }
  return res.json();
}
