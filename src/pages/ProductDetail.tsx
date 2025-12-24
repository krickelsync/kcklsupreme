import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';
const ProductDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('1');

  // Mock product data
  const product = {
    id,
    name: 'Boxer Briefs (4 Pack)',
    brand: 'SITEBYKRICKEL®/Hanes®',
    color: 'Black',
    description: 'All cotton classic Hanes® boxer brief.',
    price: '¥7,700',
    sizes: ['Small', 'Medium', 'Large', 'XLarge'],
    images: ['https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop'],
    variants: [{
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=100&h=100&fit=crop'
    }, {
      color: 'White',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop'
    }]
  };
  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    toast.success(`Added ${product.name} to cart`);
  };
  const handleKeepShopping = () => {
    navigate('/shop');
  };
  return <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      <main className="flex-1 px-4 md:px-8 lg:px-16 mt-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-24 max-w-6xl mx-auto">
          {/* Image */}
          <div className="md:w-1/2 flex justify-end">
            <img src={product.images[0]} alt={product.name} className="w-full max-w-md" />
          </div>
          
          {/* Details */}
          <div className="md:w-1/2 max-w-sm text-secondary-foreground">
            {/* Title */}
            <h1 className="text-sm leading-tight">
              {product.brand}<br />
              {product.name}
            </h1>
            
            {/* Color */}
            <p className="text-sm font-bold mt-2">{product.color}</p>
            
            {/* Description */}
            <p className="text-sm mt-2">{product.description}</p>
            
            {/* Variant swatches */}
            <div className="flex gap-2 mt-4">
              {product.variants.map(variant => <button key={variant.color} className={`w-12 h-12 border ${variant.color === product.color ? 'border-foreground' : 'border-muted'}`}>
                  <img src={variant.image} alt={variant.color} className="w-full h-full object-cover" />
                </button>)}
            </div>
            
            {/* Price */}
            <p className="text-xl mt-6">{product.price}</p>
            
            {/* Size selector */}
            <div className="mt-4">
              <select value={size} onChange={e => setSize(e.target.value)} className="raw-select w-40">
                <option value="">-- size --</option>
                {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            {/* Quantity + Next link */}
            <div className="mt-3 flex items-center gap-6">
              <select value={quantity} onChange={e => setQuantity(e.target.value)} className="raw-select w-20">
                {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
              </select>
              
              <Link to="/shop/accessories" className="text-sm lowercase">
                next &gt;
              </Link>
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
            <Link to="/preview" className="footer-link">fall/winter 2025 preview</Link>
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
    </div>;
};
export default ProductDetail;