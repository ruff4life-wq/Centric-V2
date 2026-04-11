import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/modules', icon: BookOpen, label: 'Journey' },
    { path: '/chat', icon: MessageCircle, label: 'Check In' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-sage-100 h-screen sticky top-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
            <img src="/favicon.png" alt="AGC Centric logo" className="w-10 h-10 object-cover" />
          </div>
          <span className="font-serif text-xl font-bold text-sage-900">Centric</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                location.pathname.startsWith(item.path)
                  ? "bg-sage-50 text-sage-700 font-medium"
                  : "text-sage-500 hover:bg-sage-50 hover:text-sage-600"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-sage-100">
          <div className="bg-sand-100 p-4 rounded-xl">
            <p className="text-xs text-sand-800 italic font-serif">
              "Healing begins when we stop hiding."
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white p-4 border-b border-sage-100 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/favicon.png" alt="AGC Centric logo" className="w-8 h-8 object-cover" />
          </div>
          <span className="font-serif text-lg font-bold text-sage-900">Centric</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden bg-white border-t border-sage-100 fixed bottom-0 w-full flex justify-around p-3 z-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg",
              location.pathname.startsWith(item.path)
                ? "text-sage-700"
                : "text-sage-400"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
