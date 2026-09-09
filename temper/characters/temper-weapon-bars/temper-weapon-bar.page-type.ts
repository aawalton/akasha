import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.ts"

export type TemperWeaponBar = TemperCharacterThing

export const temperWeaponBar = {
  id: "01a05fcd-f559-7417-aa6b-791718b82ebc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-weapon-bar",
  definition: "one of the two rows a character slots weapons into",
  pluralSlug: "temper-weapon-bars",
  extends: ["page-type/temper-character-thing"],
} as const satisfies PageType
