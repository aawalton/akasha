import type { PageType } from "@akasha/pages/page-type"

export const temperSkillBar = {
  id: "01a05fcd-f558-70b6-8f78-cec3aed405a1",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill-bar",
  definition: "one of the two rows a character slots skills into",
  pluralSlug: "temper-skill-bars",
  extends: ["page-type/temper-character-thing"],
  types: "ts",
} as const satisfies PageType
