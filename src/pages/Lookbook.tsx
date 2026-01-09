import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SocialIcons from '@/components/SocialIcons';

const Lookbook = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-8">LOOKBOOK</h1>
        <p className="text-sm text-muted-foreground mb-8">Coming soon...</p>
        
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

export default Lookbook;
