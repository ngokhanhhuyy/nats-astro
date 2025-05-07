import type { Member } from "@prisma/client";

declare global {
  type MemberDetailResponseDto = {
    id: number;
    fullName: string;
    roleName: string;
    thumbnailUrl: string | null;
    description: string;
  };
}

export function createMemberDetailResponseDto(member: Member): MemberDetailResponseDto {
  return {
    id: member.id,
    fullName: member.fullName,
    roleName: member.roleName,
    thumbnailUrl: member.thumbnailUrl,
    description: member.description
  }
}