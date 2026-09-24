import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const mapPositions = {
  id: "01a0d5d4-6c7f-7827-8e5a-9a56d314ea76",
  type: "page-type/record-property",
  slug: "map-positions",
  propertySlug: "map-positions",
  definition: "the maps a skyshard is shown on and where on each map it sits",
  properties: [
    { pageProperty: "text-property/map-folder", required: true, many: false },
    { pageProperty: "text-property/map-tile", required: true, many: false },
    { pageProperty: "number-property/map-x", required: true, many: false },
    { pageProperty: "number-property/map-y", required: true, many: false },
    { pageProperty: "number-property/place-kinds", required: false, many: true, maxCount: 2 },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A map is named by the folder and the tile of its texture rather than by a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One map may show one skyshard at two places.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
