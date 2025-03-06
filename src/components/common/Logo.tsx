import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';

const Logo = () => {
  return (
    <div className="mt-8 mb-6">
      <Link href="/" className="flex items-center space-x-2">
        {/* Logo Image */}
        <Image
          src={logo}
          alt="NonProfit Logo"
          width={100}
          height={100}
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        {/* Text Container */}
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-sky-600">
            বাংলাদেশ ইসলামী ছাত্রশিবির
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-sky-600">
            রবীন্দ্র বিশ্ববিদ্যালয়
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;