import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCompanionRole = {
  id: "01a05fcd-41a8-7cf6-b803-033e5142d8cf",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-role",
  definition: "a mix of parts one companion plays at once",
  pluralSlug: "temper-companion-roles",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
