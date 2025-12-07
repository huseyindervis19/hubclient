"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/types/animations";

interface SectionHeaderProps {
  topLabel?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  topLabel,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`
        ${align === "center" ? "text-center mx-auto" : "text-left"}
        max-w-3xl mb-16
        ${className}
      `}
    >
      {topLabel && (
        <motion.p
          variants={fadeUpVariant}
          className="text-primary/80 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
        >
          {topLabel}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUpVariant}
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-5 leading-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUpVariant}
          className="text-muted-foreground text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
