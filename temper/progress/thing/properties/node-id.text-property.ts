import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const nodeId = {
  id: "01a05fc6-81fc-7831-9ded-1ba2e1d47ca1",
  type: "page-type/text-property",
  slug: "node-id",
  propertySlug: "node-id",
  definition: "the name a node answers to inside its own tree",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a node of the same tree.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
