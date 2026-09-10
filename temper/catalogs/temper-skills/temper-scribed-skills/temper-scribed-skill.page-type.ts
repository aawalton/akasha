import type { PageType } from "@akasha/pages/page-type"

export const temperScribedSkill = {
  id: "01a05fca-cb8a-72ce-84c1-1585368027e5",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-scribed-skill",
  definition: "a skill written out of a grimoire and its scripts",
  pluralSlug: "temper-scribed-skills",
  extends: ["page-type/temper-skill"],
  parts: ["text-property/focus-script-id", "text-property/grimoire-id"],
  properties: [
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/focus-script-id", required: true, many: false },
    { pageProperty: "text-property/grimoire-id", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
