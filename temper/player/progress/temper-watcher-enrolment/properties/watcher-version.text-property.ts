import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const watcherVersion = {
  id: "01a0d8b3-3ec7-7d51-a9b0-5dad14e9d22b",
  type: "page-type/text-property",
  slug: "watcher-version",
  propertySlug: "watcher-version",
  definition: "the build a watcher said it was running when it reported its last run",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A watcher run from source reports `dev`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
