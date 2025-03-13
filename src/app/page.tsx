'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';
import { NAVIGATION } from '@/constants/navigation';

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center p-4">
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent leading-tight">
					Welcome to Backfag
				</h1>
				<p className="text-muted-foreground text-lg max-w-md mx-auto">
					Explore our features designed to help you with your work on the{' '}
					<a
						href="https://backpack.exchange/refer/b0r9f3d9"
						className="text-primary hover:text-rose-400 transition-colors duration-200 font-medium"
						target="_blank"
						rel="noopener noreferrer"
					>
						Backpack.exchange
					</a>
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
				{NAVIGATION.map(link => (
					<div
						key={link.href}
						className="relative group bg-card rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
					>
						<Link
							href={link.href}
							className={twMerge(
								'flex flex-col items-center text-center',
								link.disabled && 'pointer-events-none',
							)}
						>
							<h2
								className={twMerge(
									'text-xl font-semibold mb-2 transition-colors',
									link.disabled
										? 'text-muted-foreground'
										: 'group-hover:text-red-400',
								)}
							>
								<span className={link.boldPart ? 'font-bold' : ''}>
									{link.boldPart}
								</span>
								<span>{link.label.replace(link.boldPart, '')}</span>
							</h2>
							<p className="text-sm text-muted-foreground mb-4">
								{link.description}
							</p>
							<Button
								variant={link.disabled ? 'outline' : 'default'}
								className={twMerge(
									'w-full font-semibold transition-colors cursor-pointer',
									link.disabled
										? 'border-gray-300 text-gray-500 bg-gray-100 hover:bg-gray-200'
										: 'bg-red-400 hover:bg-red-500 text-white',
								)}
								disabled={link.disabled}
							>
								{link.disabled ? 'Coming Soon' : 'Explore'}
							</Button>
						</Link>
						{link.disabled && (
							<span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded transform rotate-12 shadow-md">
								Soon
							</span>
						)}
					</div>
				))}
			</div>
		</main>
	);
}
