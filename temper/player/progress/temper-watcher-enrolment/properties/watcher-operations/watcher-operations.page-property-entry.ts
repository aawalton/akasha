import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const watcherOperations = {
  id: "01a0d8b3-3ec7-7345-843f-eb32a2e346a4",
  type: "page-type/page-property-entry",
  slug: "watcher-operations",
  propertySlug: "operations",
  definition: "what became of each operation a watcher runs, as it last ran",
  parts: [
    "instant-property/watcher-file-modified-at",
    "instant-property/watcher-operation-ran-at",
    "select-property/watcher-operation-kind",
    "select-property/watcher-operation-state",
    "text-property/watcher-operation-detail",
    "text-property/watcher-operation-name",
    "text-property/watcher-operation-path",
  ],
  properties: [
    { pageProperty: "text-property/watcher-operation-name", required: true, many: false },
    { pageProperty: "select-property/watcher-operation-kind", required: true, many: false },
    { pageProperty: "text-property/watcher-operation-path", required: true, many: false },
    { pageProperty: "select-property/watcher-operation-state", required: true, many: false },
    { pageProperty: "instant-property/watcher-operation-ran-at", required: true, many: false },
    { pageProperty: "text-property/watcher-operation-detail", required: false, many: false },
    { pageProperty: "instant-property/watcher-file-modified-at", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation the last run did not reach keeps what its own last run left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Operations sit in the order of their names.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
