import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCompanionTrait = {
  id: "01a05fce-1854-7c89-a767-43b54ae4cefa",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-trait",
  definition: "a property a piece of companion equipment is worked with",
  pluralSlug: "temper-companion-traits",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "boolean-property/is-reduction",
    "text-property/metric-id",
    "text-property/trait-effect-type",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/metric-id", required: false, many: false },
    { pageProperty: "text-property/trait-effect-type", required: false, many: false },
    { pageProperty: "boolean-property/is-reduction", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
