"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Target } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useAboutUs } from "@/lib/hooks/useAboutUs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeUpVariant,
  slideFromLeft,
  imageReveal,
} from "@/lib/types/animations";

// Feature badge component
interface FeatureBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureBadge = ({ icon, text }: FeatureBadgeProps) => {
  return (
    <motion.div
      variants={fadeUpVariant}
      className="
        inline-flex items-center gap-2 
        px-4 py-2 rounded-full
        bg-primary/10 text-primary
        text-sm font-medium
      "
    >
      {icon}
      <span>{text}</span>
    </motion.div>
  );
};

const AboutUsSection = () => {
  const { language, direction, message } = useLanguage();
  const { data: response, isLoading } = useAboutUs(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isRTL = direction === "rtl";

  // Loading skeleton
  if (isLoading || !response?.data) {
    return (
      <section className={`py-24 md:py-32 bg-background ${isRTL ? "rtl" : ""}`}>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="h-[450px] bg-muted/50 rounded-3xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
              <div className="h-12 w-3/4 bg-muted/50 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aboutUs = response.data;
  const translated = aboutUs.translated;

  return (
    <section
      className={`py-24 md:py-32 bg-background overflow-hidden ${
        isRTL ? "rtl" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative ${isRTL ? "lg:order-2" : ""}`}
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

            {/* Main image container */}
            <motion.div variants={imageReveal} className="relative group">
              {/* Background decoration */}
              <div
                className="
                absolute -inset-4 
                bg-gradient-to-br from-primary/20 via-primary/5 to-transparent 
                rounded-[2rem] 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-700
                -z-10
              "
              />

              {/* Image frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-foreground/5">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={
                    aboutUs.imageUrl
                      ? `${baseUrl}${aboutUs.imageUrl}`
                      : "/images/no_image.png"
                  }
                  alt={translated.mission}
                  className="w-full h-[450px] md:h-[550px] object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="
                  absolute -bottom-6 -right-6 md:bottom-8 md:-right-8
                  bg-background/95 backdrop-blur-sm
                  p-5 rounded-2xl shadow-xl
                  border border-border
                "
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">15+</p>
                    <p className="text-sm text-muted-foreground">
                      {message("aboutus.years", "Years Experience")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`space-y-8 ${isRTL ? "lg:order-1" : ""}`}
          >
            {/* Label */}
            <motion.p
              variants={fadeUpVariant}
              className="text-primary text-sm font-semibold tracking-[0.2em] uppercase"
            >
              {message("aboutus.label", "About Our Company")}
            </motion.p>

            {/* Title */}
            <motion.h2
              variants={fadeUpVariant}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight"
            >
              {message("aboutus.title")}
            </motion.h2>

            {/* Story */}
            <motion.p
              variants={fadeUpVariant}
              className="text-lg text-foreground/80 leading-relaxed"
            >
              {translated.story}
            </motion.p>

            {/* Mission */}
            <motion.p
              variants={fadeUpVariant}
              className="text-base text-muted-foreground leading-relaxed"
            >
              {translated.mission}
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-3"
            >
              <FeatureBadge
                icon={<Target className="w-4 h-4" />}
                text={message("aboutus.quality", "Premium Quality")}
              />
              <FeatureBadge
                icon={<Users className="w-4 h-4" />}
                text={message("aboutus.trusted", "Trusted Partner")}
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUpVariant}>
              <Link href="/aboutus">
                <Button
                  variant="default"
                  size="lg"
                  className="
                    group px-8 py-6 text-base
                    hover:shadow-lg hover:shadow-primary/20
                    transition-all duration-300
                  "
                >
                  {message("aboutus.readmore")}
                  <ArrowRight
                    className={`
                    w-5 h-5 transition-transform duration-300
                    ${
                      isRTL
                        ? "mr-2 group-hover:-translate-x-1"
                        : "ml-2 group-hover:translate-x-1"
                    }
                  `}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutUsSection;
