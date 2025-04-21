import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "@/utils/jwtUtils";
import { verifyPasswordAsync } from "@/utils/passwordUtils";
import { AuthenticationError, OperationError } from "@/errors";

/**
 * Signs in with the specified username and password using cookies.
 *
 * @remarks When the data in the request is valid and the authentication credentials
 * are correct, the server will generate an encoded cookie which contains the
 * authentication and authorization information of the requesting user and respond back
 * for the following requests.
 *
 * @param requestDto - An object containing the username and password for the
 * authentication operation.
 * @returns A {@link Promise} representing the asynchronous operation, which result is
 * a {@link number} representing authentication token for the user to use in the following
 * requests.
 * @example
 * getAccessCookieAsync({ userName: "yourUserName", password: "yourPassword" });
 *
 * @throws {OperationError} Throws under the following circumstances:
 * - When the user with the specified username doesn't exist or has already been
 * deleted.
 * - When the specified password is incorrect.
 */
async function generateTokenAsync(requestDto: SignInRequestDto): Promise<string> {
  const prisma = new PrismaClient();
  const currentDateTime = new Date();
  const user = await prisma.user.findFirst({
    where: {
      userName: requestDto.userName
    },
    include: {
      permission: true
    }
  });
  console.log((new Date().getTime() - currentDateTime.getTime()))

  if (!user) {
    throw new OperationError({ userName: "User doesn't exist." });
  }

  if (!verifyPasswordAsync(requestDto.password, user.passwordHash)) {
    throw new OperationError({ password: "Password is incorrect." });
  }

  return generateToken({
    id: user.id,
    userName: user.userName,
    canCreateUser: user.permission?.canCreateUser ?? false,
    canResetUserPassword: user.permission?.canResetUserPassword ?? false,
    canDeleteUser: user.permission?.canDeleteUser ?? false
  }, 30 * 24);
};

export { generateTokenAsync };