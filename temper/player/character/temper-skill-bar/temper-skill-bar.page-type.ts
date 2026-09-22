import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSkillBar = {
  id: "01a05fcd-f558-70b6-8f78-cec3aed405a1",
  type: "page-type/page-type",
  slug: "temper-skill-bar",
  definition: "one of a character's two rows of slotted skills",
  extends: ["page-type/temper-character-thing"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
