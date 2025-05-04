declare global {
  type GeneralSettingsDetailModel = {
    applicationName: string,
    applicationShortName: string,
    underMaintainance: boolean,
  };
}

function createDetail(responseDto: GeneralSettingsResponseDto): GeneralSettingsDetailModel {
  return {
    applicationName: responseDto.applicationName,
    applicationShortName: responseDto.applicationShortName,
    underMaintainance: responseDto.underMaintainance
  };
}

export { createDetail as createGeneralSettingsDetailModel };