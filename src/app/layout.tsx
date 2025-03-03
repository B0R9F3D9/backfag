import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Backfag',
	description: 'Backfag made by b0r9f3d9',
	openGraph: {
		title: 'Backfag',
		description: 'Backfag made by b0r9f3d9',
		url: 'https://backfag.vercel.app/',
		siteName: 'Backfag',
		images: [
			{
				url: 'https://backfag.vercel.app/logo.png',
				width: 1920,
				height: 1080,
				alt: 'Backfag',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Backfag',
		description: 'Backfag made by b0r9f3d9',
		images: ['https://backfag.vercel.app/logo.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<meta name="apple-mobile-web-app-title" content="Backfag" />
			<body className={montserrat.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex flex-col min-h-screen justify-between gap-8">
						<Header />
						{children}
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
