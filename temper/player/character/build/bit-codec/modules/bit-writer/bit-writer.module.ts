import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bitWriter = {
  id: "01a060af-2560-7182-8953-f9402a4521e1",
  type: "page-type/module",
  slug: "bit-writer",
  definition: "packing numbers into a byte array a chosen number of bits at a time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value wider than the bits asked for is masked down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bits go in from the most significant end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part-filled last byte is padded on the right at the close.",
    },
  ],
} as const satisfies Module
