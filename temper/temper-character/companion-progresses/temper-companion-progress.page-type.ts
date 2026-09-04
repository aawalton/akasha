import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"

export type TemperCompanionProgress = TemperCharacterThing

export const temperCompanionProgress = {
  id: "01a05fcd-f54b-7497-b549-b7f8ef55b323",
  pageTypeSlug: "page-type",
  slug: "temper-companion-progress",
  definition: "how far a companion has come with one account",
  pluralSlug: "temper-companion-progresses",
  extendsSlug: "page-type/temper-character-thing",
  properties: [
    { pagePropertySlug: "companion-id", required: true, many: false },
    { pagePropertySlug: "account-page", required: true, many: false },
  ],
} as const satisfies PageType
