import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { AltName } from "../properties/alt-name.text-property.ts"
import type { EsoRaceId } from "../properties/eso-race-id.number-property.ts"

export type TemperRace = TemperCatalogThing & {
  altName?: AltName
  esoRaceId: EsoRaceId
}

export const temperRace = {
  id: "01a05fc4-7a95-7a17-b702-bdb4627956d0",
  pageTypeSlug: "page-type",
  slug: "temper-race",
  definition: "a people a character is born into",
  pluralSlug: "temper-races",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["number-property/eso-race-id", "text-property/alt-name"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "alt-name", required: false, many: false },
    { pagePropertySlug: "eso-race-id", required: true, many: false },
  ],
} as const satisfies PageType
