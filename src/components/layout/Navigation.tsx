"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../theme/ThemeToggle";
import Logo from "../common/Logo";
import { motion } from "framer-motion";

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track open/close state for mobile nav

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const navLinks = [
    { href: "/blogs", label: "Blogs" },
    { href: "/books", label: "Books" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

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
    <nav
      className={`${
        lastScrollY === 0 ? "relative" : "fixed"
      } w-full z-50 transition-all duration-300 ${
        isVisible ? "top-0" : "-top-24"
      } ${
        isScrolled
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
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2 bg-white text-black dark:bg-gray-900 dark:text-white">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Animated Navigation */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed inset-y-0 right-0 bg-white dark:bg-gray-900 w-64 shadow-lg z-50 p-6"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    className="text-gray-700 hover:text-red-500 dark:text-gray-200 self-end"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
