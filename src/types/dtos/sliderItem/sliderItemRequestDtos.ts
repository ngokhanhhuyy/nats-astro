declare global {
	type SliderItemUpsertRequestDto = {
		title: string | null;
		thumbnailFile: string | null;
		thumbnailChanged: boolean;
	};
}

export { };