import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperSpecialEffectType = {
  id: "01a05fc5-94d0-79b4-82e2-3a1a42663ad8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-special-effect-type",
  definition: "a kind of effect written as an act rather than as a number",
  pluralSlug: "temper-special-effect-types",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
