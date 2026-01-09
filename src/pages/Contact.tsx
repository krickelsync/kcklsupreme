import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SocialIcons from '@/components/SocialIcons';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-8">CONTACT</h1>
        <p className="text-sm text-muted-foreground mb-2">
          For inquiries, please contact us at:
        </p>
        <a href="mailto:contact@sitebykrickel.com" className="menu-link text-sm mb-8">
          contact@sitebykrickel.com
        </a>
        
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

export default Contact;
