import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { fetchProductByHandle, fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';

interface ProductData {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState('1');
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const [productData, productsData] = await Promise.all([
          fetchProductByHandle(id),
          fetchProducts(50)
        ]);
        setProduct(productData);
        setAllProducts(productsData);
        if (productData?.variants?.edges?.[0]) {
          setSelectedVariant(productData.variants.edges[0].node.id);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const getNextProductHandle = () => {
    if (!product || allProducts.length === 0) return null;
    const currentIndex = allProducts.findIndex(p => p.node.handle === product.handle);
    if (currentIndex === -1) return allProducts[0]?.node.handle || null;
    const nextIndex = (currentIndex + 1) % allProducts.length;
    return allProducts[nextIndex]?.node.handle || null;
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    const variant = product.variants.edges.find(v => v.node.id === selectedVariant);
    if (!variant) return;

    addItem({
      product: { node: product },
      variantId: variant.node.id,
      variantTitle: variant.node.title,
      price: variant.node.price,
      quantity: parseInt(quantity),
      selectedOptions: variant.node.selectedOptions,
    });

    toast.success(`Added ${product.title} to cart`);
  };

  const handleKeepShopping = () => {
    navigate('/shop');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background theme-white flex flex-col">
        <Header isWhiteTheme />
        <div className="flex-1 flex items-center justify-center text-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background theme-white flex flex-col">
        <Header isWhiteTheme />
        <div className="flex-1 flex items-center justify-center text-foreground">
          Product not found
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
  const price = currentVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      <main className="flex-1 px-4 md:px-8 lg:px-16 mt-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-24 max-w-6xl mx-auto">
          {/* Image */}
          <div className="md:w-1/2 flex justify-end">
            <img 
              src={product.images?.edges?.[0]?.node?.url || '/placeholder.svg'} 
              alt={product.title} 
              className="w-full max-w-md" 
            />
          </div>
          
          {/* Details */}
          <div className="md:w-1/2 max-w-sm text-secondary-foreground">
            {/* Title */}
            <h1 className="text-base leading-tight">
              SITEBYKRICKEL®<br />
              {product.title}
            </h1>
            
            {/* Description */}
            <p className="text-sm mt-2">{product.description || 'No description available.'}</p>
            
            {/* Image variants */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.edges.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="w-12 h-12 border border-muted">
                    <img src={img.node.url} alt={img.node.altText || product.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Price */}
            <p className="text-xl mt-6">
              {price.currencyCode === 'JPY' ? '¥' : '$'}
              {parseFloat(price.amount).toLocaleString()}
            </p>
            
            {/* Variant selector */}
            {product.variants.edges.length > 1 && (
              <div className="mt-4">
                <select 
                  value={selectedVariant} 
                  onChange={e => setSelectedVariant(e.target.value)} 
                  className="raw-select w-32 text-xs py-1.5 px-2"
                >
                  {product.variants.edges.map(v => (
                    <option key={v.node.id} value={v.node.id}>
                      {v.node.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Quantity + Next link */}
            <div className="mt-3 flex items-center gap-6">
              <select 
                value={quantity} 
                onChange={e => setQuantity(e.target.value)} 
                className="raw-select w-16 text-xs py-1.5 px-2"
              >
                {[1, 2, 3, 4, 5].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              
              {getNextProductHandle() && (
                <Link to={`/product/${getNextProductHandle()}`} className="text-xs lowercase">
                  next &gt;
                </Link>
              )}
            </div>
            
            {/* Buttons row */}
            <div className="mt-6 flex gap-2">
              <button onClick={handleAddToCart} className="btn-cart">
                add to cart
              </button>
              <button onClick={handleKeepShopping} className="btn-cart-secondary">
                keep shopping
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer links */}
      <footer className="mt-16 mb-8 px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between items-center text-sm max-w-6xl mx-auto text-foreground">
          <div className="flex gap-4">
            <Link to="/shop" className="footer-link font-bold">shop</Link>
            <Link to="/shop/all" className="footer-link">view all</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/lookbook" className="footer-link">lookbook</Link>
            <Link to="/news" className="footer-link">news</Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-xs text-center max-w-6xl mx-auto">
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

export default ProductDetail;
