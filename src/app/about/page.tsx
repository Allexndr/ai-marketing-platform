"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-6">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-24"
            >
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">The Future is Curated.</h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                    We are not just marketers. We are architects of the digital age, blending algorithmic precision with human artistry to create campaigns that feel inevitable.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[3/4] rounded-sm overflow-hidden bg-secondary"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/luxury_fashion.png" alt="Our Vision" className="object-cover w-full h-full opacity-90" />
                </motion.div>

                <div className="space-y-8">
                    <h2 className="text-3xl font-serif">Philosophy</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Traditional marketing is noisy. We believe in quiet power. By leveraging generative AI, we construct brand narratives that are hyper-personalized yet universally resonant. Our approach minimizes waste and maximizes impact.
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                        <div>
                            <div className="text-4xl font-serif mb-2 text-primary">04</div>
                            <div className="text-sm tracking-widest uppercase">Years Research</div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif mb-2 text-primary">2.4M</div>
                            <div className="text-sm tracking-widest uppercase">Assets Generated</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
