import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeCasts = {
  id: "01a06061-96a1-7301-8024-72c93d42cc87",
  type: "page-type/module",
  slug: "data-encode-casts",
  definition: "what an unknown handed to the encoder or read by the decoder is taken as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
