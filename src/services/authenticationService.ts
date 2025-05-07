import { PrismaClient } from "@prisma/client";
import { verifyPasswordAsync } from "@/utils/passwordUtils";
import { OperationError } from "@/errors";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

type Payload = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  aud: string;
  user: UserDetailResponseDto
};

const secretKey = import.meta.env.SECRET_KEY as Secret;

const service = {
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
  async generateTokenAsync(requestDto: SignInRequestDto): Promise<string> {
    // Fetch the entity from the database.
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        userName: requestDto.userName
      },
      include: {
        permission: true
      }
    });
  
    // Ensure the user exists.
    if (!user) {
      throw new OperationError({ userName: "User doesn't exist." });
    }
  
    // Ensure the user's password is correct
    if (!verifyPasswordAsync(requestDto.password, user.passwordHash)) {
      throw new OperationError({ password: "Password is incorrect." });
    }
    
    // Generate the token.
    const currentSeconds = new Date().getTime() / 1000;
    const payload: Payload = {
      iss: "nats",
      sub: user.id.toString(),
      exp: currentSeconds + (30 * 24) * 60 * 60 * 7,
      iat: currentSeconds,
      aud: `${user.userName}#${user.id}`,
      user: {
        id: user.id,
        userName: user.userName,
        canCreateUser: user.permission?.canCreateUser ?? false,
        canResetUserPassword: user.permission?.canResetUserPassword ?? false,
        canDeleteUser: user.permission?.canDeleteUser ?? false
      }
    };
  
    return jwt.sign(payload, secretKey);
  },

  /**
   * Verifies if the given token is valid and extracts the user data from the token.
   * 
   * @param token The token retrieved from the client's request cookie.
   * @returns A DTO containing the data of the user extracted from the token.
   */
  verifyToken(token: string): UserDetailResponseDto {
    const payload = jwt.verify(token, secretKey) as Payload;
    return payload.user;
  }
}

export function useAuthenticationService() {
  return service;
};