import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const watcherOperationPath = {
  id: "01a0d8b3-3ec7-7bbc-b547-6fc5e56db622",
  type: "page-type/text-property",
  slug: "watcher-operation-path",
  propertySlug: "path",
  definition: "the game file a watcher's operation read or wrote",
  maxLength: 1000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is the path on the machine the watcher runs on.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
