import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/join",
        destination: "https://linktr.ee/mhc_plusplus",
        // Temporary (307) so browsers don't cache it if the destination changes.
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
