import type { PageType } from "@akasha/pages/page-type"

export const temperEsoCompanion = {
  id: "01a05fcf-2466-7bcb-9ec1-3f0fd467d879",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-eso-companion",
  definition: "a companion The Elder Scrolls Online itself names",
  pluralSlug: "temper-eso-companions",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "number-property/eso-companion-id",
    "page-property-entry/passive-effects",
    "text-property/alliance",
    "text-property/class-passive-id",
    "text-property/subtitle",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/subtitle", required: false, many: false },
    { pageProperty: "text-property/alliance", required: true, many: false },
    { pageProperty: "number-property/eso-companion-id", required: true, many: false },
    { pageProperty: "text-property/class-passive-id", required: false, many: false },
    { pageProperty: "page-property-entry/passive-effects", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
