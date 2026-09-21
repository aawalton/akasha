import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const captureInstant = {
  id: "01a0ba6c-9beb-78b6-ae42-ea76022acdac",
  type: "page-type/module",
  slug: "capture-instant",
  definition: "the instant a moment in a capture names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A moment the game writes counts seconds rather than milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reader of a captured moment says that moment the one way.",
    },
  ],
} as const satisfies Module
