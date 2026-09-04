import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperCaptureDataminingAddon = {
  id: "01a06341-d9e8-7008-91c3-2fcab6b143bf",
  pageTypeSlug: "eso-addon",
  slug: "temper-capture-datamining-addon",
  definition: "the addon taking the game's own item and quest data one id at a time",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "datamining-entry",
  partSlugs: [
    "module/datamining-constants",
    "module/datamining-saved-variables",
    "module/datamining-item-miner",
    "module/datamining-quest-miner",
    "module/datamining-public-api",
    "module/datamining-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game names no way to list its items.",
    },
    {
      invariantKind: "departure",
      statement: "Every item id is tried in turn.",
    },
    {
      invariantKind: "departure",
      statement: "Mining runs in batches so the game stays playable.",
    },
    {
      invariantKind: "departure",
      statement: "What mining takes lands in the saved variables rather than over the wire.",
    },
    {
      invariantKind: "departure",
      statement: "Mining survives a reload of the interface.",
    },
    {
      invariantKind: "constraint",
      statement: "The game writes saved variables only as the client shuts down.",
    },
  ],
} as const satisfies EsoAddon
