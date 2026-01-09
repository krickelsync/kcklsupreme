import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { items, isLoading, removeItem, updateQuantity, createCheckout, getTotalPrice } = useCartStore();

  const handleRemove = (variantId: string) => {
    removeItem(variantId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = async () => {
    const checkoutUrl = await createCheckout();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      toast.error('Failed to create checkout');
    }
  };

  const subtotal = getTotalPrice();

  return (
    <div className="min-h-screen bg-background theme-white flex flex-col">
      <Header isWhiteTheme />
      
      <main className="flex-1 px-4 md:px-8 lg:px-16 mt-8 max-w-4xl mx-auto w-full">
        {/* Cart Title */}
        <h1 className="text-sm text-center mb-8 text-foreground">cart</h1>
        
        {/* Items count */}
        <p className="text-sm mb-6 text-foreground">
          {items.length} item{items.length !== 1 ? 's' : ''} in cart
        </p>
        
        {/* Cart Items */}
        <div className="border-t border-foreground">
          {items.length === 0 ? (
            <div className="py-8 text-center text-foreground">
              <p className="text-sm">Your cart is empty</p>
              <Link to="/shop" className="footer-link text-sm mt-4 inline-block">
                continue shopping
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.variantId} className="flex items-start gap-4 py-6 border-b border-muted">
                {/* Product Image */}
                <img 
                  src={item.product.node.images?.edges?.[0]?.node?.url || '/placeholder.svg'} 
                  alt={item.product.node.title}
                  className="w-24 h-24 object-cover"
                />
                
                {/* Product Details */}
                <div className="flex-1 text-sm text-foreground">
                  <p className="font-medium">{item.product.node.title}</p>
                  {item.selectedOptions.map(opt => (
                    <p key={opt.name}>{opt.name}: {opt.value}</p>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <span>x</span>
                    <select 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.variantId, parseInt(e.target.value))}
                      className="raw-select w-16 text-xs py-1 px-2"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Remove Button */}
                <button 
                  onClick={() => handleRemove(item.variantId)}
                  className="bg-foreground text-background px-4 py-2 text-xs"
                >
                  remove
                </button>
                
                {/* Price */}
                <p className="text-sm text-foreground w-24 text-right">
                  {item.price.currencyCode === 'JPY' ? '¥' : '$'}
                  {parseFloat(item.price.amount).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        
        {/* Subtotal */}
        {items.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-sm text-foreground border border-foreground inline-block px-4 py-2">
              subtotal (tax incl.) : ¥{subtotal.toLocaleString()}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        {items.length > 0 && (
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => navigate('/shop')}
              className="btn-cart-secondary"
            >
              keep shopping
            </button>
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn-cart"
            >
              {isLoading ? 'loading...' : 'checkout'}
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
