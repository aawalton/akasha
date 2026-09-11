import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionRotationState = {
  id: "01a06152-c2d0-7500-91c7-dc74d3b1f9e3",
  type: "module",
  slug: "companion-rotation-state",
  definition: "the starting state a companion rotation is simulated from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill's heal type is cached across calls in a module-level map.",
    },
    {
      invariantKind: "constraint",
      statement: "An ultimate with no stated cost is treated as costing one hundred.",
    },
    {
      invariantKind: "gap",
      statement:
        "Ground-targeted healing counts fully toward self healing and toward ally healing.",
    },
  ],
} as const satisfies Module
