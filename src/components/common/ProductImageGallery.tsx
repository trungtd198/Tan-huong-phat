'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProductImageGalleryProps = {
  name: string;
  images: string[];
};

const ProductImageGallery = ({ name, images }: ProductImageGalleryProps) => {
  const galleryImages = images.length > 0 ? images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = galleryImages[selectedIndex] ?? galleryImages[0];

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="group relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-gold-500/15 bg-white p-8 shadow-sm sm:min-h-[500px]">
        <Image
          src={selectedImage}
          alt=""
          fill
          aria-hidden="true"
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="scale-110 object-cover opacity-20 blur-2xl brightness-95"
          priority
        />
        <Image
          src={selectedImage}
          alt={name}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="z-10 object-contain p-8 transition-transform duration-700 group-hover:scale-105 sm:p-12"
          priority
        />
      </div>

      {galleryImages.length > 1 ? (
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Xem ảnh ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-white p-1 transition',
                index === selectedIndex
                  ? 'border-2 border-gold-500'
                  : 'border border-gold-500/15 opacity-70 hover:border-gold-500 hover:opacity-100',
              ].join(' ')}
            >
              <Image
                src={image}
                alt={`${name} ảnh ${index + 1}`}
                fill
                sizes="64px"
                className="rounded-lg object-contain p-1"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { ProductImageGallery };
export type { ProductImageGalleryProps };
