import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibAlchemyStation = {
  id: "01a06054-98ba-7687-a7df-a99c3188320b",
  type: "page-type/eso-addon",
  slug: "temper-lib-alchemy-station",
  definition: "the tabs other addons add to the game's alchemy crafting station",

  addonManifest: "json",
  bundleEntry: "module/alchemy-station-entry",
  parts: [
    "module/alchemy-station",
    "module/alchemy-station-entry",
    "module/alchemy-station-types",
    "type-declaration/alchemy-station-declarations",
    "type-declaration/alchemy-station-entry-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is keyed by the descriptor the caller hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One tab is shown at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Selecting a tab already selected calls no callback.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own alchemy panel is hooked rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reaches every tab through one global name.",
    },
  ],
} as const satisfies EsoAddon
