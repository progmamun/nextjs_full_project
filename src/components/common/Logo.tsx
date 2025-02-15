import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/logo.svg"
        alt="NonProfit Logo"
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <span className="text-2xl font-bold text-blue-600">NonProfit Name</span>
    </Link>
  );
};

export default Logo;