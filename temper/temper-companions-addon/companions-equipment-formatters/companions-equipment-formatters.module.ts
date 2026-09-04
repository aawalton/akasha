import type { Module } from "@akasha/code-system/module"

export const companionsEquipmentFormatters = {
  id: "01a0611d-84d4-73da-a5b9-80d34d8c2696",
  pageTypeSlug: "module",
  slug: "companions-equipment-formatters",
  definition: "one line of text for a companion's armor, jewelry or weapon slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty slot formats as a dash rather than as blank text.",
    },
  ],
} as const satisfies Module
