
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from '@/components/ui/use-toast';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-rescue-primary p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-2 7.5 1.503 1.06 3.499 1 4.5 0 .293-.292 1-1.714 1-5.328z" />
                <path d="M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 2 7.5-1.503 1.06-3.499 1-4.5 0-.293-.292-1-1.714-1-5.328z" />
                <path d="M18 11.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 2 7.5-1.503 1.06-3.499 1-4.5 0-.293-.292-1-1.714-1-5.328z" />
                <path d="M6.5 11.172c0-1.39-1.577-2.493-3.5-2.172-2.823.47-4.113 6.006-2 7.5 1.503 1.06 3.499 1 4.5 0 .293-.292 1-1.714 1-5.328z" />
                <path d="M12 15a6.978 6.978 0 0 1-3 5.703 7.18 7.18 0 0 1-3 1.297 7.177 7.177 0 0 1 3 1.297A6.978 6.978 0 0 1 12 29a6.978 6.978 0 0 1 3-5.703 7.18 7.18 0 0 1 3-1.297 7.177 7.177 0 0 1-3-1.297A6.978 6.978 0 0 1 12 15z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Dog Rescue</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/adopt/get"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
            >
              Adopt
            </Link>
            <Link
              to="/rescue/adopt-stray"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
            >
              Rescue
            </Link>
            <Link
              to="/lost-found/found"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
            >
              Lost & Found
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="ml-2 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile navigation */}
          <div
            className={cn(
              "fixed inset-0 top-16 z-50 flex flex-col bg-white p-6 transition-transform md:hidden",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/adopt/get"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
                onClick={closeMenu}
              >
                Adopt
              </Link>
              <Link
                to="/rescue/adopt-stray"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
                onClick={closeMenu}
              >
                Rescue
              </Link>
              <Link
                to="/lost-found/found"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-2"
                onClick={closeMenu}
              >
                Lost & Found
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="justify-start pl-3"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </nav>
      </div>
    </header>
  );
};
