export interface ApiResponse<T> {
	status: number;
	message: string;
	data: T | null;
}

export type PiderboardResponse = ApiResponse<
	{
		userAlias: string;
		volume: string;
	}[]
>;
