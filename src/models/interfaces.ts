declare global {
  interface IUpsertableModel {
    parseFromForm(formData: FormData): void;
  }

  interface IHasThumbnailDetailModel {
    thumbnailUrl: string | null;
  }

  interface IHasThumbnailUpsertModel {
    thumbnailUrl: string;
  }
}

export { };