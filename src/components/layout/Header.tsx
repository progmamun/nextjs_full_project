"use client";
import React from 'react';
import Link from 'next/link';
// import ThemeToggle from '../theme/ThemeToggle';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-foreground border-b border-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            NonProfit Name
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link href="/about" className="text-text hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/programs" className="text-text hover:text-primary transition-colors">
                Programs
              </Link>
              <Link href="/blog" className="text-text hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-text hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text hover:text-primary"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/about" className="block text-text hover:text-primary">
              About
            </Link>
            <Link href="/programs" className="block text-text hover:text-primary">
              Programs
            </Link>
            <Link href="/blog" className="block text-text hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="block text-text hover:text-primary">
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;