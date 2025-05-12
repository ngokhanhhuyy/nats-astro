import { Prisma, type PrismaClient } from "@prisma/client";
import { createCertificateDetailResponseDto } from "@/dtos/certificate/certificateResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

const prismaClientErrorHandler = usePrismaClientErrorHandler();

export function useCertificateService(prisma: PrismaClient) {
  return {
    /**
     * Gets a list of all certificates.
     * 
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * array of DTOs, containing the information of the certificates.
     */
    async getListAsync(): Promise<CertificateDetailResponseDto[]> {
      const certificates = await prisma.certificate.findMany();
      return certificates.map(member => createCertificateDetailResponseDto(member));
    },
    
    /**
     * Gets a single certificate by its id.
     * 
     * @param id The id of the certificate to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO containing the information of the certificate.
     * 
     * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't
     * exist.
     */
    async getSingleAsync(id: number): Promise<CertificateDetailResponseDto> {
      const certificate = await prisma.certificate.findUnique({ where: { id } });
      if (!certificate) {
        throw new NotFoundError();
      }
  
      return createCertificateDetailResponseDto(certificate);
    },
  
    /**
     * Creates a new certificate.
     * 
     * @param requestDto A DTO containing the data for the creating operation.
     * @returns A {@link Promise} representing the asynchronous operation, which result is the
     * id of the created certificate.
     */
    async createAsync(requestDto: CertificateUpsertRequestDto): Promise<number> {
      const certificate = await prisma.certificate.create({
        data: {
          name: requestDto.name,
          thumbnailUrl: requestDto.thumbnailUrl
        }
      });
  
      return certificate.id;
    },
  
    /**
     * Updates an existing certificate, specified by its id.
     * 
     * @param id The id of the certificate to update.
     * @param requestDto A DTO containing the data for the updating operation.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't
     * exist.
     */
    async updateAsync(id: number, requestDto: CertificateUpsertRequestDto): Promise<void> {
      try {
        await prisma.certificate.update({
          where: { id },
          data: {
            name: requestDto.name,
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
     * Deletes an existing certificate, specified by its id.
     * 
     * @param id The id of the member to delete.
     * @returns A {@link Promise} representing the asynchronous operation.
     * 
     * @throws {NotFoundError} Throws when the certificate specified by {@link id} doesn't
     * exist.
     */
    async deleteAsync(id: number): Promise<void> {
      try {
        await prisma.certificate.delete({ where: { id } });
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