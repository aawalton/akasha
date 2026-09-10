import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionArmorBaseValues = {
  id: "01a06152-c2c3-745e-9ada-68a8820c6c2f",
  pageTypeSlug: "module",
  slug: "companion-armor-base-values",
  definition: "armor value lookup by companion armor weight and equipment quality",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The table is keyed by EquipmentQualityId while the lookup takes CompanionEquipmentQualityId.",
    },
    {
      invariantKind: "constraint",
      statement: "A no-quality or no-weight argument returns zero armor.",
    },
    {
      invariantKind: "constraint",
      statement: "The lookup defaults to legendary quality when no quality is passed.",
    },
  ],
} as const satisfies Module
