import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const perAbility = {
  id: "01a1570e-d7de-71aa-81c1-bfaace4afa7a",
  type: "page-type/boolean-property",
  slug: "per-ability",
  propertySlug: "per-ability",
  definition: "whether an effect counts once for each ability of its skill line slotted",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating no per-ability counts once for each ability slotted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect stating false counts once if any ability of its skill line is slotted on the active bar.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T02:05:52.989Z",
  updatedAt: "2026-10-20T02:05:52.989Z",
} as const satisfies BooleanProperty
