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
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A node's page is named for that node's kind and this name joined, so this name names no page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Five names a completion tree holds sit on two pages of that tree at once.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
