import { promises as fs } from 'fs';
import path from 'path';

// This file is SERVER-ONLY. Do not import into client components.

const contentPath = path.join(process.cwd(), 'src/data/website-content.json');

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

export async function getWebsiteContentServer(): Promise<WebsiteContent> {
  try {
    const data = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading content file (server):", error);
    return {
      hero: { title: "Error", subtitle: "Could not load content", cta: "Retry" },
      about: { title: "Error", description: "" },
      services: [],
      portfolio: [],
      contact: { email: "", instagram: "", telegram: "" }
    };
  }
}

export async function updateWebsiteContentServer(newContent: WebsiteContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(newContent, null, 2), 'utf-8');
}
