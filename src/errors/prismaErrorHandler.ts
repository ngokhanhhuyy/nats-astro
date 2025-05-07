import { Prisma } from "@prisma/client";

type PrismaClientErrorHandledResult = {
  violatedField: string | null;
  violatedEntity: string | null;
  isNotFoundError: boolean;
  isUniqueConstraintError: boolean;
  isNotNullConstraintError: boolean;
}

export function usePrismaClientErrorHandler() {
  return {
    handle(error: Prisma.PrismaClientKnownRequestError): PrismaClientErrorHandledResult {
      const result: PrismaClientErrorHandledResult = {
        violatedField: null,
        violatedEntity: null,
        isNotFoundError: false,
        isUniqueConstraintError: false,
        isNotNullConstraintError: false
      };

      switch (error.code) {
        case "P2002":
          result.isUniqueConstraintError = true;
          result.violatedEntity = error.meta!.modelName as string;
          result.violatedField = (error.meta!.target as string).split("_")[2];
          break;
        case "P2025":
          result.isNotFoundError = true;
          result.violatedEntity = error.meta!.modelname as string;
          break;
      }

      return result;
    }
  };
}