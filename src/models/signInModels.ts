import { z } from "astro:schema";
import { zfd } from "zod-form-data";

const parser = zfd.formData({
  userName: zfd.text(z.string().min(6).default("")),
  password: zfd.text(z.string().min(6).default(""))
});

const validator = z.object({
  userName: z.string().min(6),
  password: z.string().min(6)
});

export class SignInModel {
  public userName: string = "";
  public password: string = "";

  public toRequestDto(): SignInRequestDto {
    return {
      userName: this.userName,
      password: this.password
    };
  }

  public parse(formData: FormData): void {
    const parsedData = parser.parse(formData);
    this.userName = parsedData.userName;
    this.password = parsedData.password;
  }

  public validate(): void {
    validator.parse(this);
  }
}