import type { PageType } from "@akasha/pages-system/page-type"
import type { Alliance } from "../temper-companion-things/properties/alliance.text-property.ts"
import type { ClassPassiveId } from "../temper-companion-things/properties/class-passive-id.text-property.ts"
import type { EsoCompanionId } from "../temper-companion-things/properties/eso-companion-id.number-property.ts"
import type { PassiveEffects } from "../temper-companion-things/properties/passive-effects.page-property-entry.ts"
import type { Subtitle } from "../temper-companion-things/properties/subtitle.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperEsoCompanion = TemperCompanionThing & {
  subtitle?: Subtitle
  alliance: Alliance
  esoCompanionId: EsoCompanionId
  classPassiveId?: ClassPassiveId
  passiveEffects?: PassiveEffects
}

export const temperEsoCompanion = {
  id: "01a05fcf-2466-7bcb-9ec1-3f0fd467d879",
  pageTypeSlug: "page-type",
  slug: "temper-eso-companion",
  definition: "a companion The Elder Scrolls Online itself names",
  pluralSlug: "temper-eso-companions",
  extendsSlug: ["page-type/temper-companion-thing"],
  partSlugs: [
    "number-property/eso-companion-id",
    "page-property-entry/passive-effects",
    "text-property/alliance",
    "text-property/class-passive-id",
    "text-property/subtitle",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "subtitle", required: false, many: false },
    { pagePropertySlug: "alliance", required: true, many: false },
    { pagePropertySlug: "eso-companion-id", required: true, many: false },
    { pagePropertySlug: "class-passive-id", required: false, many: false },
    { pagePropertySlug: "passive-effects", required: false, many: false },
  ],
} as const satisfies PageType
