interface DividerProps {
  variant?: 'default' | 'basketball' | 'gradient';
  className?: string;
}

export default function Divider({
  variant = 'default',
  className = '',
}: DividerProps) {
  if (variant === 'basketball') {
    return (
      <div className={`relative py-8 ${className}`}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-green-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-2xl">🏀</span>
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`relative py-6 ${className}`}>
        <div className="mx-auto h-1 w-full max-w-xs rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`relative py-6 ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-sm text-gray-500">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </span>
      </div>
    </div>
  );
}
