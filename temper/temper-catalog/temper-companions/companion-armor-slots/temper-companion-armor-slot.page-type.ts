import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionArmorSlot = TemperCompanionThing

export const temperCompanionArmorSlot = {
  id: "01a05fcd-aece-70c8-8784-e3afaec07950",
  pageTypeSlug: "page-type",
  slug: "temper-companion-armor-slot",
  definition: "a place a companion wears one piece of armor",
  pluralSlug: "temper-companion-armor-slots",
  extendsSlug: ["page-type/temper-companion-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "equip-type", required: true, many: false },
  ],
} as const satisfies PageType
