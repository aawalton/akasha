import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperArmorEnchant = TemperGearThing

export const temperArmorEnchant = {
  id: "01a05fd1-d42e-7a0a-9e97-561c71aeccd4",
  pageTypeSlug: "page-type",
  slug: "temper-armor-enchant",
  definition: "a glyph put on a piece of armor",
  pluralSlug: "temper-armor-enchants",
  extendsSlug: ["page-type/temper-gear-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "eso-enchant-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
