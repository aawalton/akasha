import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { EsoVampireStageId } from "../properties/eso-vampire-stage-id.number-property.ts"

export type TemperVampireStage = TemperCatalogThing & {
  esoVampireStageId: EsoVampireStageId
}

export const temperVampireStage = {
  id: "01a05fc5-94d2-7de5-8850-22656966472e",
  pageTypeSlug: "page-type",
  slug: "temper-vampire-stage",
  definition: "how far a character's vampirism has run",
  pluralSlug: "temper-vampire-stages",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["number-property/eso-vampire-stage-id"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-vampire-stage-id", required: true, many: false },
  ],
} as const satisfies PageType
