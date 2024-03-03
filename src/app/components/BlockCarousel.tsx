"use client";

import { useEffect, useState } from "react";
import { images } from "../images";

export default function BlockCarousel() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <img src="../minecraft-text.png" className="h-46 pb-4" />
      <div className="flex">
        <img
          src={images[currentImage].url}
          alt="Switched Image"
          className="my-4 h-32 w-32"
        />
        <img
          src={images[(currentImage + 1) % images.length].url}
          alt="Switched Image"
          className="my-4 h-32 w-32"
        />
        <img
          src={images[(currentImage + 2) % images.length].url}
          alt="Switched Image"
          className="my-4 h-32 w-32"
        />
      </div>
    </>
  );
}
