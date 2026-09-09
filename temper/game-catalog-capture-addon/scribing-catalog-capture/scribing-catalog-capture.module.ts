import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribingCatalogCapture = {
  id: "01a060e2-3185-722d-8f2e-4cfdeb3fc189",
  pageTypeSlug: "module",
  slug: "scribing-catalog-capture",
  definition: "the scribing grimoires and scripts, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Each crafted ability is asked for the scripts of every scribing slot.",
    },
    {
      invariantKind: "departure",
      statement: "A script already read is not read a second time.",
    },
  ],
} as const satisfies Module
