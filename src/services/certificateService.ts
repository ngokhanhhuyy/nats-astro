import { Prisma, type PrismaClient } from "@prisma/client";
import { createMemberDetailResponseDto } from "@/dtos/member/memberResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

const prismaClientErrorHandler = usePrismaClientErrorHandler();

export function useCertificateService(prisma: PrismaClient) {
  return {
    /**
     * Gets a list of all members.
     * 
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs, containing the information of the slider items.
     */
    async getListAsync(): Promise<MemberDetailResponseDto[]> {
      const members = await prisma.member.findMany();
      return members.map(member => createMemberDetailResponseDto(member));
    },
    
    /**
     * Gets a single member by its id.
     * 
     * @param id The id of the member to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the information of the member.
     * 
     * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
     */
    async getSingleAsync(id: number): Promise<MemberDetailResponseDto> {
      const member = await prisma.member.findUnique({ where: { id } });
      if (!member) {
        throw new NotFoundError();
      }
  
      return createMemberDetailResponseDto(member);
    },
  
    /**
     * Creates a new member.
     * 
     * @param requestDto A DTO containing the data for the creating operation.
     * @returns A {@link Promise} representing the asynchronous operation, which result is the
     * id of the created member.
     */
    async createAsync(requestDto: MemberUpsertRequestDto): Promise<number> {
      const member = await prisma.member.create({
        data: {
          fullName: requestDto.fullName,
          roleName: requestDto.roleName,
          description: requestDto.description,
          thumbnailUrl: requestDto.thumbnailUrl
        }
      });
  
      return member.id;
    },
  
    /**
     * Updates an existing member, specified by its id.
     * 
     * @param id The id of the member to update.
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
     */
    async updateAsync(id: number, requestDto: MemberUpsertRequestDto): Promise<void> {
      try {
        await prisma.member.update({
          where: { id },
          data: {
            fullName: requestDto.fullName,
            roleName: requestDto.roleName,
            description: requestDto.description,
            thumbnailUrl: requestDto.thumbnailUrl
          }
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const handledResult = prismaClientErrorHandler.handle(error);
          if (handledResult.isNotFoundError) {
            throw new NotFoundError();
          }
        }
  
        throw error;
      }
    },
  
    /**
     * Deletes an existing member, specified by its id.
     * 
     * @param id The id of the member to delete.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the member specified by {@link id} doesn't exist.
     */
    async deleteAsync(id: number): Promise<void> {
      try {
        await prisma.member.delete({ where: { id } });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const handledResult = prismaClientErrorHandler.handle(error);
          if (handledResult.isNotFoundError) {
            throw new NotFoundError();
          }
  
          throw error;
        }
      }
    }
  };
}

export type CertificateService = ReturnType<typeof useCertificateService>;