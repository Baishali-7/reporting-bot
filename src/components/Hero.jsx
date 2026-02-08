import { motion } from "framer-motion";
import { Bot, ArrowRight, ShieldCheck, Clock, FileCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-amber-50 to-stone-100">
      {/* Background grid effect - pure Tailwind */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 69, 19, 0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow orbs - pure Tailwind */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-stone-400/10 rounded-full blur-[100px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-800/30 bg-amber-800/10 text-amber-900 text-sm font-medium mb-8"
          >
            <Bot className="w-4 h-4" />
            Bot-Driven Regulatory Compliance
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-stone-900"
          >
            Automate, validate, and submit{" "}
            <span className="bg-gradient-to-r from-amber-700 to-stone-700 bg-clip-text text-transparent">
              regulatory reports
            </span>{" "}
            accurately and on time.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Reporting.bot uses intelligent automation to help financial
            institutions reduce compliance risk, eliminate manual errors, and
            meet every submission deadline — effortlessly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() =>
                document
                  .getElementById("bot")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-center gap-2 px-8 py-3 text-base h-12 font-medium rounded-lg bg-gradient-to-r from-amber-700 to-stone-700 text-white hover:from-amber-800 hover:to-stone-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Bot className="w-5 h-5" />
              Talk to Compliance Bot
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("checker")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-center gap-2 px-8 py-3 text-base h-12 font-medium rounded-lg border-2 border-amber-800/30 text-stone-800 hover:bg-amber-50 transition-all duration-200 hover:border-amber-800/50 active:scale-[0.98]"
            >
              Check Readiness
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: ShieldCheck, label: "Reports Automated", value: "50+" },
              { icon: Clock, label: "Avg. Time Saved", value: "85%" },
              { icon: FileCheck, label: "Jurisdictions Covered", value: "30+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-6 rounded-xl border border-amber-800/20 bg-white/50 backdrop-blur-sm shadow-sm"
              >
                <stat.icon className="w-6 h-6 text-amber-700" />
                <span className="text-3xl font-bold text-stone-900">
                  {stat.value}
                </span>
                <span className="text-sm text-stone-600">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
