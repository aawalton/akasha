import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCatalogDomain = {
  id: "01a05fc4-7a8e-7cdd-859d-6e17f19d2d93",
  type: "page-type/page-type",
  slug: "temper-catalog-domain",
  definition: "an area of the game a capture mirrors",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "boolean-property/dormant",
    "number-property/generator-ran-for-manifest-api-version",
    "number-property/manifest-api-version",
    "text-property/api-version",
    "text-property/generator-ran-for-version",
    "file-property/catalog-capture",
    "module/catalog-capture-reading",
  ],
  properties: [
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/api-version", required: true, many: false },
    { pageProperty: "number-property/manifest-api-version", required: true, many: false },
    { pageProperty: "instant-property/captured-at", required: true, many: false },
    { pageProperty: "text-property/generator-ran-for-version", required: true, many: false },
    {
      pageProperty: "number-property/generator-ran-for-manifest-api-version",
      required: true,
      many: false,
    },
    { pageProperty: "boolean-property/dormant", required: false, many: false },
    {
      pageProperty: "file-property/catalog-capture",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:38:27.086Z",
  updatedAt: "2026-10-19T17:42:39.301Z",
} as const satisfies PageType
