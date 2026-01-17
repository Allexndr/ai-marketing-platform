"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getWebsiteContent, WebsiteContent } from "@/lib/content";

export default function Home() {
  const [content, setContent] = useState<WebsiteContent | null>(null);

  useEffect(() => {
    getWebsiteContent().then(setContent);
  }, []);

  if (!content) return null;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Using the generated image as a subtle background or main visual */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/luxury_ai_fashion_hero_1768629144406.png')] bg-cover bg-center opacity-100 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7] to-transparent z-10" />
        </div>

        <div className="container relative z-20 px-8 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-neutral-500">
              Est. 2024 • Global AI Consultancy
            </h2>
            <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[1.1] mb-10 text-neutral-900">
              Elevating Brands <br />
              <span className="italic text-neutral-400">Beyond Reality.</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-xl mb-12 font-light leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex items-center gap-6">
              <Link href="/services">
                <Button className="rounded-none h-14 px-10 bg-neutral-900 text-white hover:bg-neutral-800 text-lg transition-all duration-500 ease-out">
                  {content.hero.cta}
                </Button>
              </Link>
              <Link href="/ai-demo" className="flex items-center gap-3 text-neutral-900 hover:text-neutral-500 transition-colors">
                <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-1" />
                </div>
                <span className="text-sm tracking-wide uppercase">Watch Showreel</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section className="py-32 px-8 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h3 className="text-4xl font-serif mb-6">The Art of <br />Intelligence.</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl font-light leading-relaxed text-neutral-600">
              We fuse the timeless elegance of luxury design with the infinite possibilities of generative AI.
              From virtual influencers that embody your brand's soul to hyper-realistic product campaigns created without a camera.
            </p>
            <div className="mt-12 w-full h-[1px] bg-neutral-200" />
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-serif">Selected Works</h2>
            <Link href="/work" className="text-lg underline underline-offset-8 decoration-1 decoration-neutral-300 hover:decoration-neutral-900 transition-all">View All Cases</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {content.portfolio.slice(0, 2).map((item, idx) => (
              <div key={item.id} className={`group cursor-pointer ${idx === 1 ? 'md:mt-24' : ''}`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-2 group-hover:italic transition-all">{item.title}</h3>
                <p className="text-sm text-neutral-500 uppercase tracking-widest">AI Campaign • 2025</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-24 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-6xl font-serif mb-8 leading-tight">Let's create <br /> the impossible.</h2>
            <a href="mailto:hello@ai.agency" className="text-2xl border-b border-white/30 pb-2 hover:border-white transition-all">hello@ai.agency</a>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm text-neutral-400">
            <div className="space-y-4">
              <p className="uppercase tracking-widest text-white mb-6">Socials</p>
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p>Twitter / X</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
