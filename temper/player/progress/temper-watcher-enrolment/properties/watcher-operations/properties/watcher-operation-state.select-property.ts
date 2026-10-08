import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const watcherOperationState = {
  id: "01a0d8b3-3ec7-7113-9995-4c6f5ad1cdec",
  type: "page-type/select-property",
  slug: "watcher-operation-state",
  propertySlug: "state",
  definition: "how a watcher's operation ended",
  values: ["synced", "file_not_found", "parse_failed", "upload_failed", "skipped"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation skipped was not tried because an earlier one it needed failed.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T13:13:40.807Z",
  updatedAt: "2026-09-25T13:13:45.000Z",
} as const satisfies SelectProperty
