import type { PageType } from "@akasha/pages/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { CharacterRoles } from "./properties/character-roles.relation-property.ts"
import type { FirstName } from "./properties/first-name.text-property.ts"
import type { LiveBuildId } from "./properties/live-build-id.text-property.ts"

export type TemperAccountCharacter = TemperCharacterThing & {
  firstName?: FirstName
  liveBuildId?: LiveBuildId
  roles?: readonly CharacterRoles[]
}

export const temperAccountCharacter = {
  id: "01a05fcd-f547-75dd-87b1-fce27e98fddd",
  pageTypeSlug: "page-type",
  slug: "temper-account-character",
  definition: "one character on an account",
  pluralSlug: "temper-account-characters",
  extends: ["page-type/temper-character-thing"],
  partSlugs: [
    "relation-property/character-roles",
    "text-property/first-name",
    "text-property/live-build-id",
  ],
  properties: [
    { pagePropertySlug: "text-property/eso-character-id", required: true, many: false },
    { pagePropertySlug: "text-property/account-page", required: true, many: false },
    { pagePropertySlug: "text-property/first-name", required: false, many: false },
    { pagePropertySlug: "text-property/live-build-id", required: false, many: false },
    {
      pagePropertySlug: "relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character is named by the account the character was rolled on.",
    },
  ],
} as const satisfies PageType
