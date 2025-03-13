import { FaGithub } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

import { Button } from './ui/button';

export default function Footer() {
	return (
		<div className="flex items-center justify-between border-t h-16 p-4">
			<a href="https://github.com/b0r9f3d9" target="_blank">
				<Button className="cursor-pointer" variant="outline" size="icon">
					<FaGithub />
				</Button>
			</a>
			<a
				className="hover:text-rose-400 text-sm"
				href="https://github.com/b0r9f3d9"
				target="_blank"
			>
				Made with ❤️ by b0r9f3d9
			</a>
			<a href="https://twitter.com/b0r9f3d9" target="_blank">
				<Button className="cursor-pointer" variant="outline" size="icon">
					<FaTwitter />
				</Button>
			</a>
		</div>
	);
}
