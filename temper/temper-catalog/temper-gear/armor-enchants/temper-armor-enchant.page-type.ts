import type { PageType } from "@akasha/pages/page-type"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.ts"

export type TemperArmorEnchant = TemperGearThing

export const temperArmorEnchant = {
  id: "01a05fd1-d42e-7a0a-9e97-561c71aeccd4",
  pageTypeSlug: "page-type",
  slug: "temper-armor-enchant",
  definition: "a glyph put on a piece of armor",
  pluralSlug: "temper-armor-enchants",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pagePropertySlug: "text-property/key", required: true, many: false },
    { pagePropertySlug: "number-property/display-order", required: true, many: false },
    { pagePropertySlug: "text-property/eso-enchant-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
