import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoIconName = {
  id: "01a0df69-bdea-71a7-b1e8-4ff4b211f96b",
  type: "page-type/text-property",
  slug: "eso-icon-name",
  propertySlug: "eso-icon-name",
  definition: "the file name The Elder Scrolls Online gives the art a thing is drawn with",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name is spelled as the game spells the file, with no folder and no extension.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
