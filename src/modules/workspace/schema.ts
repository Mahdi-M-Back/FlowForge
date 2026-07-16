import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be at most 1000 characters.")
    .optional(),
});

export const updateWorkspaceSchema = workspaceSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
export type WorkspaceDto = z.infer<typeof workspaceSchema>;
