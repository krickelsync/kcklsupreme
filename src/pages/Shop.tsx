import { Link } from 'react-router-dom';
import Header from '@/components/Header';
const categories = [{
  label: 'new',
  path: '/shop/new'
}, {
  label: 'jackets',
  path: '/shop/jackets'
}, {
  label: 'shirts',
  path: '/shop/shirts'
}, {
  label: 'tops/sweaters',
  path: '/shop/tops-sweaters'
}, {
  label: 'sweatshirts',
  path: '/shop/sweatshirts'
}, {
  label: 'pants',
  path: '/shop/pants'
}, {
  label: 't-shirts',
  path: '/shop/t-shirts'
}, {
  label: 'hats',
  path: '/shop/hats'
}, {
  label: 'bags',
  path: '/shop/bags'
}, {
  label: 'accessories',
  path: '/shop/accessories'
}, {
  label: 'skate',
  path: '/shop/skate'
}, {
  label: 'all',
  path: '/shop/all',
  bold: true
}];

// Mock products
const products = [{
  id: 1,
  name: 'Sherpa Jacket',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop'
}, {
  id: 2,
  name: 'Graffiti Hoodie',
  category: 'sweatshirts',
  image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop'
}, {
  id: 3,
  name: 'Pattern Hoodie',
  category: 'sweatshirts',
  image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=300&h=400&fit=crop'
}, {
  id: 4,
  name: 'Baseball Hoodie',
  category: 'sweatshirts',
  image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=400&fit=crop'
}, {
  id: 5,
  name: 'Camo Jacket',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop'
}, {
  id: 6,
  name: 'White Reflective Jacket',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop'
}, {
  id: 7,
  name: 'Snow Camo Parka',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop'
}, {
  id: 8,
  name: 'Black Down Jacket',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=300&h=400&fit=crop'
}, {
  id: 9,
  name: 'Blue Puffer',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=300&h=400&fit=crop'
}, {
  id: 10,
  name: 'Woodland Camo',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=400&fit=crop'
}, {
  id: 11,
  name: 'Black Puffer',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=300&h=400&fit=crop'
}, {
  id: 12,
  name: 'Red Satin Bomber',
  category: 'jackets',
  image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop'
}];
const Shop = () => {
  return <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      {/* Mobile category list */}
      <div className="md:hidden px-4 mb-6 mt-8">
        <details className="border border-foreground text-foreground">
          <summary className="px-3 py-2 cursor-pointer text-sm text-foreground">categories</summary>
          <nav className="px-3 pb-3 flex flex-col gap-1">
            {categories.map(cat => <Link key={cat.path} to={cat.path} className={`text-sm lowercase text-foreground ${cat.bold ? 'font-bold' : ''}`}>
                {cat.label}
              </Link>)}
          </nav>
        </details>
      </div>
      
      <div className="flex-1">
        {/* Sidebar - Fixed position, right-aligned text */}
        <aside className="fixed left-0 top-32 w-[180px] hidden md:block text-right pr-8">
          <nav className="flex flex-col gap-0.5">
            <Link to="/cart" className="category-link font-bold mb-2">
              cart
            </Link>
            {categories.map(cat => <Link key={cat.path} to={cat.path} className={`category-link ${cat.bold ? 'active' : ''}`}>
                {cat.label}
              </Link>)}
          </nav>
        </aside>
        
        {/* Main Grid - Offset from sidebar */}
        <main className="md:ml-[200px] px-4 md:px-8 lg:pr-16 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map(product => <Link key={product.id} to={`/product/${product.id}`} className="block">
                <img src={product.image} alt={product.name} className="w-full aspect-[3/4] object-cover" />
              </Link>)}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 mb-8 px-4 md:px-8 lg:px-16 md:ml-[200px] lg:pr-16 text-secondary-foreground">
        {/* Top row */}
        <div className="flex flex-wrap justify-between items-center text-sm mb-8">
          <div className="flex gap-4">
            <Link to="/shop" className="footer-link font-bold">shop</Link>
            <Link to="/shop/all" className="footer-link">view all</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/preview" className="footer-link">fall/winter 2025 preview</Link>
            <Link to="/lookbook" className="footer-link">lookbook</Link>
            <Link to="/news" className="footer-link">news</Link>
          </div>
        </div>
        
        {/* Bottom row - Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <Link to="/random" className="footer-link">random</Link>
            <Link to="/about" className="footer-link">about</Link>
            <Link to="/stores" className="footer-link">stores</Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/faq" className="footer-link">faq</Link>
            <Link to="/sizing" className="footer-link">size/measurements</Link>
            <Link to="/contact" className="footer-link">contact</Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/terms" className="footer-link">terms of use</Link>
            <Link to="/legal" className="footer-link">legal notice</Link>
            <Link to="/privacy" className="footer-link">privacy policy</Link>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/mailing-list" className="footer-link">mailing list</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-xs text-center">
          <a 
            href="https://www.instagram.com/krickel.sync/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            © 2025 SITEBYKRICKEL.<br />
            ALL RIGHTS RESERVED
          </a>
        </div>
      </footer>
    </div>;
};
export default Shop;