import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const boonAtTooltip = {
  id: "01a15673-4221-746e-b102-7720fd634f39",
  type: "page-type/boolean-property",
  slug: "boon-at-tooltip",
  propertySlug: "boon-at-tooltip",
  definition: "whether a mundus stone under Divines applies the number its boon tooltip shows",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stone stating no boon at tooltip applies its boon worked out exactly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stone stating true applies the tooltip's number, which can be a little lower.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-19T23:15:56.576Z",
  updatedAt: "2026-10-19T23:15:56.576Z",
} as const satisfies BooleanProperty
