"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/language-provider";
import { ArrowUpRight, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAllProducts } from "@/lib/hooks/useProducts";
import { staggerContainer, scaleUpVariant } from "@/lib/types/animations";

const ProductsGrid = () => {
  const { language, direction, message } = useLanguage();
  const { data, isLoading } = useAllProducts(language);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const isRTL = direction === "rtl";

  if (isLoading)
    return (
      <p className="text-center py-20">{message("loading", "Loading...")}</p>
    );

  const allProducts = data?.data || [];
  const filteredProducts = categoryId
    ? allProducts.filter((p) => p.categoryId === parseInt(categoryId))
    : allProducts;

  return (
    <section className={`py-24 bg-background ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {message("our.products", "Our Products")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {message(
              "products.all.title",
              "Browse our collection of premium marble and stone products"
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-8
          "
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={scaleUpVariant}
              custom={index}
            >
              <Link
                href={`/products/${product.id}`}
                className="group block h-full"
              >
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
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-muted/50">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      src={
                        product.mainImage
                          ? `${baseUrl}${product.mainImage}`
                          : "/images/no_image.png"
                      }
                      alt={product.translated?.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
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

                    {/* View Details */}
                    <div
                      className="
                      flex items-center gap-1 
                      text-sm font-medium text-primary
                      opacity-70 group-hover:opacity-100
                      transition-opacity duration-300
                    "
                    >
                      <span>
                        {message("products.viewdetails", "View Details")}
                      </span>
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsGrid;
