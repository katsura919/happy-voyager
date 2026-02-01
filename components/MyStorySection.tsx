"use client";

import { ArrowRight, Youtube, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function MyStorySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="relative order-2 lg:order-1 h-[500px] lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-md h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="/assets/story_image.jpg"
                alt="Abie Maxey"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Badge Overlay */}
              <div className="absolute top-8 left-8 bg-[#e3a99c] text-white px-6 py-4 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">2+</div>
                <div className="text-sm font-medium">Years Traveling</div>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#e3a99c]/20 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                My Story
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              Hi, I'm Your Guide to Spain's Digital Nomad Visa
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              After 2+ years of traveling as a digital nomad, I knew I wanted a
              European base. Spain called to me with its incredible culture,
              food, and quality of life.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              But when I started researching the Digital Nomad Visa, I hit a
              wall. Forum threads were outdated, government websites had broken
              links, and everyone seemed to suggest hiring an expensive lawyer.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              <span className="font-semibold text-[#3a3a3a]">
                I decided to figure it out myself.
              </span>{" "}
              After countless hours of research, form-filling, and navigating
              the UGE system, I got my visa approved—without a lawyer.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-8 leading-relaxed">
              Now I'm sharing everything I learned so you don't have to go
              through the same confusion. This playbook is the resource I wish I
              had.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#f2d6c9]">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  100+
                </div>
                <div className="text-sm text-[#6b6b6b]">Nomads Helped</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  95%
                </div>
                <div className="text-sm text-[#6b6b6b]">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  €0
                </div>
                <div className="text-sm text-[#6b6b6b]">Lawyer Fees</div>
              </div>
            </div>

            <Link
              href="/my-story"
              className="inline-flex items-center gap-2 text-[#3a3a3a] font-semibold group hover:text-[#e3a99c] transition-colors text-lg"
            >
              Read My Full Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
