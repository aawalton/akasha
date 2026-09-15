import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperCollectionsAddon = {
  id: "01a0624c-a660-70e0-bf26-d959d1027e91",
  type: "eso-addon",
  slug: "temper-collections-addon",
  definition:
    "the add-on shipping the skyshard, lorebook, treasure, champion and item-set trackers as one",

  addonManifest: "json",
  addonIconsFolder: true,
  bindings: "xml",
  bundleEntry: "module/collections-addon-entry",
  parts: [
    "eso-interface/item-browser-layout",
    "eso-interface/lorebooks-report-layout",
    "eso-interface/lost-treasure-map-layout",
    "module/collections-addon-entry",
    "module/collections-addon-global",
    "module/collections-addon-loaded",
    "module/collections-addon-names",
    "type-declaration/collections-addon-declarations",
  ],
  interfaces: [
    "eso-interface/lorebooks-report-layout",
    "eso-interface/lost-treasure-map-layout",
    "eso-interface/item-browser-layout",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each tracker the add-on ships is a workspace package of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This add-on starts each tracker and knows nothing else about that tracker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tracker publishes its own global rather than a member of this add-on's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The three XML documents load after the Lua bundle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The saved variables of all five trackers are named in the one manifest.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the data a tracker keeps.",
    },
  ],
} as const satisfies EsoAddon
