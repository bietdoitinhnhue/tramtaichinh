import { z } from "zod";

export const emailSchema = z.string().trim().email().max(254);

export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const newsletterSubscriptionSchema = z
  .strictObject({
    email: emailSchema,
  })
  .readonly();

export type NewsletterSubscriptionInput = z.infer<typeof newsletterSubscriptionSchema>;
