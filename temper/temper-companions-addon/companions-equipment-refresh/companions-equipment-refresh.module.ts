import type { Module } from "@akasha/code-system/module"

export const companionsEquipmentRefresh = {
  id: "01a0611d-84d7-7825-a380-e661d8b35a05",
  pageTypeSlug: "module",
  slug: "companions-equipment-refresh",
  definition: "filling the companion equipment panel from live gear or from a saved build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Live gear is read where the chosen companion is summoned and saved gear otherwise.",
    },
  ],
} as const satisfies Module
