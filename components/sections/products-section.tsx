"use client";

import { useLanguage } from "@/components/language-provider";
import { useLandingProducts } from "@/lib/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { staggerContainer, scaleUpVariant } from "@/lib/types/animations";
import { Product } from "@/lib/types/Product";

// Product Card Component
interface ProductCardProps {
  product: Product;
  index: number;
  baseUrl: string;
  viewDetailsText: string;
}

const ProductCard = ({
  product,
  index,
  baseUrl,
  viewDetailsText,
}: ProductCardProps) => {
  return (
    <motion.div variants={scaleUpVariant} custom={index}>
      <Link href={`/products/${product.id}`} className="group block h-full">
        <div
          className="
          h-full flex flex-col
          bg-card rounded-2xl overflow-hidden
          border border-border/50
          transition-all duration-500
          hover:border-primary/30
          hover:shadow-xl hover:shadow-primary/5
          hover:-translate-y-1
        "
        >
          {/* Image Container */}
          <div className="relative h-52 overflow-hidden bg-muted/50">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={
                product.mainImage
                  ? `${baseUrl}${product.mainImage}`
                  : "/images/no_image.png"
              }
              alt={product.translated?.name}
              className="w-full h-full object-cover"
            />

            {/* Quick View Overlay */}
            <div
              className="
              absolute inset-0 
              bg-black/40 backdrop-blur-[2px]
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
            >
              <div
                className="
                p-3 rounded-full 
                bg-white/20 backdrop-blur-sm
                transform scale-75 group-hover:scale-100
                transition-transform duration-300
              "
              >
                <EyeIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-5">
            <h3
              className="
              text-lg font-semibold text-foreground mb-2
              group-hover:text-primary
              transition-colors duration-300
              line-clamp-1
            "
            >
              {product.translated?.name}
            </h3>

            <p
              className="
              text-sm text-muted-foreground 
              leading-relaxed line-clamp-2
              mb-4 flex-1
            "
            >
              {product.translated?.description}
            </p>

            {/* View Details Link */}
            <div
              className="
              flex items-center gap-1 
              text-sm font-medium text-primary
              opacity-70 group-hover:opacity-100
              transition-opacity duration-300
            "
            >
              <span>{viewDetailsText}</span>
              <ArrowUpRight
                className="
                w-4 h-4
                transform transition-transform duration-300
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5
              "
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductsSection = () => {
  const { language, direction, message } = useLanguage();
  const { data, isLoading } = useLandingProducts(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isRTL = direction === "rtl";

  const products = data?.data || [];
  const featuredProducts = products.slice(0, 8);

  return (
    <section className={`py-24 md:py-32 bg-background ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          topLabel={message("products.label", "Featured Products")}
          title={message("products.title", "Our Best Sellers")}
          subtitle={message(
            "products.subtitle",
            "Handpicked selection of our best-selling marble and stone products"
          )}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} imageHeight="h-52" lines={2} />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  baseUrl={baseUrl || ""}
                  viewDetailsText={message(
                    "products.viewdetails",
                    "View Details"
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
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    px-12 py-6 text-base
                    hover:bg-primary hover:text-primary-foreground
                    transition-all duration-300
                  "
                >
                  {message("products.viewall", "View All Products")}
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
