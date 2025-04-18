import type { User, UserPermission } from "@prisma/client";

declare global {
  type UserDetailResponseDto = {
    id: number;
    userName: string;
    canCreateUser: boolean;
    canResetUserPassword: boolean;
    canDeleteUser: boolean;
  };
}

type UserEntity = User & { permission: UserPermission | null };

function createDetail(user: UserEntity): UserDetailResponseDto {
  return {
    id: user.id,
    userName: user.userName,
    canCreateUser: user.permission?.canCreateUser ?? false,
    canResetUserPassword: user.permission?.canResetUserPassword ?? false,
    canDeleteUser: user.permission?.canDeleteUser ?? false
  }
};

export { createDetail as createUserDetailResponseDto };
