"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import { getWebsiteContent, WebsiteContent } from "@/lib/content";
import { motion } from "framer-motion";

export default function WorkPage() {
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
                <div className="max-w-4xl mb-24">
                    <h1 className="text-6xl md:text-8xl font-serif mb-8">Selected Works</h1>
                    <p className="text-xl text-neutral-500 font-light max-w-2xl">
                        A curation of AI-generated campaigns that redefine the boundaries of digital narrative.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {content.portfolio.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-neutral-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline border-b border-neutral-200 pb-4 group-hover:border-neutral-900 transition-colors duration-500">
                                <h2 className="text-3xl font-serif">{item.title}</h2>
                                <span className="text-sm font-sans uppercase tracking-widest text-neutral-400">2025</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </main>
    );
}
