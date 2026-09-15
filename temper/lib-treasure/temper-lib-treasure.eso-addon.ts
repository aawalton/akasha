import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibTreasure = {
  id: "01a061d5-d0c3-7a12-a5dc-1ab43add5958",
  type: "eso-addon",
  slug: "temper-lib-treasure",
  definition: "where every treasure map, survey report and clue is buried",

  addonManifest: "json",
  bundleEntry: "module/treasure-main",
  parts: [
    "module/treasure-api",
    "module/treasure-book-ids",
    "module/treasure-build-data",
    "module/treasure-casts",
    "module/treasure-constants",
    "module/treasure-icons",
    "module/treasure-lib-state",
    "module/treasure-main",
    "module/treasure-pins-data",
    "module/treasure-pins-data-00",
    "module/treasure-pins-data-01",
    "module/treasure-pins-data-02",
    "module/treasure-pins-data-03",
    "module/treasure-public-api",
    "module/treasure-types",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pin is placed by where the pin falls on its own map rather than on the world.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every lookup is built once as the library loads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon adds an icon to the shared list rather than keeping a separate list.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The pin rows are the rows upstream LibTreasure v24 states.",
    },
  ],
} as const satisfies EsoAddon
