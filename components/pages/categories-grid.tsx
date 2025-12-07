"use client";

import { motion, easeOut } from "motion/react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useAllCategories } from "@/lib/hooks/useCategories";
import {
  staggerContainer,
  fadeUpVariant,
  scaleUpVariant,
} from "@/lib/types/animations";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const CategoriesGrid = () => {
  const { language, direction, message } = useLanguage();
  const { data, isLoading, error } = useAllCategories(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isRTL = direction === "rtl";

  if (isLoading) {
    return (
      <section className="py-20 text-center text-lg">
        {message("loading", "Loading...")}
      </section>
    );
  }

  if (error || !data?.data) {
    return (
      <section className="py-20 text-center text-lg text-red-500">
        {message("loading.error", "Failed to load data.")}
      </section>
    );
  }
  const categories = data.data;

  return (
    <section className={`py-24 md:py-32 bg-muted/30 ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Page Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {message("categories.all", "All Categories")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {message(
              "categories.all.subtitle",
              "Browse our complete selection of marble and stone categories"
            )}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              variants={scaleUpVariant}
              custom={index}
              key={category.id}
            >
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
                  {/* Image */}
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

                    {/* Gradient */}
                    <div
                      className="
                        absolute inset-0 
                        bg-gradient-to-t from-black/60 via-black/20 to-transparent
                        opacity-60 group-hover:opacity-80
                        transition-opacity duration-500
                      "
                    />

                    {/* Name */}
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

                  {/* Description + View */}
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
                      <span>
                        {message("categories.viewproducts", "View Products")}
                      </span>
                      <ChevronRight
                        className="
                          w-4 h-4 ml-1
                          transform transition-transform duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
