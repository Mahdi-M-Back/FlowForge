import type { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("project_status", ["active", "archived"]);

  pgm.createTable("projects", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    workspace_id: {
      type: "uuid",
      notNull: true,
      references: "workspaces",
      onDelete: "CASCADE",
    },

    name: {
      type: "varchar(100)",
      notNull: true,
    },

    description: {
      type: "text",
      notNull: true,
    },

    status: {
      type: "project_status",
      notNull: true,
      default: "active",
    },

    is_deleted: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
    },

    deleted_at: {
      type: "timestamptz",
    },
  });

  pgm.createIndex("projects", "workspace_id");

  pgm.addConstraint(
    "projects",
    "project_workspace_name_unique",
    "UNIQUE(workspace_id, name)",
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("projects");
  pgm.dropType("project_status");
}
