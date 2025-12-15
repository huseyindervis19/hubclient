"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { useLandingCategories } from "@/lib/hooks/useCategories";
import { motion } from "framer-motion";
import { SectionHeader } from "../../components/ui/section-header";
import { SkeletonCard } from "../../components/ui/skeleton-card";
import { staggerContainer, scaleUpVariant } from "@/lib/types/animations";
import { Category } from "@/lib/types/Category";

interface CategoryCardProps {
  category: Category;
  index: number;
  baseUrl: string;
  viewProductsText: string;
  isRTL: boolean;
}

const CategoryCard = ({
  category,
  index,
  baseUrl,
  viewProductsText,
  isRTL,
}: CategoryCardProps) => {
  return (
    <motion.div variants={scaleUpVariant} custom={index}>
      <Link
        href={`/products?category=${category.id}`}
        className="group block"
        data-testid={`category-card-${category.id}`}
      >
        <div
          className="
          relative bg-card rounded-2xl overflow-hidden
          border border-border/50
          transition-all duration-500
          hover:border-primary/30
          hover:shadow-2xl hover:shadow-primary/5
          hover:-translate-y-2
        "
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              src={
                category.imageUrl
                  ? `${baseUrl}${category.imageUrl}`
                  : "/images/no_image.png"
              }
              alt={category.translated?.name}
              className="w-full h-full object-cover"
            />

            {/* Category Title Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3
                className="
                text-xl md:text-2xl font-semibold text-white
                transform transition-transform duration-300
                group-hover:translate-y-0 translate-y-0
              "
              >
                {category.translated?.name}
              </h3>
            </div>

            {/* Hover Arrow */}
            <div
              className="
              absolute top-4 right-4
              p-2 rounded-full 
              bg-white/10 backdrop-blur-sm
              opacity-0 group-hover:opacity-100
              transform translate-x-2 group-hover:translate-x-0
              transition-all duration-300
            "
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p
              className="
              text-muted-foreground text-sm leading-relaxed 
              line-clamp-2 mb-5 min-h-[2.8rem]
            "
            >
              {category.translated?.description}
            </p>

            <div
              className="
              flex items-center text-primary font-medium text-sm
              opacity-80 group-hover:opacity-100
              transition-opacity duration-300
            "
            >
              <span>{viewProductsText}</span>
              <ChevronRight
  className={`
    w-4 h-4
    ${isRTL ? "mr-1 rotate-180" : "ml-1"}
    transform transition-transform duration-300
    ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}
  `}
/>

            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CategoriesSection = () => {
  const { language, direction, message } = useLanguage();
  const { data, isLoading, error } = useLandingCategories(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isRTL = direction === "rtl";

  const categories = data?.data || [];

  return (
    <section
      className={`py-24 md:py-32 bg-muted/30 ${isRTL ? "rtl" : ""}`}
      data-testid="categories-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          topLabel={message("categories.top", "Our Categories")}
          title={message("categories.title", "Explore Our Categories")}
          subtitle={message(
            "categories.subtitle",
            "Discover our diverse range of premium marble and natural stone categories"
          )}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} imageHeight="h-64" lines={2} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div
              className="
              inline-flex flex-col items-center gap-4
              p-8 rounded-2xl bg-destructive/10
            "
            >
              <p className="text-destructive font-medium">
                {message(
                  "categories.error",
                  "Failed to load categories. Please try again."
                )}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                {message("retry", "Try Again")}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        {!isLoading && !error && (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {categories.map((category, index) => (
                <CategoryCard
                  isRTL={isRTL}
                  key={category.id}
                  category={category}
                  index={index}
                  baseUrl={baseUrl || ""}
                  viewProductsText={message(
                    "categories.viewproducts",
                    "View Products"
                  )}
                />
              ))}
            </motion.div>

            {/* Show More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Link href="/categories">
                <Button
                  size="lg"
                  className="
                    px-12 py-6 text-base
                    hover:shadow-lg hover:shadow-primary/20
                    transition-all duration-300
                  "
                >
                  {message("showmore", "Show More")}
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
