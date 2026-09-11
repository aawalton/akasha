import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionsApplyBuild = {
  id: "01a0611d-84cf-76fc-9899-547c8ff795c5",
  type: "module",
  slug: "companions-apply-build",
  definition: "equipping and slotting a companion to match a target build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Skills are slotted before gear is equipped.",
    },
  ],
} as const satisfies Module
