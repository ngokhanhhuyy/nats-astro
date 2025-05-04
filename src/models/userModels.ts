declare global {
  type UserDetailModel = {
    id: number;
    userName: string;
  };
}

function createUserDetailModel(responseDto: UserDetailResponseDto): UserDetailModel {
  return {
    id: responseDto.id,
    userName: responseDto.userName
  };
}

export { createUserDetailModel };
