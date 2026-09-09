import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/temper-catalog-things/temper-catalog-thing.page-type.ts"
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
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-vampire-stage-id"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "number-property/eso-vampire-stage-id", required: true, many: false },
  ],
} as const satisfies PageType
