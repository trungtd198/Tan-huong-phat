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
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-md">
        <Image
          src={selectedImage}
          alt=""
          fill
          aria-hidden="true"
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="scale-110 object-cover opacity-30 blur-2xl brightness-95"
          priority
        />
        <Image
          src={selectedImage}
          alt={name}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="z-10 object-contain p-6 sm:p-10"
          priority
        />
      </div>

      {galleryImages.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Xem ảnh ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-white transition',
                index === selectedIndex
                  ? 'ring-2 ring-gold-500 ring-offset-2'
                  : 'opacity-60 ring-1 ring-sand-200 hover:opacity-100',
              ].join(' ')}
            >
              <Image
                src={image}
                alt={`${name} ảnh ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
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
