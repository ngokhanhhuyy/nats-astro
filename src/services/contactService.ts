import { Prisma, PrismaClient, type ContactType as PrismaContactType } from "@prisma/client";
import { ContactType } from "@/enums/contactType";
import { createContactResponseDto } from "@/dtos/contact/contactResponseDtos";
import { usePrismaClientErrorHandler, NotFoundError } from "@/errors";

const prismaClientErrorHandler = usePrismaClientErrorHandler();

const service = {
  /**
   * Gets a list of all contacts.
   * 
   * @returns A {@link Promise} representing the asynchonous operation, which result is an
   * array of DTOs, containing the information of the contacts.
   */
  async getListAsync(): Promise<ContactResponseDto[]> {
    const prisma = new PrismaClient();
    const contacts = await prisma.contact.findMany();
    return contacts.map(createContactResponseDto);
  },

  /**
   * Gets a single existing contact, specified by its id.
   * 
   * @param id The id of the contact to retrieve.
   * @returns A {@link Promise} representing the asynchronous operation, which result is a DTO
   * containing the information of the contact.
   * 
   * @throws {NotFoundError} Throws when the contact, specified by {@link id}, doesn't exist.
   */
  async getSingleAsync(id: number): Promise<ContactResponseDto> {
    const prisma = new PrismaClient();
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundError();
    }

    return createContactResponseDto(contact);
  },

  /**
   * Creates a new contact.
   * 
   * @param requestDto A DTO containing the data for the creating operation.
   * @returns A {@link Promise} representing the asynchronous operation, which result is the id
   * of the created contact.
   */
  async createAsync(requestDto: ContactUpsertRequestDto): Promise<number> {
    const prisma = new PrismaClient();
    const keys = Object.keys(ContactType);
    const index = Object.values(ContactType).indexOf(requestDto.type);
    const type = keys[index] as PrismaContactType;
    const contact = await prisma.contact.create({
      data: {
        type,
        content: requestDto.content
      }
    });

    return contact.id;
  },

  /**
   * Updates an existing contact, specified by its id.
   * 
   * @param id The id of the contact to update.
   * @param requestDto A DTO containing the data for the updating operation.
   * @returns A {@link Promise} representing the asynchronous operation.
   * 
   * @throws {NotFoundError} Throws when the contact, specified by {@link id}, doesn't exist.
   */
  async updateAsync(id: number, requestDto: ContactUpsertRequestDto): Promise<void> {
    const prisma = new PrismaClient();
    const keys = Object.keys(ContactType);
    const index = Object.values(ContactType).indexOf(requestDto.type);
    const type = keys[index] as PrismaContactType;
    try {
      await prisma.contact.update({
        where: { id },
        data: {
          type,
          content: requestDto.content
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
   * Deletes an existing contact.
   * 
   * @param id The id of the contact to delete.
   * @returns A {@link Promise} representing the asynchronous operation.
   * 
   * @throws {NotFoundError} Throws when the contact, specified by {@link id}, doesn't exist.
   */
  async deleteAsync(id: number): Promise<void> {
    const prisma = new PrismaClient();
    try {
      await prisma.contact.delete({
        where: { id }
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
  }
}

export function useContactService() {
  return service;
}