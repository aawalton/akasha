import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const watcherOperationName = {
  id: "01a0d8b3-3ec7-70dd-bb2e-e7f8ed7e0185",
  type: "page-type/text-property",
  slug: "watcher-operation-name",
  propertySlug: "name",
  definition: "which of its operations a watcher ran",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation is named as the watcher's code names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report holds one operation under each name.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
