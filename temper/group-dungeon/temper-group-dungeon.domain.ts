import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperGroupDungeon = {
  id: "01a06031-70e4-7e81-a058-c2574ec503a7",
  type: "page-type/domain",
  slug: "temper-group-dungeon",
  definition: "the group dungeons of Tamriel and the pledges quest givers hand out each day",
  parts: [
    "module/dungeon-data",
    "module/dungeon-registry",
    "module/eso-reset",
    "module/pledge-rotation",
    "module/solo-difficulty",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dungeon is reached by its short key rather than by its name.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which dungeons and quest givers a reckoning covers is handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The dungeon data here is written out from the dungeon pages.",
    },
  ],
} as const satisfies Domain
