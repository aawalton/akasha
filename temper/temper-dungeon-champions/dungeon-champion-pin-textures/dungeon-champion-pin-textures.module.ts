import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionPinTextures = {
  id: "01a060f9-bacf-7388-b800-ec92c9f44b96",
  pageTypeSlug: "module",
  slug: "dungeon-champion-pin-textures",
  definition: "which icon a champion pin draws, killed or not, in each of the two icon sets",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The two icon sets are numbered to match the saved pin texture type.",
    },
  ],
} as const satisfies Module
