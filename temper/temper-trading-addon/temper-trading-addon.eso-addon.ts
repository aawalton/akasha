import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperTradingAddon = {
  id: "01a06160-2a58-7de9-8f4a-dbca3806b485",
  pageTypeSlug: "eso-addon",
  slug: "temper-trading-addon",
  definition: "the add-on a player browses guild store listings from and prices a sale by",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "trading-entry",
  bindings: "xml",
  gitIgnore: "gitignore",
  partSlugs: [
    "module/trading-listing-facts",
    "module/trading-search-request-native",
    "module/trading-browse-engine",
    "module/trading-browse-window-rows",
    "module/trading-constants",
    "module/trading-types",
    "module/trading-saved-variables",
    "module/trading-saved-search-store",
    "module/trading-saved-search-bar",
    "module/trading-browse-window",
    "module/trading-capture",
    "module/trading-events",
    "module/trading-globals",
    "module/trading-prune",
    "module/trading-sell-price-store",
    "module/trading-sell-helper",
    "module/trading-skip-kiosk-dialog",
    "module/trading-trader-kiosk-info",
    "module/trading-entry",
    "type-declaration/trading-globals-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A guild store search is run through the game's own search rather than a search of our own.",
    },
    {
      invariantKind: "departure",
      statement: "A captured listing is dropped once the listing has aged past the expiry.",
    },
    {
      invariantKind: "departure",
      statement:
        "A capture replaces the guild's earlier snapshot rather than adding to the snapshot.",
    },
    {
      invariantKind: "departure",
      statement: "A suggested sale price comes from the trade centre where it has one.",
    },
    {
      invariantKind: "departure",
      statement: "A search a player named is kept between sessions.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here buys or lists without the player saying so.",
    },
  ],
} as const satisfies EsoAddon
