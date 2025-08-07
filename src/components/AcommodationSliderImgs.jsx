import React, { useState, useEffect, useRef } from "react";
import packages from "../data/packages.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

function findPackageById(packagesObj, id) {
  for (const country in packagesObj) {
    const provinces = packagesObj[country];
    for (const province in provinces) {
      const hotels = provinces[province];
      const found = hotels.find((hotel) => String(hotel.id) === String(id));
      if (found) return found;
    }
  }
  return null;
}

export function AcommodationSliderImgs({ id }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const pkg = findPackageById(packages, id);
    if (pkg) {
      const imgs = pkg.roomImage?.length
        ? pkg.roomImage
        : pkg.image
        ? [pkg.image]
        : [];
      setImages(imgs);
      setCurrentIndex(0);
    } else {
      setImages([]);
    }
  }, [id]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide(); // swipe left
    else if (distance < -50) prevSlide(); // swipe right

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay imágenes para mostrar.
      </div>
    );
  }

  // Calcular imágenes secundarias para desktop
  const nextImage1 = images[(currentIndex + 1) % images.length];
  const nextImage2 = images[(currentIndex + 2) % images.length];

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="block lg:hidden relative">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-64 md:h-100 object-cover transition duration-300 ease-in-out"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
        >
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex gap-4 h-130 m-auto w-4/5 p-6">
        <div className="w-2/3 relative h-full overflow-hidden rounded-lg">
          <img
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover aspect-[3/2]"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="w-1/3 h-full flex flex-col gap-4">
          <div className="h-1/2 w-full overflow-hidden rounded-lg">
            <img
              src={nextImage1}
              alt="Siguiente imagen 1"
              className="w-full h-full object-cover aspect-[3/2]"
            />
          </div>
          <div className="h-1/2 w-full overflow-hidden rounded-lg">
            <img
              src={nextImage2}
              alt="Siguiente imagen 2"
              className="w-full h-full object-cover aspect-[3/2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
