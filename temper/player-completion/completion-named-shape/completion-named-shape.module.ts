import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const completionNamedShape = {
  id: "01a06130-9e3a-7f50-9d58-465202494493",
  pageTypeSlug: "module",
  type: "module",
  slug: "completion-named-shape",
  definition: "whether a stored completion value is the fuller shape with a name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The caller states which shape a value with a name is.",
    },
    {
      invariantKind: "constraint",
      statement: "A completion record is stored in a fuller shape or in a terser shape.",
    },
  ],
} as const satisfies Module
