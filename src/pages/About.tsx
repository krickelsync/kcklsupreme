import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SocialIcons from '@/components/SocialIcons';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">ABOUT</h1>
        <p className="text-sm text-muted-foreground mb-4">
          SITEBYKRICKEL® is a contemporary streetwear brand blending bold aesthetics with premium quality.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Founded in 2025, we create unique pieces that stand out.
        </p>
        
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

export default About;
