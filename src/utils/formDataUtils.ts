import dot from "dot-object";

const formDataUtils = {
  formDataToObject(formData: FormData): object {
    const formDataAsObject: Partial<Record<string, FormDataEntryValue>> = {};
    for (const [path, value] of formData.entries()) {
      formDataAsObject[path] = value;
    }

    return dot.object(formDataAsObject);
  },

  searchParamsToObject(searchParams: URLSearchParams): object {
    const searchParamsAsObject: Partial<Record<string, string>> = {};
    for (const [path, value] of searchParams.entries()) {
      searchParamsAsObject[path] = value;
    }

    return dot.object(searchParamsAsObject);
  }
};

export function useFormDataUtils() {
  return formDataUtils;
}

