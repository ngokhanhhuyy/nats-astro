import { z } from "astroschema";

const signInSchema = z.object({
  userName: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

console.log(JSON.stringify(signInSchema.parse({  })));

