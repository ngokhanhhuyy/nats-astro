import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  signIn: defineAction({
    accept: "form",
    input: z.object({
      userName: z.string({ required_error: "Username is required" }),
      password: z.string({ required_error: "Password is required" }),
    }),
    handler: async ({ userName, password }) => {
      console.log("Received");
      if (userName != "ngokhanhhuyy") {
        throw new Error("Account doesn't exist");
      }

      if (password != "Huyy47b1") {
        throw new Error("Password is incorrect");
      }
    },
  }),
};
