import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCatalogDomain = {
  id: "01a05fc4-7a8e-7cdd-859d-6e17f19d2d93",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-catalog-domain",
  definition: "one area of the game a capture mirrors",
  pluralSlug: "temper-catalog-domains",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "boolean-property/dormant",
    "number-property/generator-ran-for-manifest-api-version",
    "number-property/manifest-api-version",
    "text-property/api-version",
    "text-property/generator-ran-for-version",
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
  ],
  types: "ts",
} as const satisfies PageType
