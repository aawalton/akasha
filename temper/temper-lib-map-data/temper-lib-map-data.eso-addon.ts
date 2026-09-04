import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibMapData = {
  id: "01a061e1-aeb3-7996-87d0-fffa6b5d33b6",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-map-data",
  definition: "which map, zone and floor the player is on, and where that falls on Tamriel",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "map-data-main",
  partSlugs: [
    "module/map-data-constants",
    "module/map-data-types",
    "module/map-data-casts",
    "module/map-data-zones-00",
    "module/map-data-zones-01",
    "module/map-data-zones-02",
    "module/map-data-index-00",
    "module/map-data-index-01",
    "module/map-data-index-02",
    "module/map-data-index-03",
    "module/map-data-index",
    "module/map-data-table",
    "module/map-data-pseudo-indices",
    "module/map-data-lib-state",
    "module/map-data-logger",
    "module/map-data-build-tables",
    "module/map-data-queries",
    "module/map-data-update",
    "module/map-data-events",
    "module/map-data-public-api",
    "module/map-data-main",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the player is is worked out once per map change rather than on every ask.",
    },
    {
      invariantKind: "departure",
      statement: "A map is named by tile texture as well as by id.",
    },
    {
      invariantKind: "departure",
      statement: "The lookups from name back to id are built as the game loads the library.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on hears about a zone change through a callback rather than by asking.",
    },
    {
      invariantKind: "constraint",
      statement: "The zone rows are what upstream LibMapData v1.21 states.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibGPS loaded first.",
    },
  ],
} as const satisfies EsoAddon
