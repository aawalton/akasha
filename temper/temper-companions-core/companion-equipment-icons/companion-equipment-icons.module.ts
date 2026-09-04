import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionEquipmentIcons = {
  id: "01a06152-c2c7-72a3-af73-86de77280931",
  pageTypeSlug: "module",
  slug: "companion-equipment-icons",
  definition: "icon url lookup for companion armor, jewelry, and weapon equipment",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Jewelry icons ignore quality apart from returning null for no-quality.",
    },
    {
      invariantKind: "constraint",
      statement: "Icon paths follow the companions_u30_equipment naming scheme.",
    },
    {
      invariantKind: "gap",
      statement: "A no-type weapon yields null rather than a placeholder icon.",
    },
  ],
} as const satisfies Module
