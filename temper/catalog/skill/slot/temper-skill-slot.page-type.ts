import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillSlot = {
  id: "01a05fca-cb8b-79ed-ae49-1fdf5f38602a",
  type: "page-type/page-type",
  slug: "temper-skill-slot",
  definition: "a place on the bar for a skill",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["change-generator/skill-slot-ids-keeping", "data-table/skill-slot-ids"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill slot's hash place is the order a build hash writes a bar's slots in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
