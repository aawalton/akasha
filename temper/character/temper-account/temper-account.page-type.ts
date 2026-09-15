import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAccount = {
  id: "01a05fcd-f547-7f1d-8f1e-1feeb37eebb3",
  type: "page-type/page-type",
  slug: "temper-account",
  definition: "one Elder Scrolls Online account temper keeps track of",
  extends: ["page-type/temper-character-thing"],
  parts: ["text-property/eso-display-name", "text-property/world-name"],
  properties: [
    { pageProperty: "text-property/eso-display-name", required: false, many: false },
    { pageProperty: "text-property/world-name", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
