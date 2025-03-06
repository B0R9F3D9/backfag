import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		webpackMemoryOptimizations: true,
	},
	devIndicators: false,
};

export default nextConfig;
