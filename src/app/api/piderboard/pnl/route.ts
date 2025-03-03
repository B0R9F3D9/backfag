import axios, { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { IPiderboard } from '@/types/piderboard';

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;

	try {
		const resp = await axios.get<IPiderboard>(
			'https://api.backpack.exchange/wapi/v1/statistics/pnl',
			{
				params,
				headers: {
					Referer: 'https://backpack.exchange/',
				},
			},
		);

		if (resp.status !== 200)
			throw new Error(resp.statusText || 'Something went wrong');

		return NextResponse.json({ status: 200, data: resp.data, message: '' });
	} catch (error) {
		if (error instanceof AxiosError) {
			const status = error.response?.status;
			const message = error.response?.data?.message || error.message;
			return NextResponse.json({ status, message });
		}
		return NextResponse.json({
			status: 500,
			message: (error as Error).message,
		});
	}
}
