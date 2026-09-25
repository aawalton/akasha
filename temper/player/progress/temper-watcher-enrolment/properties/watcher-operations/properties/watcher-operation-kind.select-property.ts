import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const watcherOperationKind = {
  id: "01a0d8b3-3ec7-7580-b3db-0c4ca6853405",
  type: "page-type/select-property",
  slug: "watcher-operation-kind",
  propertySlug: "kind",
  definition: "whether a watcher's operation read a game file or wrote one",
  values: ["import", "export"],
  types: "ts",
} as const satisfies SelectProperty
