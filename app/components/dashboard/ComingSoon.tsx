import { useState, useEffect } from 'react';
import { FaRocket, FaBell, FaEnvelope, FaClock, FaStar, FaPaintBrush, FaPalette, FaHeart } from 'react-icons/fa';

interface ComingSoonProps {
  title?: string;
  description?: string;
  launchDate?: string;
  theme?: 'default' | 'art' | 'minimal' | 'gradient';
  onNotify?: (email: string) => void;
}

export default function ComingSoon({ 
  title = "Something Amazing is Coming Soon",
  description = "We're working hard to bring you an incredible new experience. Stay tuned for updates!",
  launchDate = "2025-10-10",
  theme = "default",
  onNotify 
}: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const launch = new Date(launchDate);
      const now = new Date();
      const difference = launch.getTime() - now.getTime();
      return Math.ceil(difference / (1000 * 3600 * 24));
    };
    
    setDaysLeft(calculateDaysLeft());
  }, [launchDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onNotify) {
      onNotify(email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const themes = {
    default: {
      background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/20',
      text: 'text-gray-800 dark:text-white',
      card: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
      accent: 'text-blue-600 dark:text-blue-400',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    art: {
      background: 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20',
      text: 'text-gray-800 dark:text-white',
      card: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
      accent: 'text-purple-600 dark:text-purple-400',
      button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
    },
    minimal: {
      background: 'bg-white dark:bg-gray-900',
      text: 'text-gray-900 dark:text-white',
      card: 'bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm',
      accent: 'text-gray-700 dark:text-gray-300',
      button: 'bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white'
    },
    gradient: {
      background: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
      text: 'text-white',
      card: 'bg-white/10 backdrop-blur-md',
      accent: 'text-yellow-300',
      button: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
    }
  };

  const currentTheme = themes[theme];

  const renderIcon = () => {
    switch (theme) {
      case 'art':
        return <FaPalette className="text-6xl mb-6 text-purple-500 animate-pulse" />;
      case 'minimal':
        return <FaClock className="text-6xl mb-6 text-gray-600 dark:text-gray-400" />;
      case 'gradient':
        return <FaStar className="text-6xl mb-6 text-yellow-300 animate-bounce" />;
      default:
        return <FaRocket className="text-6xl mb-6 text-blue-500 animate-bounce" />;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${currentTheme.background} ${currentTheme.text}`}>
      <div className="max-w-2xl w-full text-center">
        {/* Animated Background Elements */}
        {theme === 'art' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-300/10 rounded-full blur-2xl"></div>
          </div>
        )}

        {theme === 'gradient' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          </div>
        )}

        <div className={`relative rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 ${currentTheme.card}`}>
          {/* Main Icon */}
          <div className="flex justify-center mb-8">
            {renderIcon()}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-current to-current bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            {description}
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <div className="flex justify-center gap-4 md:gap-6 mb-4">
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${currentTheme.accent}`}>
                  {daysLeft}
                </div>
                <div className="text-sm opacity-75">Days Left</div>
              </div>
            </div>
            <div className="text-sm opacity-75 flex items-center justify-center gap-2">
              <FaClock className="text-sm" />
              Launching on {new Date(launchDate).toLocaleDateString()}
            </div>
          </div>

          {/* Notify Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${currentTheme.button}`}
                >
                  <FaBell />
                  Notify Me
                </button>
              </div>
            </form>
          ) : (
            <div className={`max-w-md mx-auto p-4 rounded-xl ${theme === 'gradient' ? 'bg-white/20' : 'bg-green-100 dark:bg-green-900/20'} backdrop-blur-sm`}>
              <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
                <FaEnvelope />
                <span className="font-semibold">Thank you! We'll notify you when we launch.</span>
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-4">
            {['Art', 'Design', 'Innovation'].map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  theme === 'gradient' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                } backdrop-blur-sm`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm opacity-75 flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500 animate-pulse" /> for creatives
          </p>
        </div>
      </div>
    </div>
  );
}

// Alternative Compact Version
export function ComingSoonCompact({ 
  title = "Coming Soon",
  description = "We're working on something exciting!",
  theme = "minimal"
}: ComingSoonProps) {
  const themes = {
    default: 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100',
    art: 'bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100',
    minimal: 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
  };

  return (
    <div className={`rounded-2xl p-8 text-center shadow-lg ${themes[theme]}`}>
      <FaPaintBrush className="text-4xl mx-auto mb-4 animate-pulse" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="opacity-80 mb-4">{description}</p>
      <div className="w-12 h-1 bg-current opacity-50 mx-auto rounded-full"></div>
    </div>
  );
}

// Banner Version
export function ComingSoonBanner({ 
  title = "Coming Soon",
  launchDate = "2025-10-10" 
}: ComingSoonProps) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const launch = new Date(launchDate);
      const now = new Date();
      const difference = launch.getTime() - now.getTime();
      return Math.ceil(difference / (1000 * 3600 * 24));
    };
    
    setDaysLeft(calculateDaysLeft());
  }, [launchDate]);

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <FaRocket className="text-xl animate-bounce" />
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-amber-100 text-sm">Launching in {daysLeft} days</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-amber-100">
          <FaClock />
          <span className="text-sm">{new Date(launchDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}