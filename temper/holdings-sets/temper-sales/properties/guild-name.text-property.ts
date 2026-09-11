import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const guildName = {
  id: "01a0685d-89aa-7d2f-948c-fbca509592a2",
  type: "text-property",
  slug: "guild-name",
  propertySlug: "guild-name",
  definition: "the guild whose store an item went through",
  maxLength: 200,
  nameFormat: null,
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a guild." }],
  types: "ts",
} as const satisfies TextProperty
