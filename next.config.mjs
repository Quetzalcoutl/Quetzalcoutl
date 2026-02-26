/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // internationalization support for English and Portuguese
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    // we'll handle locale detection ourselves in middleware
    localeDetection: false,
  },
}

export default nextConfig
