import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Logo from '../common/Logo';
import { Mail, MapPin, MessageSquareShare, PartyPopper } from 'lucide-react';

export default function Footer() {
  // Social media links with brand-specific colors
  const socialLinks = [
    { 
      href: 'https://facebook.com', 
      icon: <FaFacebook size={20} className="text-[#1877F2] hover:opacity-80 transition-opacity" /> 
    },
    { 
      href: 'https://twitter.com', 
      icon: <FaTwitter size={20} className="text-[#1DA1F2] hover:opacity-80 transition-opacity" /> 
    },
    { 
      href: 'https://youtube.com', 
      icon: <FaYoutube size={20} className="text-[#FF0000] hover:opacity-80 transition-opacity" /> 
    },
    { 
      href: 'https://linkedin.com', 
      icon: <FaLinkedin size={20} className="text-[#0A66C2] hover:opacity-80 transition-opacity" /> 
    },
  ];

  return (
    <footer className="bg-background text-foreground py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <Logo />
            <p className="text-sm text-muted-foreground mt-4">
              আমাদের ভিশন: সমৃদ্ধ বাংলাদেশ গড়ার লক্ষ্যে সৎ, দক্ষ ও দেশপ্রেমিক নাগরিক তৈরি
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">সংশ্লিষ্ট লিংকসমূহ</h3>
            <ul className="space-y-2">
              {[
                { href: 'https://shibir.org.bd', label: 'কেন্দ্রীয় ওয়েবসাইট' },
                { href: 'https://www.chhatrasangbadbd.com', label: 'ছাত্র সংবাদ' },
                { href: 'https://www.icsbook.info', label: 'শিবির অনলাইন লাইব্রেরি' },
                { href: 'https://rub.ac.bd', label: 'রবীন্দ্র বিশ্ববিদ্যালয়ের ওয়েবসাইট' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-blue-600" />
                <Link
                  href="mailto:rubshibir@gmail.com"
                  className="text-sm text-muted-foreground hover:underline transition-colors"
                >
                  rubshibir@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-sm text-muted-foreground">
                  শাহজাদপুর, সিরাজগঞ্জ । পোস্ট কোড: ৬৭৬০
                </span>
              </li>
              <li className="flex items-center gap-2">
              <MessageSquareShare className="h-6 w-6 text-blue-600" />
              <Link
                  href="/contact"
                  className="text-sm text-blue-500 underline"
                >
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Copyright | All Rights Reserved | Developed By{' '}
            <Link
              href="https://www.linkedin.com/in/progmamun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Al Mamun Khan 
            </Link>. <PartyPopper className="h-3 w-3 text-blue-600 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}