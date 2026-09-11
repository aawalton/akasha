import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const completionItemPath = {
  id: "01a05fc6-81fb-729c-8013-4df821b1c2d7",
  type: "text-property",
  slug: "completion-item-path",
  propertySlug: "completion-item-path",
  definition: "one step of the way down a completion card to the item counted",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is read in the order the page states each step.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
