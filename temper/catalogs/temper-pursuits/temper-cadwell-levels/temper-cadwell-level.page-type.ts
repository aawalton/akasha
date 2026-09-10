import type { PageType } from "@akasha/pages/page-type"

export const temperCadwellLevel = {
  id: "01a0616b-2cde-7001-a076-c5cb204d81f9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-cadwell-level",
  definition: "one tier of Cadwell's Almanac a player works through",
  pluralSlug: "temper-cadwell-levels",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/stop-index",
    "number-property/zone-index",
    "page-property-entry/cadwell-stops",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/cadwell-stops", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level's display order is the tier number Cadwell gives the level.",
    },
  ],
  types: "ts",
} as const satisfies PageType
