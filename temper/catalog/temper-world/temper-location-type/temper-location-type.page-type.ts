import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperLocationType = {
  id: "01a05fc4-7a8f-792b-b559-e6c98c4ec4bb",
  type: "page-type",
  slug: "temper-location-type",
  definition: "a sort of place a character's things are held",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
