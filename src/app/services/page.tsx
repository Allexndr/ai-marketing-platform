"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import { getWebsiteContent, WebsiteContent } from "@/lib/content";
import { motion } from "framer-motion";
import { Bot, Camera, Zap, Globe, Cpu, Sparkles } from "lucide-react";

// Map icon strings to components with more options
const iconMap: Record<string, any> = {
    Bot,
    Camera,
    Zap,
    Globe,
    Cpu,
    Sparkles
};

export default function ServicesPage() {
    const [content, setContent] = useState<WebsiteContent | null>(null);

    useEffect(() => {
        getWebsiteContent().then(setContent);
    }, []);

    if (!content) return null;

    return (
        <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-4 md:px-8">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto"
            >
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <h1 className="text-5xl md:text-7xl font-serif mb-8">Our Expertise</h1>
                    <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">
                        Precision-engineered solutions for the modern brand ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {content.services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Zap;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-8 border border-neutral-200 hover:border-neutral-900 transition-colors duration-500 bg-white"
                            >
                                <div className="w-12 h-12 mb-8 text-neutral-900">
                                    <Icon strokeWidth={1} className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                                <p className="text-neutral-500 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </main>
    );
}
