"use client";

import { useState } from "react";

interface ImageGalleryProps {
  mainImage: string;
  thumbnails: string[];
  productName: string;
}

export default function ImageGallery({ mainImage, thumbnails, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailClick = (thumbnail: string) => {
    setIsLoading(true);
    setSelectedImage(thumbnail);
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Crossfade */}
      <div className="relative overflow-hidden rounded-lg bg-cream-50 aspect-square">
        <img
          src={selectedImage}
          alt={productName}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          referrerPolicy="no-referrer"
        />
        {/* Loading spinner placeholder */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-50">
            <div className="h-8 w-8 border-2 border-gray-300 border-t-amber-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Thumbnail Row */}
      <div className="grid grid-cols-4 gap-2">
        {thumbnails.map((thumbnail, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(thumbnail)}
            className={`relative overflow-hidden rounded-lg aspect-square transition-all duration-200 ${
              selectedImage === thumbnail
                ? "ring-2 ring-amber-600 opacity-100"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={thumbnail}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
