import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperZone = {
  id: "01a05fc4-7a95-7cb3-941e-d82e9f423411",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-zone",
  definition: "a region of the game world",
  pluralSlug: "temper-zones",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["boolean-property/drops-scripts", "boolean-property/is-dlc"],
  properties: [
    { pageProperty: "boolean-property/drops-scripts", required: true, many: false },
    { pageProperty: "boolean-property/is-dlc", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
