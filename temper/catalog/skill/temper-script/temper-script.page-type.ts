import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperScript = {
  id: "01a05fca-cb8d-7226-b1b1-e268930470a2",
  type: "page-type/page-type",
  slug: "temper-script",
  definition: "one of a grimoire's writings",
  extends: ["page-type/temper-scribing-thing"],
  parts: ["select-property/slot-type"],
  properties: [{ pageProperty: "select-property/slot-type", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
