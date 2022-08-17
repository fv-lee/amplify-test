/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
  },
};

module.exports = nextConfig;
