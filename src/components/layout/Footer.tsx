import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-gray-900 dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              We are a non-profit organization dedicated to making a difference in the world. Join us in our mission to create a better future.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-gray-400 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm text-gray-400 hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="dark:text-gray-400 dark:hover:text-white text-blue-700 hover:text-blue-300">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://twitter.com" className="dark:text-gray-400 dark:hover:text-white text-blue-700 hover:text-blue-300">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://instagram.com" className="dark:text-gray-400 dark:hover:text-white text-blue-700 hover:text-blue-300">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://linkedin.com" className="dark:text-gray-400 dark:hover:text-white text-blue-700 hover:text-blue-300">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Non-Profit Organization. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}