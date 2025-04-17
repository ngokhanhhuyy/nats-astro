declare global {
	type MemberResponseDto = {
		id: number;
		fullName: string;
		roleName: string;
		description: string;
		thumbnailUrl: string | null;
	};
}

export { };