import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperItemBrowserSource = {
  id: "01a0d9dc-c559-7c66-9c85-d9eef5ed493b",
  type: "page-type/page-type",
  slug: "temper-item-browser-source",
  definition: "a source the item browser names a set as dropping from that is no zone",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/item-browser-source-id"],
  properties: [
    { pageProperty: "number-property/item-browser-place-kind", required: true, many: false },
    { pageProperty: "number-property/item-browser-source-id", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
