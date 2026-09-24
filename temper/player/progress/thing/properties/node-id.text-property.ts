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
      decisionKind: "decision-kind/departure",
      statement: "This name is the node's own rather than a name for another page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node's page is named for that node's kind and this name joined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a node reaches the node's page by this name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Five names a completion tree holds sit on two pages of that tree at once.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
