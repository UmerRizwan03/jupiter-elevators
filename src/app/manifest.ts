import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jupiter Elevators | جوبيتر للمصاعد",
    short_name: "Jupiter Elevators",
    description: "Wholesale distributor of certified elevator components & spare parts across Saudi Arabia and GCC.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F7F9",
    theme_color: "#0B0F19",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

