import type { Module } from "@akasha/code-system/module"

export const companionsTargetBuildInput = {
  id: "01a0611d-84e6-77f3-8e05-8b4ff7570c86",
  pageTypeSlug: "module",
  slug: "companions-target-build-input",
  definition: "reading and writing the build hash a player is aiming a companion at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target build is kept per companion.",
    },
  ],
} as const satisfies Module
