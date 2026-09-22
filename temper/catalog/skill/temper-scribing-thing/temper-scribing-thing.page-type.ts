import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperScribingThing = {
  id: "01a05fca-cb8c-73ea-beae-bd4ddb3a41f3",
  type: "page-type/page-type",
  slug: "temper-scribing-thing",
  definition: "anything that goes into a scribed skill",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/uesp-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "number-property/uesp-id", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
