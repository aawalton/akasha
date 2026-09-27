import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillType = {
  id: "01a05fca-cb8c-73c3-984c-28544089d7ee",
  type: "page-type/page-type",
  slug: "temper-skill-type",
  definition: "the sort of use a skill is put to",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill type's slug is its id.",
    },
  ],
  parts: ["change-generator/skill-type-ids-keeping", "data-table/skill-type-ids"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
