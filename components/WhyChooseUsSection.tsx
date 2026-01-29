"use client";

import { Award, Heart, Zap, MessageCircle, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Lived Experience",
    description:
      "I&apos;ve personally navigated the weak passport struggle and built systems that work. This isn&apos;t theory—it&apos;s my life.",
    color: "#e3a99c",
  },
  {
    icon: Heart,
    title: "Personalized Approach",
    description:
      "Every nomad is unique. I create custom strategies tailored to your specific situation and goals.",
    color: "#bbcccd",
  },
  {
    icon: Zap,
    title: "Clear Roadmaps",
    description:
      "No confusing bureaucracy. I provide executable playbooks that turn complex visa processes into simple steps.",
    color: "#f2d6c9",
  },
  {
    icon: MessageCircle,
    title: "Ongoing Support",
    description:
      "I don&apos;t disappear after approval. Get continued support throughout your nomad journey.",
    color: "#e3a99c",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#f9f5f2]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e3a99c]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">
                Why Work With Me
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-8 leading-tight">
              I Make the <br />
              <span className="relative inline-block z-10">
                Impossible
                <span className="absolute bottom-2 left-0 w-full h-4 bg-[#e3a99c]/30 -z-10 transform -rotate-2" />
              </span>{" "}
              <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-3 ml-2">
                Possible
              </span>
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-10 leading-relaxed max-w-lg">
              As someone who turned a weak passport into global freedom, I
              understand the frustration of navigating visa bureaucracy.
              I&apos;ve documented my systems and playbooks to help you do the
              same.
            </p>

            {/* Feature list */}
            <div className="grid gap-8">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex gap-6 group p-4 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm bg-white"
                  >
                    <reason.icon
                      className="w-7 h-7"
                      style={{ color: reason.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-2 group-hover:text-[#e3a99c] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            {/* Abstract Composition */}
            <div className="relative w-full max-w-md aspect-[4/5]">
              {/* Main Card Background */}
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden transform rotate-3 border border-[#e7ddd3]">
                {/* Pastel Gradient Mesh */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#f9f5f2] via-[#fff] to-[#e7ddd3]/30" />
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#e3a99c]/10 rounded-full blur-[60px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#bbcccd]/20 rounded-full blur-[50px]" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233a3a3a' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>

              {/* Floating Element 1: Success Rate */}
              <div className="absolute top-12 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white/50 animate-float w-64">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-[#6b6b6b] font-medium mb-1">Approval Rate</p>
                    <h4 className="text-4xl font-bold text-[#3a3a3a]">98%</h4>
                  </div>
                  <div className="bg-[#e3a99c]/10 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-[#e3a99c]" />
                  </div>
                </div>
                {/* Mini Chart */}
                <div className="flex items-end gap-1 h-12">
                  {[40, 65, 50, 80, 70, 90, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 7 ? '#e3a99c' : '#e7ddd3'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Element 2: Image Card */}
              <div className="absolute top-1/3 right-[-2rem] w-64 h-80 bg-white p-3 rounded-[2rem] shadow-2xl border border-white transform -rotate-6 transition-transform hover:rotate-0 duration-500 z-10">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
                    alt="Venice Pastel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1">Italy</p>
                    <p className="font-script text-3xl">La Dolce Vita</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 3: Testimonial */}
              <div className="absolute -bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-[#e7ddd3] animate-float-delayed z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Client"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#3a3a3a] text-sm">Sarah Jenkins</p>
                    <p className="text-xs text-[#e3a99c] font-medium">Freelance Designer</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#e3a99c]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#6b6b6b] italic leading-relaxed">
                  &quot;Finally got my D7 visa approved! Abie made the impossible paperwork feel like a breeze.&quot;
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

