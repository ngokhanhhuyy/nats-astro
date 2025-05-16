import { z } from "astro:schema";
import { useFormDataUtils } from "@/utils/formDataUtils";
import { ValidationError } from "@/errors";

const formDataUtils = useFormDataUtils();

declare global {
  type SavedSuccessfullyPageModel = {
    saveType: "create" | "update" | "delete",
    returningPageDisplayName: string;
    returningUrl: string;
    get saveTypeDisplayName(): string;
  };
}

const schema = z.object({
  saveType: z.enum(["create", "update", "delete"]),
  returningPageDisplayName: z.string().min(1),
  returningUrl: z.string().min(1)
});

function create(searchParams: URLSearchParams): SavedSuccessfullyPageModel {
  try {
    const searchParamsAsObject = formDataUtils.searchParamsToObject(searchParams);
    const parsedData = schema.parse(searchParamsAsObject);
    return {
      saveType: parsedData.saveType,
      returningPageDisplayName: parsedData.returningPageDisplayName,
      returningUrl: parsedData.returningUrl,
      get saveTypeDisplayName(): string {
        const displayNames = {
          create: "Tạo",
          update: "Chỉnh sửa",
          delete: "Xóa"
        };

        return displayNames[this.saveType];
      }
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error);
    }

    throw error;
  }
}

export { create as createSavedSuccessfullyPageModel };