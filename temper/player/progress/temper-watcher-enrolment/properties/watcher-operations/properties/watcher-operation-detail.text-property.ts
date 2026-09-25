import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const watcherOperationDetail = {
  id: "01a0d8b3-3ec6-7c1d-a538-c5f669dc78b9",
  type: "page-type/text-property",
  slug: "watcher-operation-detail",
  propertySlug: "detail",
  definition: "what a watcher said of an operation that did not sync",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A detail longer than this is shortened to fit by the watcher writing it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
