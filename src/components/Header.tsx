'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

export default function Header() {
	const { setTheme } = useTheme();
	const pathname = usePathname();

	return (
		<div className="flex items-center justify-between border-b h-16 p-4">
			<Link href="/" className="flex items-center gap-2">
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

			<nav className="flex gap-4">
				<Link
					href="/checker"
					className={twMerge(
						'text-lg font-medium transition-colors',
						pathname === '/checker' ? 'text-red-400' : 'hover:text-red-400',
					)}
				>
					<span>Checker</span>
				</Link>
				<Link
					href="/piderboard"
					className={twMerge(
						'text-lg font-medium transition-colors',
						pathname === '/piderboard' ? 'text-red-400' : 'hover:text-red-400',
					)}
				>
					<span className="font-bold">Pider</span>
					<span>board</span>
				</Link>
				<Link
					href="/analytics"
					className={twMerge(
						'text-lg font-medium transition-colors',
						pathname === '/analytics' ? 'text-red-400' : 'hover:text-red-400',
					)}
				>
					<span className="font-bold">Anal</span>
					<span>ytics</span>
				</Link>
			</nav>

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
	);
}
