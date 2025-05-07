declare global {
  type MemberUpsertRequestDto = {
    fullName: string;
    roleName: string;
    description: string;
    thumbnailUrl: string | null;
  };
}

export { };