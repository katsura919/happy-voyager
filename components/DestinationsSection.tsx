"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Wallet,
  Sun,
  ArrowRight,
} from "lucide-react";

const destinations = [
  {
    country: "Portugal",
    city: "Lisbon",
    image: "linear-gradient(135deg, #f2d6c9 0%, #e3a99c 50%, #bbcccd 100%)",
    visa: "D7 Visa",
    duration: "1-2 years",
    cost: "€3,040/mo",
    climate: "Mediterranean",
    highlights: ["No tax on foreign income", "Gateway to EU"],
    flag: "🇵🇹",
  },
  {
    country: "Spain",
    city: "Barcelona",
    image: "linear-gradient(135deg, #e7ddd3 0%, #f2d6c9 50%, #e3a99c 100%)",
    visa: "Nomad Visa",
    duration: "3 years",
    cost: "€2,646/mo",
    climate: "Mediterranean",
    highlights: ["24% flat tax rate", "Schengen Access"],
    flag: "🇪🇸",
  },
  {
    country: "Croatia",
    city: "Dubrovnik",
    image: "linear-gradient(135deg, #e3a99c 0%, #bbcccd 50%, #e7ddd3 100%)",
    visa: "Nomad Permit",
    duration: "1 year",
    cost: "€2,539/mo",
    climate: "Mediterranean",
    highlights: ["Tax-free for nomads", "EU Member"],
    flag: "🇭🇷",
  },
  {
    country: "Thailand",
    city: "Bangkok",
    image: "linear-gradient(135deg, #f2d6c9 0%, #bbcccd 50%, #e3a99c 100%)",
    visa: "LTR Visa",
    duration: "10 years",
    cost: "Unknown",
    climate: "Tropical",
    highlights: ["Low cost of living", "Great Food"],
    flag: "🇹🇭",
  },
  {
    country: "Indonesia",
    city: "Bali",
    image: "linear-gradient(135deg, #e7ddd3 0%, #f2d6c9 50%, #bbcccd 100%)",
    visa: "Second Home",
    duration: "5-10 years",
    cost: "Savings",
    climate: "Tropical",
    highlights: ["Affordable living", "Co-working"],
    flag: "🇮🇩",
  },
];

export default function DestinationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  return (
    <section
      id="destinations"
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/20 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              Global Opportunities
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Where Will Your <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              Adventure Begin?
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            Explore the most popular destinations for digital nomads,
            each offering unique visa programs and lifestyle benefits.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-4 md:px-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#e7ddd3] shadow-lg flex items-center justify-center hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#e7ddd3] shadow-lg flex items-center justify-center hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>

          <div className="overflow-hidden rounded-[3rem] bg-[#f9f5f2] border border-[#e7ddd3]">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {destinations.map((dest, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 md:p-12 lg:p-16">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <div className="relative group">
                      <div
                        className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{ background: dest.image }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Floating Flag */}
                        <div className="absolute top-8 left-8 w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                          {dest.flag}
                        </div>

                        <div className="absolute bottom-8 left-8 text-white">
                          <p className="font-[family-name:var(--font-heading)] text-lg opacity-90 mb-1">{dest.country}</p>
                          <h3 className="font-[family-name:var(--font-heading)] text-5xl font-bold">{dest.city}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-white border border-[#e7ddd3] shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-[#f2d6c9]/30 flex items-center justify-center mb-4 text-[#d69586]">
                            <Clock className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-bold text-[#bbcccd] uppercase tracking-wider mb-1">Duration</p>
                          <p className="text-xl font-bold text-[#3a3a3a]">{dest.duration}</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-[#e7ddd3] shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-[#bbcccd]/20 flex items-center justify-center mb-4 text-[#7a8f90]">
                            <Wallet className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-bold text-[#bbcccd] uppercase tracking-wider mb-1">Min Income</p>
                          <p className="text-xl font-bold text-[#3a3a3a]">{dest.cost}</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-[#e7ddd3] shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-[#e3a99c]/20 flex items-center justify-center mb-4 text-[#e3a99c]">
                            <Sun className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-bold text-[#bbcccd] uppercase tracking-wider mb-1">Climate</p>
                          <p className="text-xl font-bold text-[#3a3a3a]">{dest.climate}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm font-bold text-[#3a3a3a] uppercase tracking-wider">Key Benefits</p>
                        <div className="flex flex-wrap gap-3">
                          {dest.highlights.map((h, i) => (
                            <span key={i} className="px-4 py-2 rounded-full bg-white border border-[#e7ddd3] text-sm text-[#6b6b6b]">
                              {h}
                            </span>
                          ))}
                          <span className="px-4 py-2 rounded-full bg-[#e3a99c] text-white text-sm font-bold shadow-md">
                            {dest.visa}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <a href="#contact" className="inline-flex items-center gap-3 font-bold text-[#3a3a3a] hover:text-[#e3a99c] transition-colors group/link text-lg">
                          <span>Start your application for {dest.country}</span>
                          <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                    ? "w-8 bg-[#3a3a3a]"
                    : "w-2 bg-[#e7ddd3] hover:bg-[#bbcccd]"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
