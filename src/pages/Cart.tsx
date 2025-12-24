import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

interface CartItem {
  id: number;
  name: string;
  style: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Angora Script Sweater',
      style: 'Light Blue',
      size: 'Small',
      quantity: 1,
      price: 33000,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop'
    }
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      <main className="flex-1 px-4 md:px-8 lg:px-16 mt-8 max-w-4xl mx-auto w-full">
        {/* Cart Title */}
        <h1 className="text-sm text-center mb-8 text-foreground">cart</h1>
        
        {/* Items count */}
        <p className="text-sm mb-6 text-foreground">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
        </p>
        
        {/* Cart Items */}
        <div className="border-t border-foreground">
          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-foreground">
              <p className="text-sm">Your cart is empty</p>
              <Link to="/shop" className="footer-link text-sm mt-4 inline-block">
                continue shopping
              </Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-start gap-4 py-6 border-b border-muted">
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                
                {/* Product Details */}
                <div className="flex-1 text-sm text-foreground">
                  <p className="font-medium">{item.name}</p>
                  <p>Style: {item.style}</p>
                  <p>Size: {item.size}</p>
                  <p>x {item.quantity}</p>
                </div>
                
                {/* Remove Button */}
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="bg-foreground text-background px-4 py-2 text-xs"
                >
                  remove
                </button>
                
                {/* Price */}
                <p className="text-sm text-foreground w-24 text-right">
                  ¥{item.price.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        
        {/* Subtotal */}
        {cartItems.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-sm text-foreground border border-foreground inline-block px-4 py-2">
              subtotal (tax incl.) : ¥{subtotal.toLocaleString()}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => navigate('/shop')}
              className="btn-cart-secondary"
            >
              keep shopping
            </button>
            <button 
              onClick={() => navigate('/checkout')}
              className="btn-cart"
            >
              checkout
            </button>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 mb-8 px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between items-center text-sm max-w-4xl mx-auto text-foreground">
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
        <div className="mt-8 text-xs text-center max-w-4xl mx-auto">
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

export default Cart;
