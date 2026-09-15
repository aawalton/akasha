import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsDecoder = {
  id: "01a0611d-84d3-78d6-9380-f8a2bcde377b",
  type: "page-type/module",
  slug: "companions-decoder",
  definition: "turning a companion build hash back into gear and skill indices",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash of an unknown version reads back as nothing rather than as a guess.",
    },
  ],
} as const satisfies Module
