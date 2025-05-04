import type { GeneralSettings } from "@prisma/client";

declare global {
	type GeneralSettingsResponseDto = {
		applicationName: string,
		applicationShortName: string,
		underMaintainance: boolean,
	};
}

function create(entity: GeneralSettings): GeneralSettingsResponseDto {
	return {
		applicationName: entity.applicationName,
		applicationShortName: entity.applicationShortName,
		underMaintainance: entity.isUnderMaintainance
	};
}

export { create as createGeneralSettingsResponseDto };