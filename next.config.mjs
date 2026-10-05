/** @type {import('next').NextConfig} */


console.log("[DailyRhythm env]", {
  url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  key: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
});


const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  turbopack: {},

  webpack: (config, { isServer, nextRuntime, webpack }) => {
    if (isServer && nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.version': JSON.stringify(process.version),
          'process.versions': JSON.stringify(process.versions),
        })
      );
    }

    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Encoding",
            value: "gzip, br",
          },
        ],
      },
    ];
  },
};

export default nextConfig;