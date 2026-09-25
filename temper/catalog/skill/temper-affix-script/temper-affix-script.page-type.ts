import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAffixScript = {
  id: "01a05fca-cb89-788f-9f0a-64f49f04b8a8",
  type: "page-type/page-type",
  slug: "temper-affix-script",
  definition: "the script naming the bonus a scribed skill grants",
  extends: ["page-type/temper-script"],
  types: "ts",
  schema: "jsonl",
  parts: [
    "module/affix-script-pages",
    "one-of-property/granted-buffs",
    "multi-relation-property/applied-debuffs",
  ],
  properties: [
    { pageProperty: "one-of-property/granted-buffs", required: false, many: true, maxCount: null },
    {
      pageProperty: "multi-relation-property/applied-debuffs",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
} as const satisfies PageType
