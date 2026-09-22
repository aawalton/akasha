import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillPoint = {
  id: "01a05fcd-f559-75c5-bd78-0041c552d484",
  type: "page-type/page-type",
  slug: "temper-skill-point",
  definition: "a source of a character's skill points",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "boolean-property/pvp",
    "number-property/max-quests",
    "number-property/max-skyshards",
    "number-property/max-value",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "number-property/max-quests", required: false, many: false },
    { pageProperty: "number-property/max-skyshards", required: false, many: false },
    { pageProperty: "number-property/max-value", required: false, many: false },
    { pageProperty: "boolean-property/pvp", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
