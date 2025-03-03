import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center gap-4">
			<div className="flex justify-center gap-4">
				<Button asChild size="lg" variant="secondary">
					<Link
						href="/checker"
						className="text-lg font-medium hover:text-red-300 transition-colors"
					>
						Checker
					</Link>
				</Button>

				<Button asChild size="lg" variant="secondary">
					<Link
						href="/piderboard"
						className="text-lg font-medium hover:text-red-300 transition-colors"
					>
						Piderboard
					</Link>
				</Button>

				<Button asChild size="lg" variant="secondary">
					<Link
						href="/analytics"
						className="text-lg font-medium hover:text-red-300 transition-colors"
					>
						Analytics
					</Link>
				</Button>
			</div>
		</main>
	);
}
