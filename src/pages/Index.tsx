import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SocialIcons from '@/components/SocialIcons';

const menuItems = [
  { label: 'news', path: '/news' },
  { label: 'fall/winter 2025 preview', path: '/preview' },
  { label: 'fall/winter 2025 lookbook', path: '/lookbook' },
  { label: 'shop', path: '/shop', bold: true },
  { label: 'random', path: '/random' },
  { label: 'about', path: '/about' },
  { label: 'stores', path: '/stores' },
  { label: 'contact', path: '/contact' },
  { label: 'mailing list', path: '/mailing-list' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Centered Menu */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <nav className="flex flex-col items-start">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-link text-sm ${item.bold ? 'font-bold' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Social Icons */}
        <div className="mt-12">
          <SocialIcons />
        </div>
      </main>
    </div>
  );
};

export default Index;
