import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("membership_role", [
    "owner",
    "admin",
    "member",
  ]);

  pgm.createTable("membership", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },

    workspace_id: {
      type: "uuid",
      notNull: true,
      references: '"workspaces"',
      onDelete: "CASCADE",
    },

    role: {
      type: "membership_role",
      notNull: true,
      default: "member",
    },

    is_deleted: {
      type: "boolean",
      default: false,
    },

    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
    },

    deleted_at: {
      type: "timestamptz",
    },
  });

  pgm.addConstraint(
    "membership",
    "membership_workspace_user_unique",
    {
      unique: ["workspace_id", "user_id"],
    },
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("membership");
  pgm.dropType("membership_role");
}