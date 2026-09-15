import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingCatalogCapture = {
  id: "01a060e2-3185-722d-8f2e-4cfdeb3fc189",
  type: "module",
  slug: "scribing-catalog-capture",
  definition: "the scribing grimoires and scripts, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each crafted ability is asked for the scripts of every scribing slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script already read is not read a second time.",
    },
  ],
} as const satisfies Module
