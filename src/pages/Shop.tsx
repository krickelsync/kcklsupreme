import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const categories = [
  { label: 'new', path: '/shop/new' },
  { label: 'jackets', path: '/shop/jackets' },
  { label: 'shirts', path: '/shop/shirts' },
  { label: 'tops/sweaters', path: '/shop/tops-sweaters' },
  { label: 'sweatshirts', path: '/shop/sweatshirts' },
  { label: 'pants', path: '/shop/pants' },
  { label: 't-shirts', path: '/shop/t-shirts' },
  { label: 'hats', path: '/shop/hats' },
  { label: 'bags', path: '/shop/bags' },
  { label: 'accessories', path: '/shop/accessories' },
  { label: 'skate', path: '/shop/skate' },
  { label: 'all', path: '/shop/all', bold: true },
];

// Mock products
const products = [
  { id: 1, name: 'Sherpa Jacket', category: 'jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop' },
  { id: 2, name: 'Graffiti Hoodie', category: 'sweatshirts', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop' },
  { id: 3, name: 'Pattern Hoodie', category: 'sweatshirts', image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=300&h=400&fit=crop' },
  { id: 4, name: 'Baseball Hoodie', category: 'sweatshirts', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=400&fit=crop' },
  { id: 5, name: 'Camo Jacket', category: 'jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop' },
  { id: 6, name: 'White Reflective Jacket', category: 'jackets', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop' },
  { id: 7, name: 'Snow Camo Parka', category: 'jackets', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop' },
  { id: 8, name: 'Black Down Jacket', category: 'jackets', image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=300&h=400&fit=crop' },
  { id: 9, name: 'Blue Puffer', category: 'jackets', image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=300&h=400&fit=crop' },
  { id: 10, name: 'Woodland Camo', category: 'jackets', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=400&fit=crop' },
  { id: 11, name: 'Black Puffer', category: 'jackets', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=300&h=400&fit=crop' },
  { id: 12, name: 'Red Satin Bomber', category: 'jackets', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop' },
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-background theme-white">
      <Header isWhiteTheme />
      
      <div className="flex px-4 md:px-8 lg:px-16 mt-8">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0 sticky top-8 self-start hidden md:block">
          <nav className="flex flex-col gap-0.5">
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className={`category-link ${cat.bold ? 'active' : ''}`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
          
          {/* Bottom links */}
          <div className="mt-8 flex flex-col gap-0.5">
            <Link to="/shop" className="category-link font-bold">shop</Link>
            <Link to="/shop/all" className="category-link">view all</Link>
          </div>
        </aside>
        
        {/* Mobile category list */}
        <div className="md:hidden w-full mb-6">
          <details className="border border-foreground">
            <summary className="px-3 py-2 cursor-pointer text-sm">categories</summary>
            <nav className="px-3 pb-3 flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className={`text-sm lowercase ${cat.bold ? 'font-bold' : ''}`}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
        
        {/* Main Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              </Link>
            ))}
          </div>
          
          {/* Footer links */}
          <div className="mt-12 mb-8 flex flex-wrap justify-between items-center text-sm">
            <div className="flex gap-4">
              <Link to="/shop" className="font-bold lowercase">shop</Link>
              <Link to="/shop/all" className="lowercase hover:bg-primary hover:text-primary-foreground px-1">view all</Link>
            </div>
            <div className="flex gap-4">
              <Link to="/preview" className="lowercase">fall/winter 2025 preview</Link>
              <Link to="/lookbook" className="lowercase">lookbook</Link>
              <Link to="/news" className="lowercase">news</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
