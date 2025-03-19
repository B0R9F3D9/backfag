import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Backfag - Chart',
};

export default function ChartLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
