import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const buildQuickslots = {
  id: "01a19946-cb81-7b50-b2ca-bf77abcdcde8",
  type: "page-type/record-property",
  slug: "build-quickslots",
  propertySlug: "quickslots",
  definition: "what a build holds on the game's quickslot wheel, slot by slot",
  properties: [
    { pageProperty: "number-property/quickslot-slot", required: true, many: false },
    { pageProperty: "select-property/quickslot-kind", required: true, many: false },
    { pageProperty: "number-property/quickslot-id", required: true, many: false },
    { pageProperty: "text-property/quickslot-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot left empty on the wheel is no entry.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T22:41:56.096Z",
  updatedAt: "2026-11-01T22:41:56.096Z",
} as const satisfies RecordProperty
