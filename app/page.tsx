import HeroSection from '@/components/sections/hero-section';
import CategoriesSection from '@/components/sections/categories-section';
import ProductsSection from '@/components/sections/products-section';
import AboutUsSection from '@/components/sections/about-us-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <AboutUsSection />
      <ContactSection />
    </main>
  );
}