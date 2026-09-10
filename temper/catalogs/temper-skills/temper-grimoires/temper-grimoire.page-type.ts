import type { PageType } from "@akasha/pages/page-type"

export const temperGrimoire = {
  id: "01a05fca-cb89-7d99-aa9d-e89e410a0f89",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-grimoire",
  definition: "a book a character scribes a skill from",
  pluralSlug: "temper-grimoires",
  extends: ["page-type/temper-scribing-thing"],
  parts: [
    "page-property-entry/affix-scripts",
    "page-property-entry/signature-scripts",
    "text-property/ability-icon",
    "text-property/class-id",
    "text-property/focus-scripts",
    "text-property/script-id",
  ],
  properties: [
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/ability-icon", required: true, many: false },
    { pageProperty: "text-property/skill-line-id", required: true, many: false },
    { pageProperty: "text-property/focus-scripts", required: true, many: true, maxCount: null },
    { pageProperty: "page-property-entry/affix-scripts", required: true, many: false },
    { pageProperty: "page-property-entry/signature-scripts", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
