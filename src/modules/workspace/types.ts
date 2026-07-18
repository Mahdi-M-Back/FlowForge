export interface User {
  id: string;
  user_id: string;
  workspace_id: string;
  role: "user" | "admin" | "owner";
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
