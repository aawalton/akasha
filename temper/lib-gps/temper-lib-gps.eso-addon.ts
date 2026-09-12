import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperLibGps = {
  id: "01a0614d-4767-7eb4-a5d6-68581039bf67",
  type: "eso-addon",
  slug: "temper-lib-gps",
  definition: "one map's coordinates carried onto Tamriel's and onto the world's",

  addonManifest: "json",
  bundleEntry: "gps-main",
  parts: [
    "module/gps-api",
    "module/gps-casts",
    "module/gps-compatibility",
    "module/gps-constants",
    "module/gps-initialization",
    "module/gps-lib-state",
    "module/gps-main",
    "module/gps-map-adapter",
    "module/gps-map-stack",
    "module/gps-measurement",
    "module/gps-public-api",
    "module/gps-tamriel-o-meter",
    "module/gps-types",
    "module/gps-world-size",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every map is measured against Tamriel rather than against its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A map is measured the first time the map is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A measurement taken for a map is kept for as long as the game runs.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own map changing functions are wrapped rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A map outside Tamriel is measured against a root map of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibMapPing loaded first.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibDebugLogger loaded first.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibChatMessage loaded first.",
    },
  ],
} as const satisfies EsoAddon
