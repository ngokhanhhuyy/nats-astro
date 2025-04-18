declare global {
	type MemberUpsertRequestDto = {
		fullName: string;
		roleName: string;
		description: string;
		thumbnailFile: string | null;
		thumbnailChanged: boolean;
	};
}

export { };