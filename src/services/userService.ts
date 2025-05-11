import type { PrismaClient } from "@prisma/client";
import { createUserDetailResponseDto } from "@/dtos/user/userResponseDtos";
import { NotFoundError } from "@/errors";

export function useUserService(prisma: PrismaClient) {
  return {
    /**
     * Retrieves the details of a specific user, specified by the id of the user.
     *
     * @param id The id of the target user.
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * object containing the details of the target user.
     * @example getDetailAsync(1);
     *
     * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or has
     * already been deleted.
     */
    async getDetailAsync(id: number): Promise<UserDetailResponseDto> {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { permission: true }
      });
    
      if (!user) {
        throw new NotFoundError();
      };
    
      return createUserDetailResponseDto(user);
    }
  };
}

export type UserService = ReturnType<typeof useUserService>;