import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const saleGuild = {
  id: "01a0d8a6-8b26-7ab4-8223-c3acf06a0c4d",
  type: "page-type/relation-property",
  slug: "sale-guild",
  propertySlug: "guild",
  definition: "the guild whose store sold an item",
  targetPageType: "page-type/temper-guild",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale names its guild by the guild's address rather than by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The guild a sale names is found or made before the sale is written.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T12:59:48.390Z",
  updatedAt: "2026-09-25T12:59:54.000Z",
} as const satisfies RelationProperty
