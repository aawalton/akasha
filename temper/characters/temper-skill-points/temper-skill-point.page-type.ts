import type { PageType } from "@akasha/pages/page-type"

export const temperSkillPoint = {
  id: "01a05fcd-f559-75c5-bd78-0041c552d484",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill-point",
  definition: "one source a character earns skill points from",
  pluralSlug: "temper-skill-points",
  extends: ["page-type/temper-character-thing"],
  parts: [
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
  ],
  types: "ts",
} as const satisfies PageType
