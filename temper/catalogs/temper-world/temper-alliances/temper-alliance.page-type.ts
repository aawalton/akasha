import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperAlliance = {
  id: "01a05fc4-7a8c-7403-bf1d-3fe777a61478",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-alliance",
  definition: "a faction the players of Tamriel are divided among",
  pluralSlug: "temper-alliances",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-alliance-id"],
  properties: [{ pageProperty: "number-property/eso-alliance-id", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
