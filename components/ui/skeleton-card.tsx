"use client";

import { motion } from "framer-motion";

interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string;
  lines?: number;
}

export function SkeletonCard({ 
  hasImage = true, 
  imageHeight = "h-60",
  lines = 3 
}: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl bg-card border border-border p-6"
    >
      {hasImage && (
        <div className={`${imageHeight} bg-muted/50 rounded-xl mb-5 animate-pulse`} />
      )}
      <div className="space-y-3">
        <div className="h-6 bg-muted/50 rounded-lg w-3/4 animate-pulse" />
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={`h-4 bg-muted/50 rounded animate-pulse ${
              i === lines - 1 ? "w-1/2" : "w-full"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </motion.div>
  );
}