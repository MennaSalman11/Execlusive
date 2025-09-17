// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//     images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'ecommerce.routemisr.com',
//         port: '',
//         pathname: '**',
//         search: '',
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "",
        pathname: "**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
