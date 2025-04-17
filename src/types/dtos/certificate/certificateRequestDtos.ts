declare global {
	type CertificateUpsertRequestDto = {
		id: number;
		name: string;
		thumbnailFile: string | null;
		thumbnailChanged: boolean;
	};
}

export { };