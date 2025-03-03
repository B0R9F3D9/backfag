import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Backfag - Piderboard',
};

export default function PiderboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
