import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperJewelryType = TemperGearThing

export const temperJewelryType = {
  id: "01a05fd1-d433-7778-b5e5-05081a435bde",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-type",
  definition: "a kind of jewelry piece",
  pluralSlug: "temper-jewelry-types",
  extendsSlug: "page-type/temper-gear-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "valid-slots", required: true, many: true, max: null },
  ],
} as const satisfies PageType
