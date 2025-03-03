import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
	devIndicators: false,
};

export default nextConfig;
