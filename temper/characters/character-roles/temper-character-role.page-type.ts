import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.ts"

export type TemperCharacterRole = TemperCharacterThing

export const temperCharacterRole = {
  id: "01a05fcd-f547-7e5d-aa6c-38b9f3d06600",
  pageTypeSlug: "page-type",
  slug: "temper-character-role",
  definition: "the part a character plays in a group",
  pluralSlug: "temper-character-roles",
  extends: ["page-type/temper-character-thing"],
} as const satisfies PageType
