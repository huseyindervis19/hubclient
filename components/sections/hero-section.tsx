"use client";

import { useLanguage } from "@/components/language-provider";
import { useHomeSlider } from "@/lib/hooks/useHomeSlider";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { language, direction, message } = useLanguage();
  const { homeSlider, loading } = useHomeSlider(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || homeSlider.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlider.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [homeSlider.length, isAutoPlaying]);

  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + homeSlider.length) % homeSlider.length
    );
  }, [homeSlider.length]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % homeSlider.length);
  }, [homeSlider.length]);;

  // Loading state
  if (loading || homeSlider.length === 0) {
    return (
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
          />
          <p className="text-muted-foreground font-medium">
            {message("loading", "Loading...")}
          </p>
        </div>
      </section>
    );
  }

  const slide = homeSlider[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={
              slide.imageUrl
                ? `${baseUrl}${slide.imageUrl}`
                : "/images/no_image.png"
            }
            alt={slide.translated.title || message("hero.alt", "Hero Image")}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Label */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`top-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6"
              style={{ direction }}
            >
              {message("hero.topText", "Premium Natural Marble Collections")}
            </motion.h1>
          </AnimatePresence>

          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              {slide.translated.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {slide.translated.subTitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Button */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href={slide.ctaLink || "/products"}>
                <Button
                  size="lg"
                  className="
                    px-10 py-6 text-base font-semibold
                    bg-white text-foreground 
                    hover:bg-white/90 hover:scale-105
                    transition-all duration-300
                    shadow-2xl shadow-black/20
                  "
                >
                  {slide.translated.ctaText}
                </Button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPrevious}
            className="
              pointer-events-auto
              p-3 md:p-4 rounded-full 
              bg-white/10 backdrop-blur-md border border-white/20
              text-white hover:bg-white/20
              transition-colors duration-300
              hidden md:flex items-center justify-center
            "
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            className="
              pointer-events-auto
              p-3 md:p-4 rounded-full 
              bg-white/10 backdrop-blur-md border border-white/20
              text-white hover:bg-white/20
              transition-colors duration-300
              hidden md:flex items-center justify-center
            "
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-3">
          {homeSlider.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-1"
              aria-label={`Slide ${index + 1}`}
            >
              <div
                className={`
        h-2 rounded-full transition-all duration-500
        ${
          index === currentSlide
            ? "w-10 bg-white"
            : "w-2 bg-white/40 hover:bg-white/60"
        }
      `}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">
            {message("hero.scroll", "Scroll")}
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
