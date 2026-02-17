import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { FeaturedProducts } from '@/sections/FeaturedProducts';
import { PromoBanner } from '@/sections/PromoBanner';
import { PopularProducts } from '@/sections/PopularProducts';
import { Benefits } from '@/sections/Benefits';
import { Newsletter } from '@/sections/Newsletter';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <PromoBanner />
        <PopularProducts />
        <Benefits />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
