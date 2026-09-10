import type { PageType } from "@akasha/pages/page-type"

export const temperTargetScope = {
  id: "01a05fc5-94d1-7137-9597-c8f6faef3147",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-target-scope",
  definition: "the shape of ground an ability reaches over",
  pluralSlug: "temper-target-scopes",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
