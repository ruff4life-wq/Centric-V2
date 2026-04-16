import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';
import UpdateBanner, { useUpdateBadge } from './UpdateBanner';

export default function Layout() {
  const location = useLocation();
  const hasUpdate = useUpdateBadge();

  const navItems = [
    { path: '/today', icon: Home, label: 'Today' },
    { path: '/modules', icon: BookOpen, label: 'This Week' },
    { path: '/chat', icon: MessageCircle, label: 'Check In' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col md:flex-row">
      {/* Update banner — sits above everything, dismisses on tap */}
      <UpdateBanner />

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-sage-100 h-screen sticky top-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
            <img src="/favicon.png" alt="AGC Centric logo" className="w-10 h-10 object-cover" />
          </div>
          <span className="font-serif text-xl font-bold text-sage-900">Centric</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isProfile = item.path === '/profile';
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative",
                  isActive
                    ? "bg-sage-50 text-sage-700 font-medium"
                    : "text-sage-500 hover:bg-sage-50 hover:text-sage-600"
                )}
              >
                <span className="relative">
                  <item.icon size={20} />
                  {isProfile && hasUpdate && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c0736a] rounded-full" />
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
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
        {navItems.map((item) => {
          const isProfile = item.path === '/profile';
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg relative",
                isActive ? "text-sage-700" : "text-sage-400"
              )}
            >
              <span className="relative">
                <item.icon size={20} />
                {isProfile && hasUpdate && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c0736a] rounded-full" />
                )}
              </span>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
