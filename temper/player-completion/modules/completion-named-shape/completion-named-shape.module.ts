import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionNamedShape = {
  id: "01a06130-9e3a-7f50-9d58-465202494493",
  type: "module",
  slug: "completion-named-shape",
  definition: "whether a stored completion value is the fuller shape with a name",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The caller states which shape a value with a name is.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A completion record is stored in a fuller shape or in a terser shape.",
    },
  ],
} as const satisfies Module
