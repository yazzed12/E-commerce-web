import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandCardProps {
  id: string;
  name: string;
  image: string;
}

export const BrandCard: React.FC<BrandCardProps> = ({ id, name, image }) => {
  return (
    <Link href={`/brands/${id}`} className="block w-full">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 h-full">
        <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center tracking-tight truncate w-full px-2">
          {name}
        </h3>
      </div>
    </Link>
  );
};
