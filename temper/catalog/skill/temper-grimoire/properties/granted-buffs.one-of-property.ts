import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const grantedBuffs = {
  id: "01a0d893-0d21-7323-85a9-1c2a83fc8477",
  type: "page-type/one-of-property",
  slug: "granted-buffs",
  propertySlug: "granted-buffs",
  definition: "the buffs a scribed skill carrying this script grants its caster",
  members: [
    "relation-property/major-buff",
    "relation-property/minor-buff",
    "relation-property/other-buff",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grimoire's affix row names the grade that grimoire's own description gives.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T12:38:30.945Z",
  updatedAt: "2026-09-25T13:56:06.000Z",
} as const satisfies OneOfProperty
