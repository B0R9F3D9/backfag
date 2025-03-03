import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Backfag - Checker',
};

export default function CheckerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
