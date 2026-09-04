import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoAllianceId } from "../properties/eso-alliance-id.number-property.ts"

export type TemperAlliance = TemperCatalogThing & {
  esoAllianceId: EsoAllianceId
}

export const temperAlliance = {
  id: "01a05fc4-7a8c-7403-bf1d-3fe777a61478",
  pageTypeSlug: "page-type",
  slug: "temper-alliance",
  definition: "a faction the players of Tamriel are divided among",
  pluralSlug: "temper-alliances",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["number-property/eso-alliance-id"],
  properties: [{ pagePropertySlug: "eso-alliance-id", required: true, many: false }],
} as const satisfies PageType
