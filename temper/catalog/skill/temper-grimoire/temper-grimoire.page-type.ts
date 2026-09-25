import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperGrimoire = {
  id: "01a05fca-cb89-7d99-aa9d-e89e410a0f89",
  type: "page-type/page-type",
  slug: "temper-grimoire",
  definition: "a book holding the skill a character scribes",
  extends: ["page-type/temper-scribing-thing"],
  parts: [
    "module/grimoire-affix-rows",
    "page-property-entry/affix-scripts",
    "one-of-property/granted-buffs",
    "multi-relation-property/applied-debuffs",
    "page-property-entry/signature-scripts",
    "text-property/ability-icon",
    "relation-property/class-id",
    "multi-relation-property/focus-scripts",
    "relation-property/script-id",
  ],
  properties: [
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/ability-icon", required: true, many: false },
    {
      pageProperty: "multi-relation-property/focus-scripts",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "page-property-entry/affix-scripts", required: true, many: false },
    { pageProperty: "page-property-entry/signature-scripts", required: true, many: false },
    { pageProperty: "relation-property/skill-line", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
