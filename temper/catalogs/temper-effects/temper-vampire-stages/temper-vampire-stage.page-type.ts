import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperVampireStage = {
  id: "01a05fc5-94d2-7de5-8850-22656966472e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-vampire-stage",
  definition: "how far a character's vampirism has run",
  pluralSlug: "temper-vampire-stages",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-vampire-stage-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "number-property/eso-vampire-stage-id", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
