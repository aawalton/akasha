import type { PageType } from "@akasha/pages/page-type"

export const temperCompanionSkillLine = {
  id: "01a05fce-1854-7d72-872a-0e22ce5c84c5",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-skill-line",
  definition: "a group of companion abilities learned together",
  pluralSlug: "temper-companion-skill-lines",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/companion-id", required: true, many: false },
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
