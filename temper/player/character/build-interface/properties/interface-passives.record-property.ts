import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const interfacePassives = {
  id: "01a1989e-af96-75e3-a4e8-76393a205216",
  type: "page-type/record-property",
  slug: "interface-passives",
  propertySlug: "interface-passives",
  definition: "the passives a build interface holds one by one, each to a rank",
  properties: [
    { pageProperty: "relation-property/passive-skill", required: true, many: false },
    { pageProperty: "number-property/skill-rank", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive stating no rank is held to its top rank.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T19:38:18.901Z",
  updatedAt: "2026-11-01T19:38:18.901Z",
} as const satisfies RecordProperty
