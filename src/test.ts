import { createCertificateUpsertModel } from "./models/certificateModels";

const formData = new FormData();
formData.append("name", "Some certificate name");

const model = createCertificateUpsertModel();
model.parseFromForm(formData);