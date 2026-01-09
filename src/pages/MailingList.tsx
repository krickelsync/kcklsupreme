import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SocialIcons from '@/components/SocialIcons';
import { toast } from 'sonner';

const MailingList = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-8">MAILING LIST</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Subscribe to receive updates on new releases and exclusive offers.
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="px-4 py-2 border border-foreground bg-transparent text-foreground text-sm"
            required
          />
          <button type="submit" className="px-4 py-2 bg-foreground text-background text-sm">
            subscribe
          </button>
        </form>
        
        <Link to="/" className="menu-link text-sm">
          ← back to home
        </Link>
        
        <div className="mt-12">
          <SocialIcons />
        </div>
      </main>
    </div>
  );
};

export default MailingList;
