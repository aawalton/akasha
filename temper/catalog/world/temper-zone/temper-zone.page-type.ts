import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperZone = {
  id: "01a05fc4-7a95-7cb3-941e-d82e9f423411",
  type: "page-type/page-type",
  slug: "temper-zone",
  definition: "a region of the game world",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["boolean-property/drops-scripts", "boolean-property/is-dlc"],
  properties: [
    { pageProperty: "boolean-property/drops-scripts", required: true, many: false },
    { pageProperty: "boolean-property/is-dlc", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
