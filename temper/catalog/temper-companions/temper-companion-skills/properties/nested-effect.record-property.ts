import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const nestedEffect = {
  id: "01a06196-037c-704b-a0d5-349064c3a709",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "nested-effect",
  propertySlug: "effect",
  definition: "the inner effect a delayed or repeating effect carries",
  properties: [
    { pageProperty: "text-property/skill-effect-type", required: false, many: false },
    { pageProperty: "record-property/effect-target", required: false, many: false },
    { pageProperty: "record-property/effect-formula", required: false, many: false },
    { pageProperty: "record-property/effect-status", required: false, many: false },
    {
      pageProperty: "record-property/effect-conditions",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/damage-type", required: false, many: false },
    { pageProperty: "number-property/duration", required: false, many: false },
    { pageProperty: "record-property/nested-effect", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An inner effect names the same kinds an outer effect names.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
