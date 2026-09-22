import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponBar = {
  id: "01a05fcd-f559-7417-aa6b-791718b82ebc",
  type: "page-type/page-type",
  slug: "temper-weapon-bar",
  definition: "one of a character's two rows of slotted weapons",
  extends: ["page-type/temper-character-thing"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
