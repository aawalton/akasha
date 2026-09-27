import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const locationClassify = {
  id: "01a060d9-498c-776f-ae38-08519b2ea266",
  type: "page-type/module",
  slug: "location-classify",
  definition: "which kind of place an inventory location key names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of place is named here by the key its location type page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a kind of place is titled, and the order kinds are shown in, are its page's.",
    },
  ],
} as const satisfies Module
