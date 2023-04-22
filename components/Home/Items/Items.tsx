import Image from "next/image";
import React, { useRef } from "react";
import HeroImg from "/assets/hero.jpg";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const products = [
  [
    {
      id: 1001,
      name: "TechWave SuperCharger 9000",
      image: "techwave_supercharger_9000.jpg",
      price: 49.99,
      category: "Chargers",
    },
    {
      id: 1002,
      name: "BlueMax Noise-Canceling Headphones",
      image: "bluemax_headphones.jpg",
      price: 129.99,
      category: "Audio",
    },
    {
      id: 1003,
      name: 'UltraSharp 27" 4K Monitor',
      image: "ultrasharp_27_4k_monitor.jpg",
      price: 449.99,
      category: "Monitors",
    },
    {
      id: 1004,
      name: "PowerGrip 10,000mAh Power Bank",
      image: "powergrip_powerbank.jpg",
      price: 34.99,
      category: "Power Banks",
    },
    {
      id: 1005,
      name: "SwiftConnect Bluetooth Speaker",
      image: "swiftconnect_speaker.jpg",
      price: 59.99,
      category: "Speakers",
    },
    {
      id: 1006,
      name: "SmartShade RGB LED Light Bulb",
      image: "smartshade_rgb_bulb.jpg",
      price: 19.99,
      category: "Smart Home",
    },
    {
      id: 1007,
      name: "PixaClear 4K Action Camera",
      image: "pixaclear_action_camera.jpg",
      price: 199.99,
      category: "Cameras",
    },
    {
      id: 1008,
      name: "TechWave Wireless Mouse & Keyboard Combo",
      image: "techwave_mouse_keyboard.jpg",
      price: 69.99,
      category: "Keyboards & Mice",
    },
    {
      id: 1009,
      name: "StreamPro 1080p Webcam",
      image: "streampro_webcam.jpg",
      price: 79.99,
      category: "Webcams",
    },
    {
      id: 1010,
      name: "TriFiber Ultra-Thin HDMI Cable 6ft",
      image: "trifiber_hdmi_cable.jpg",
      price: 14.99,
      category: "Cables & Adapters",
    },
  ],
];

const Items = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 270, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Featured Items</h1>
        <div className="text-base flex items-center space-x-4">
          <button className="text-base">Show All</button>
          <div
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            <BsChevronLeft />
          </div>
          <div
            className="bg-gray-500 text-white p-1 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            <BsChevronRight />
          </div>
        </div>
      </div>

      <div className="overflow-hidden py-10">
        <div
          ref={scrollRef}
          className="flex gap-4 whitespace-nowrap overflow-x-scroll scrollbar px-1"
        >
          {products[0].map((product) => (
            <div className="bg-white rounded-lg shadow w-64 inline-block mb-10">
              <Image
                src={HeroImg}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4 w-64">
                <h1 className="text-lg font-semibold pb-4 whitespace-normal">
                  {product.name}
                </h1>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;

// {
/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {products[0].map((product) => (
          <div className="bg-white rounded-lg shadow-lg">
            <Image
              src={HeroImg}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold pb-4">{product.name}</h1>
              <p className="text-gray-500">${product.price}</p>
            </div>
          </div>
        ))}
      </div> */
// }
