export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: "user" | "admin" | "owner",
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
