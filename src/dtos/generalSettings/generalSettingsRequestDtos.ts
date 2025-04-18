declare global {
	type GeneralSettingsUpdateRequestDto = {
		applicationName: string;
		applicationShortName: string;
		underMaintainance: boolean;
	};
}

export { };