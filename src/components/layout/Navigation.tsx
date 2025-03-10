"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../theme/ThemeToggle";
import Logo from "../common/Logo";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

interface NavLink {
  href: string;
  label: string;
}

const Navigation: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: "/blog", label: "ব্লগ" },
    { href: "/about", label: "সংক্ষিপ্ত পরিচিতি" },
    { href: "/peoples", label: "দায়িত্বশীলবৃন্দ" },
    { href: "/advice", label: "পরামর্শ/এহতেসাব" },
    { href: "/quiz", label: "কুইজ" },
    { href: "https://www.icsbook.info", label: "অনলাইন লাইব্রেরি" },
  ];

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile nav when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll events
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle visibility based on scroll direction
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      // Toggle blur effect after scrolling down 50px
      setIsScrolled(currentScrollY > 50);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mounted]);

  // Return null or a loading state before mounting to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="h-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`${lastScrollY === 0 ? "relative" : "fixed"
          } w-full z-50 transition-all duration-300 ${isVisible ? "top-0" : "-top-24"
          } ${isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80"
            : "bg-white dark:bg-gray-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <ModeToggle />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <SignedOut>
                <SignInButton>
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                    লগইন
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-10 w-10",
                      userButtonPopoverCard: "dark:bg-gray-800 dark:text-white",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              <button
                className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <Logo />
                <button
                  className="text-gray-700 hover:text-red-500 dark:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col flex-grow p-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <SignedOut>
                  <SignInButton fallbackRedirectUrl={'/dashboard'}>
                    <button className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                      লগইন
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-10 w-10",
                        userButtonPopoverCard: "dark:bg-gray-800 dark:text-white",
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;