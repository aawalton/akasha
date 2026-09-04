import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperDungeonChampions = {
  id: "01a060f9-bab9-7763-8ceb-8977b0b205de",
  pageTypeSlug: "workspace-package",
  slug: "temper-dungeon-champions",
  definition: "the group bosses of the public dungeons and delves of Tamriel, drawn on the map",
  manifest: "json",
  partSlugs: [
    "module/dungeon-champion-names",
    "module/dungeon-champion-colors",
    "module/dungeon-champion-labels",
    "module/dungeon-champion-pin-textures",
    "module/dungeon-champion-defaults",
    "module/dungeon-champion-saved-vars",
    "module/dungeon-champion-map-zone",
    "module/dungeon-champion-slash",
    "module/dungeon-champion-achievement-ids",
    "module/dungeon-champion-places-00",
    "module/dungeon-champion-places-01",
    "module/dungeon-champion-places",
    "module/dungeon-champion-lookup",
    "module/dungeon-champion-pins",
    "module/dungeon-champion-pin-register",
    "module/dungeon-champion-settings",
    "module/dungeon-champion-start",
    "module/dungeon-champion-global",
    "type-declaration/dungeon-champion-global-declarations",
    "type-declaration/dungeon-champion-saved-vars-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A champion is found by position rather than by name.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a champion is killed is asked of the game each time a pin is drawn.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "The labels here are English alone.",
    },
  ],
} as const satisfies WorkspacePackage
