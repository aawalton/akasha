import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperScript = {
  id: "01a05fca-cb8d-7226-b1b1-e268930470a2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-script",
  definition: "one of the writings a grimoire is filled in with",
  pluralSlug: "temper-scripts",
  extends: ["page-type/temper-scribing-thing"],
  parts: ["text-property/slot-type"],
  properties: [{ pageProperty: "text-property/slot-type", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
