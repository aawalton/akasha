import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibAlchemyStation = {
  id: "01a06054-98ba-7687-a7df-a99c3188320b",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-alchemy-station",
  definition: "the tabs other addons add to the game's alchemy crafting station",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "alchemy-station-entry",
  partSlugs: [
    "module/alchemy-station",
    "module/alchemy-station-entry",
    "module/alchemy-station-types",
    "type-declaration/alchemy-station-declarations",
    "type-declaration/alchemy-station-entry-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tab is keyed by the descriptor the caller hands in.",
    },
    {
      invariantKind: "departure",
      statement: "One tab is shown at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Selecting a tab already selected calls no callback.",
    },
    {
      invariantKind: "constraint",
      statement: "The game's own alchemy panel is hooked rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "The game reaches every tab through one global name.",
    },
  ],
} as const satisfies EsoAddon
