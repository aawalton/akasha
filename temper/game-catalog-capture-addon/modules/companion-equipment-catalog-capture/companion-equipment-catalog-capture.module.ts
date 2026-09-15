import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentCatalogCapture = {
  id: "01a060e2-3183-79ae-8aa3-7b0eb85b2869",
  type: "module",
  slug: "companion-equipment-catalog-capture",
  definition:
    "the constants companion gear is described by, written to the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value here comes from a game constant rather than from a call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the equipment a companion wears.",
    },
  ],
} as const satisfies Module
