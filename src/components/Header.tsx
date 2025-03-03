'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

const navLinks = [
	{ href: '/checker', label: 'Checker', boldPart: '' },
	{ href: '/piderboard', label: 'Piderboard', boldPart: 'Pider' },
	{ href: '/analytics', label: 'Analytics', boldPart: 'Anal' },
];

export default function Header() {
	const { setTheme } = useTheme();
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="flex items-center justify-between border-b h-16 px-4">
			<Button
				variant="outline"
				size="icon"
				className="sm:hidden"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				{isMobileMenuOpen ? (
					<X className="h-[1.2rem] w-[1.2rem]" />
				) : (
					<Menu className="h-[1.2rem] w-[1.2rem]" />
				)}
				<span className="sr-only">Toggle menu</span>
			</Button>

			<Link href="/" className="flex items-center gap-2 sm:mr-auto">
				<Image src="/backpack.webp" alt="Backpack" width={28} height={28} />
				<h1
					className={twMerge(
						'text-2xl font-medium transition-colors',
						pathname === '/' ? 'text-red-400' : 'hover:text-red-400',
					)}
				>
					<span className="font-medium">Back</span>
					<span className="font-bold">fag</span>
				</h1>
			</Link>

			<nav className="hidden sm:flex gap-4 absolute left-1/2 -translate-x-1/2">
				{navLinks.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className={twMerge(
							'text-lg font-medium transition-colors',
							pathname === link.href ? 'text-red-400' : 'hover:text-red-400',
						)}
					>
						<span className={link.boldPart ? 'font-bold' : ''}>
							{link.boldPart}
						</span>
						<span>{link.label.replace(link.boldPart, '')}</span>
					</Link>
				))}
			</nav>

			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme('light')}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<nav
				className={twMerge(
					'absolute top-16 left-0 right-0 bg-secondary p-4 sm:hidden z-10',
					isMobileMenuOpen
						? 'animate-slide-down block'
						: 'animate-slide-up hidden',
				)}
			>
				<div className="flex items-center justify-between">
					{navLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className={twMerge(
								'text-lg font-medium transition-colors',
								pathname === link.href ? 'text-red-400' : 'hover:text-red-400',
							)}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<span className={link.boldPart ? 'font-bold' : ''}>
								{link.boldPart}
							</span>
							<span>{link.label.replace(link.boldPart, '')}</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
