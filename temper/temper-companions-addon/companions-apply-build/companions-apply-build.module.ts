import type { Module } from "@akasha/code-system/module"

export const companionsApplyBuild = {
  id: "01a0611d-84cf-76fc-9899-547c8ff795c5",
  pageTypeSlug: "module",
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
