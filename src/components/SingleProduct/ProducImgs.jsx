"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const imgs = [
  {
    id: 1,
    src: "/man.jpg",
  },
  {
    id: 2,
    src: "/woman.jpg",
  },
  {
    id: 3,
    src: "/woman.jpg",
  },
  {
    id: 4,
    src: "/woman.jpg",
  },
];

const ProducImgs = () => {
  const mainImgRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      mainImgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(3)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  return (
    <div className="xl:px-10">
      {/* MAIN_IMG */}
      <div
        className="h-[600px] relative shadow-xl overflow-hidden cursor-zoom-in" 
        ref={mainImgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={imgs[index].src}
          alt=""
          fill
          className="object-cover rounded-md transition-transform duration-500 ease-in-out"
          style={zoomStyle}
        />
      </div>
      {/* OTHER_IMGS */}
      <div className="flex justify-between gap-4">
        {imgs.map((img, i) => (
          <div
            className="w-1/4 h-32 relative mt-8 gap-4 cursor-pointer"
            key={img.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducImgs;
