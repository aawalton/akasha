import type { Module } from "@akasha/code-system/module"

export const companionsIdMap = {
  id: "01a0611d-84dd-7991-bda4-54827db48eac",
  pageTypeSlug: "module",
  slug: "companions-id-map",
  definition: "which index the build codec gives each companion the game knows",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A companion's index here is the index a saved build hash carries.",
    },
  ],
} as const satisfies Module
