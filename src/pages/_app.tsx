import { useState } from "react";
import Layout from "components/Layout/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

type ProductsProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

export default function App({ Component, pageProps }: AppProps) {
  const [products, setProducts] = useState<ProductsProps[]>([
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
  ]);

  return (
    <Layout>
      <Component {...pageProps} products={products} />
    </Layout>
  );
}

/*

add testing
start making home page (use figma and mrbeast for design)
learn node
go to gym lazy ass
call the immigration office


stack
- next
- redux
- jest
- tailwind
- graphql
- postgres or mongo
- node & express

*/
