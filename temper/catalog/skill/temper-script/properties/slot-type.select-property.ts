import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slotType = {
  id: "01a0cb51-43bc-7ff6-9fdc-0477fff8a78d",
  type: "page-type/select-property",
  slug: "slot-type",
  propertySlug: "slot-type",
  definition: "a script's slot in a grimoire",
  values: ["focus-slot", "signature-slot", "affix-slot"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slots are in the order a grimoire takes them.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
