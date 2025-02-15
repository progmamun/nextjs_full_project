import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates and news.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button >Subscribe</Button>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
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