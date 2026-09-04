import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { CadwellStops } from "./properties/cadwell-stops.page-property-entry.ts"

export type TemperCadwellLevel = TemperPursuitThing & {
  cadwellStops: CadwellStops
}

export const temperCadwellLevel = {
  id: "01a0616b-2cde-7001-a076-c5cb204d81f9",
  pageTypeSlug: "page-type",
  slug: "temper-cadwell-level",
  definition: "one tier of Cadwell's Almanac a player works through",
  pluralSlug: "temper-cadwell-levels",
  extendsSlug: ["page-type/temper-pursuit-thing"],
  partSlugs: [
    "number-property/stop-index",
    "number-property/zone-index",
    "page-property-entry/cadwell-stops",
  ],
  properties: [
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "cadwell-stops", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level's display order is the tier number Cadwell gives the level.",
    },
  ],
} as const satisfies PageType
