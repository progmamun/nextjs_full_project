import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/assets/logo.png';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src={logo}
        alt="NonProfit Logo"
        width={100}
        height={100}
        className="w-10 h-10"
      />
      <span className="md:text-2xl font-bold text-sky-600">রবিবা, শিবির</span>
    </Link>
  );
};

export default Logo;