import BoxLogo from './BoxLogo';
import LiveClock from './LiveClock';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isWhiteTheme?: boolean;
}

const Header = ({ isWhiteTheme = false }: HeaderProps) => {
  return (
    <header className="pt-8 pb-4 flex flex-col items-center">
      <Link to="/">
        <BoxLogo />
      </Link>
      <LiveClock 
        className={`mt-3 ${isWhiteTheme ? 'text-foreground' : 'text-foreground'}`} 
      />
    </header>
  );
};

export default Header;
