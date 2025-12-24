import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

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

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      {/* Mobile category list */}
      <div className="md:hidden px-4 mb-6 mt-8">
        <details className="border border-foreground text-foreground">
          <summary className="px-3 py-2 cursor-pointer text-sm text-foreground">categories</summary>
          <nav className="px-3 pb-3 flex flex-col gap-1">
            <Link to="/cart" className="text-sm lowercase text-foreground font-bold">
              cart
            </Link>
            {categories.map(cat => (
              <Link key={cat.path} to={cat.path} className={`text-sm lowercase text-foreground ${cat.bold ? 'font-bold' : ''}`}>
                {cat.label}
              </Link>
            ))}
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
            {categories.map(cat => (
              <Link key={cat.path} to={cat.path} className={`category-link ${cat.bold ? 'active' : ''}`}>
                {cat.label}
              </Link>
            ))}
          </nav>
        </aside>
        
        {/* Main Grid - Offset from sidebar */}
        <main className="md:ml-[200px] px-4 md:px-8 lg:pr-16 mt-8">
          {loading ? (
            <div className="text-center py-8 text-foreground">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-foreground">
              <p>No products found</p>
              <p className="text-sm mt-2">Tell me what products you want to create!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map(product => (
                <Link key={product.node.id} to={`/product/${product.node.handle}`} className="block group">
                  <img 
                    src={product.node.images?.edges?.[0]?.node?.url || '/placeholder.svg'} 
                    alt={product.node.title} 
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="mt-2 text-xs text-foreground">
                    <p className="truncate">{product.node.title}</p>
                    <p>{product.node.priceRange.minVariantPrice.currencyCode === 'JPY' ? '¥' : '$'}{parseFloat(product.node.priceRange.minVariantPrice.amount).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
    </div>
  );
};

export default Shop;
