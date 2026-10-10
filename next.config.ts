import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers(){return [{source:"/sw.js",headers:[{key:"Cache-Control",value:"no-cache, no-store, must-revalidate"},{key:"Service-Worker-Allowed",value:"/"}]},{source:"/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store"}]},{source:"/api/:path*",headers:[{key:"Cache-Control",value:"no-store"}]}];},
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
