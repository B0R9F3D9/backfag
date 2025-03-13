import { AxiosError } from 'axios';
import { AuthClient } from 'backpack-sdk';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const apiKey = params.get('apiKey');
	const marketType = params.get('marketType');
	const limit = Number(params.get('limit') || 1000);
	const offset = Number(params.get('offset') || 0);

	try {
		if (!apiKey) throw new Error('apiKey is required');
		if (!marketType) throw new Error('marketType is required');
		const client = new AuthClient(apiKey);

		const data = await client.getFillHistory(
			marketType as 'SPOT' | 'PERP',
			limit,
			offset,
		);

		return NextResponse.json({ status: 200, data, message: '' });
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
