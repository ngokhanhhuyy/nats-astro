import dot from "dot-object";

const formDataUtils = {
  formDataToObject(formData: FormData): object {
    const formDataAsObject: Partial<Record<string, FormDataEntryValue>> = {};
    for (const [path, value] of formData.entries()) {
      formDataAsObject[path] = value;
    }

    return dot.object(formDataAsObject);
  }
};

export function useFormDataUtils() {
  return formDataUtils;
}

