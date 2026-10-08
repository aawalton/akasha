import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponBar = {
  id: "01a05fcd-f559-7417-aa6b-791718b82ebc",
  type: "page-type/page-type",
  slug: "temper-weapon-bar",
  definition: "one of a character's two rows of slotted weapons",
  extends: ["page-type/temper-character-thing"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:48:48.345Z",
  updatedAt: "2026-09-22T14:00:30.000Z",
} as const satisfies PageType
