import type { PageType } from "@akasha/pages/page-type"

export const temperPoisonEffect = {
  id: "01a05fd1-d434-7ecc-bbf1-c13d68007b96",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-poison-effect",
  definition: "one effect a reagent lends what it is brewed into",
  pluralSlug: "temper-poison-effects",
  extends: ["page-type/temper-gear-thing"],
  parts: ["boolean-property/is-positive", "number-property/cooldown", "text-property/opposite-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/opposite-id", required: true, many: false },
    { pageProperty: "boolean-property/is-positive", required: false, many: false },
    { pageProperty: "number-property/cooldown", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
