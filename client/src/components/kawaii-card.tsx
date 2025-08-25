import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KawaiiCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function KawaiiCard({ children, className, hover = true }: KawaiiCardProps) {
  return (
    <div
      className={cn(
        'kawaii-card p-6 rounded-2xl',
        hover && 'hover:transform hover:-translate-y-0.5 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
