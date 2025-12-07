"use client";

import { useLanguage } from "@/components/language-provider";
import { useAboutUs } from "@/lib/hooks/useAboutUs";
import { motion, easeOut } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const AboutUsPage = () => {
  const { language, direction, message } = useLanguage();
  const { data: response, isLoading } = useAboutUs(language);

  if (isLoading || !response?.data) {
    return (
      <section
        className={`py-20 bg-secondary/50 ${direction === "rtl" ? "rtl" : ""}`}
      >
        <div className="container mx-auto px-4 text-center">
          <p>{message("loading") || "Loading..."}</p>
        </div>
      </section>
    );
  }

  const aboutUs = response.data;
  const data = aboutUs.translated;

  return (
    <div className={direction === "rtl" ? "rtl" : ""}>
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-accent/20 via-secondary/10 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {message("about.hero.title") || "About Our Company"}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {message("about.hero.subtitle") ||
              "A legacy of excellence in marble and stone craftsmanship"}
          </motion.p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {message("about.story.title") || "Our Story"}
          </motion.h2>
          <motion.div
            className="space-y-6 text-lg text-foreground/90"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <p>{data.story}</p>
            <p>{data.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: message("about.mission.title") || "Our Mission",
              content: data.mission,
            },
            {
              title: message("about.vision.title") || "Our Vision",
              content: data.vision,
            },
            {
              title: message("about.values.title") || "Our Values",
              content: data.values,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center shadow-[0_20px_40px_rgba(15,23,42,0.1)] hover:shadow-[0_30px_60px_rgba(15,23,42,0.15)] transition-all cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {item.title}
              </h3>
              <p className="text-foreground/80 text-lg">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
