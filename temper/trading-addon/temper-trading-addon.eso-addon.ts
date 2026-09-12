import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperTradingAddon = {
  id: "01a06160-2a58-7de9-8f4a-dbca3806b485",
  type: "eso-addon",
  slug: "temper-trading-addon",
  definition: "the add-on a player browses guild store listings from and prices a sale by",

  addonManifest: "json",
  bundleEntry: "trading-entry",
  bindings: "xml",
  gitIgnore: "gitignore",
  parts: [
    "module/trading-browse-engine",
    "module/trading-browse-window",
    "module/trading-browse-window-rows",
    "module/trading-capture",
    "module/trading-constants",
    "module/trading-entry",
    "module/trading-events",
    "module/trading-globals",
    "module/trading-listing-facts",
    "module/trading-prune",
    "module/trading-saved-search-bar",
    "module/trading-saved-search-store",
    "module/trading-saved-variables",
    "module/trading-search-request-native",
    "module/trading-sell-helper",
    "module/trading-sell-price-store",
    "module/trading-skip-kiosk-dialog",
    "module/trading-trader-kiosk-info",
    "module/trading-types",
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
      statement: "A search a player named is kept between sessions.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here buys or lists without the player saying so.",
    },
  ],
} as const satisfies EsoAddon
