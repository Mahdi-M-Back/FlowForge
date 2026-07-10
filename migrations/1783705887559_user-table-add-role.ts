import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("user_role", ["user", "admin", "owner"]);

  pgm.addColumns("users", {
    role: {
      type: "user_role",
      notNull: true,
      default: "user",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn("users", "role");
}