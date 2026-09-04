import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperDungeons = {
  id: "01a06031-70e4-7e81-a058-c2574ec503a7",
  pageTypeSlug: "workspace-package",
  slug: "temper-dungeons",
  definition: "the group dungeons of Tamriel and the pledges quest givers hand out each day",
  manifest: "json",
  partSlugs: [
    "module/dungeon-registry",
    "module/solo-difficulty",
    "module/pledge-rotation",
    "module/dungeon-data",
    "module/eso-reset",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dungeon is reached by its short key rather than by its name.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "Which dungeons and quest givers a reckoning covers is handed in by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The dungeon data here is written out from the dungeon pages.",
    },
  ],
} as const satisfies WorkspacePackage
