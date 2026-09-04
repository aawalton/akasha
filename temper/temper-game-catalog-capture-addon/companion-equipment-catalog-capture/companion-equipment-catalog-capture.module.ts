import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionEquipmentCatalogCapture = {
  id: "01a060e2-3183-79ae-8aa3-7b0eb85b2869",
  pageTypeSlug: "module",
  slug: "companion-equipment-catalog-capture",
  definition:
    "the constants companion gear is described by, written to the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Every value here comes from a game constant rather than from a call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a companion is wearing.",
    },
  ],
} as const satisfies Module
