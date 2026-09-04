import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EquipType } from "./properties/equip-type.number-property.ts"

export type TemperCompanionThing = TemperCatalogThing & {
  equipType?: EquipType
}

export const temperCompanionThing = {
  id: "01a05fcc-694c-762c-bcd1-1691361636e2",
  pageTypeSlug: "page-type",
  slug: "temper-companion-thing",
  definition: "anything the companion side of the catalog keeps a page for",
  pluralSlug: "temper-companion-things",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["number-property/equip-type"],
  properties: [{ pagePropertySlug: "equip-type", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every place a companion wears a thing is named by one number.",
    },
  ],
} as const satisfies PageType
