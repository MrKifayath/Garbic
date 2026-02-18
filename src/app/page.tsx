import { MainLayout } from '@/components/layout/main-layout';
import { getFeaturedProducts, getAllProducts } from '@/lib/data';
import { Button, LazySection } from '@/components/ui';
import { DynamicProductCarousel } from '@/lib/dynamic-imports';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Get featured products for the carousel
  const featuredProducts = getFeaturedProducts(8);
  
  // Get some products for offers carousel (products with discounts)
  const allProducts = getAllProducts();
  const offerProducts = allProducts
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-accent-900/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ New Arrivals Every Week
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Shop Smart, Live Better
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-slate-300">
                Discover premium products at unbeatable prices with India-wide delivery
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white shadow-2xl">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/products?category=electronics">
                  <Button size="lg" variant="outline" className="border-2 border-slate-400 text-white hover:bg-white hover:text-slate-900">
                    Shop Electronics
                  </Button>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">10K+</div>
                  <div className="text-sm text-slate-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-400">500+</div>
                  <div className="text-sm text-slate-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">4.8★</div>
                  <div className="text-sm text-slate-400">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="relative h-80 sm:h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero/shopping-hero.jpg"
                  alt="Shopping experience"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Floating Cards */}
                <div className="absolute top-6 right-6 bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Free Shipping</div>
                      <div className="text-xs text-slate-300">On orders above ₹500</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Fast Delivery</div>
                      <div className="text-xs text-slate-300">2-5 business days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <LazySection
        fallback={
          <section className="py-16 bg-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="h-8 bg-slate-500 rounded w-1/3 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-slate-500 rounded w-1/2 mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                    <div className="aspect-square bg-slate-500 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-500 rounded animate-pulse" />
                      <div className="h-4 bg-slate-500 rounded w-2/3 animate-pulse" />
                      <div className="h-6 bg-slate-500 rounded w-1/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      >
        <section className="py-20 bg-gradient-to-b from-slate-600 to-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-slate-200 max-w-2xl mx-auto">
                Handpicked selection of premium products at special prices
              </p>
            </div>
            
            <div>
              <DynamicProductCarousel
                products={featuredProducts}
                autoRotate={true}
                autoRotateInterval={5000}
                itemsPerView={{
                  mobile: 1,
                  tablet: 2,
                  desktop: 4
                }}
                showAddToCart={true}
              />
            </div>
          </div>
        </section>
      </LazySection>

      {/* Special Offers Carousel */}
      <LazySection
        fallback={
          <section className="py-16 bg-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="h-8 bg-slate-600 rounded w-1/3 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-slate-600 rounded w-1/2 mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-slate-600 rounded-lg border border-slate-500 overflow-hidden">
                    <div className="aspect-square bg-slate-500 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-500 rounded animate-pulse" />
                      <div className="h-4 bg-slate-500 rounded w-2/3 animate-pulse" />
                      <div className="h-6 bg-slate-500 rounded w-1/3 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      >
        <section className="py-20 bg-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🔥 Limited Time Offers
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-4">
                Special Deals
              </h2>
              <p className="text-lg text-slate-200 max-w-2xl mx-auto">
                Don't miss out on these incredible savings
              </p>
            </div>
            
            <div>
              <DynamicProductCarousel
                products={offerProducts}
                autoRotate={true}
                autoRotateInterval={4000}
                itemsPerView={{
                  mobile: 1,
                  tablet: 2,
                  desktop: 3
                }}
                showAddToCart={true}
              />
            </div>
          </div>
        </section>
      </LazySection>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Browse our complete collection of products across all categories
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 shadow-2xl text-lg px-8 py-6">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
