import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const guildName = {
  id: "01a0685d-89aa-7d2f-948c-fbca509592a2",
  type: "page-type/text-property",
  slug: "guild-name",
  propertySlug: "guild-name",
  definition: "the guild whose store sold an item",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a guild." },
  ],
  types: "ts",
} as const satisfies TextProperty
