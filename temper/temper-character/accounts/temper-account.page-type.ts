import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { EsoDisplayName } from "./properties/eso-display-name.text-property.ts"
import type { WorldName } from "./properties/world-name.text-property.ts"

export type TemperAccount = TemperCharacterThing & {
  displayName?: EsoDisplayName
  worldName?: WorldName
}

export const temperAccount = {
  id: "01a05fcd-f547-7f1d-8f1e-1feeb37eebb3",
  pageTypeSlug: "page-type",
  slug: "temper-account",
  definition: "one Elder Scrolls Online account temper keeps track of",
  pluralSlug: "temper-accounts",
  extendsSlug: ["page-type/temper-character-thing"],
  partSlugs: ["text-property/eso-display-name", "text-property/world-name"],
  properties: [
    { pagePropertySlug: "eso-display-name", required: false, many: false },
    { pagePropertySlug: "world-name", required: false, many: false },
  ],
} as const satisfies PageType
