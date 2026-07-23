import { z } from "zod";

const publicEnvironmentSchema = z
  .strictObject({
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_WEB_URL: z.string().url(),
  })
  .readonly();

export type PublicEnvironment = z.infer<typeof publicEnvironmentSchema>;

export function parsePublicEnvironment(input: unknown): PublicEnvironment {
  return publicEnvironmentSchema.parse(input);
}

export const canonicalUrls = Object.freeze({
  app: "https://app.tramtaichinh.com",
  moneyManager: "https://quanlydongtien.com",
  web: "https://tramtaichinh.com",
});
