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

function generateToken(responseDto: UserDetailResponseDto, expiresInHours: number): string {
  const currentSeconds = new Date().getTime() / 1000;
  const payload: Payload = {
    iss: "nats",
    sub: responseDto.id.toString(),
    exp: currentSeconds + expiresInHours * 60 * 60,
    iat: currentSeconds,
    aud: `${responseDto.userName}#${responseDto.id}`,
    user: responseDto
  };

  return jwt.sign(payload, secretKey, { expiresIn: expiresInHours * 60 * 60 * 1000 });
}

function verifyToken(token: string): Payload {
  return jwt.verify(token, secretKey) as Payload;
}

export { generateToken, verifyToken };