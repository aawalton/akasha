import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoCollectibleId } from "./properties/eso-collectible-id.number-property.ts"

export type TemperPursuitThing = TemperCatalogThing & {
  esoCollectibleId?: EsoCollectibleId
}

export const temperPursuitThing = {
  id: "01a06153-0ea9-7002-8317-f34518274d6f",
  pageTypeSlug: "page-type",
  slug: "temper-pursuit-thing",
  definition: "one node of a catalog the game shows a player's progress against",
  pluralSlug: "temper-pursuit-things",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["number-property/eso-collectible-id"],
  properties: [{ pagePropertySlug: "eso-collectible-id", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property more than one pursuit page type carries is declared here.",
    },
  ],
} as const satisfies PageType
