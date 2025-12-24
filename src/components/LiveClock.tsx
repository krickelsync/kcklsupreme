import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface LiveClockProps {
  className?: string;
}

const LiveClock = ({ className = '' }: LiveClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Format: MM/DD/YYYY HH:mmam/pm TYO
  const formattedDate = format(time, 'MM/dd/yyyy');
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  
  const formattedTime = `${displayHours}:${minutes}${ampm}`;

  return (
    <div className={`font-mono text-xs tracking-wide ${className}`}>
      {formattedDate} {formattedTime} TYO
    </div>
  );
};

export default LiveClock;
