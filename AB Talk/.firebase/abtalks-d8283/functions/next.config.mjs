// next.config.mjs
var nextConfig = {
  transpilePackages: ["gsap", "@gsap/react"],
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
