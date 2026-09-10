import type { PageType } from "@akasha/pages/page-type"

export const temperDebuffMinor = {
  id: "01a05fc5-94cf-7f43-9797-17fbafcb401e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-debuff-minor",
  definition: "a harmful effect the game names Minor",
  pluralSlug: "temper-debuff-minors",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
