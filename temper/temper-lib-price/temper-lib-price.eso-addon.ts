import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibPrice = {
  id: "01a0615d-c21d-7961-8564-2c0c9e040e08",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-price",
  definition: "what an item is worth, gathered from every trading add-on the player has",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "price-main",
  partSlugs: [
    "module/price-types",
    "module/price-constants",
    "module/price-casts",
    "module/price-lua-truthy",
    "module/price-log",
    "module/price-state",
    "module/price-cache",
    "module/price-sources-mm",
    "module/price-sources-att",
    "module/price-sources-ttc",
    "module/price-sources-crown",
    "module/price-sources-rolis",
    "module/price-sources-npc",
    "module/price-sources-furc",
    "module/price-dispatch",
    "module/price-api",
    "module/price-public-api",
    "module/price-main",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every source is asked unless the caller names the sources to ask.",
    },
    {
      invariantKind: "departure",
      statement: "A source the player has not installed answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A price read from a source is held for five minutes.",
    },
    {
      invariantKind: "departure",
      statement: "A price from Master Merchant is read again on every ask.",
    },
    {
      invariantKind: "departure",
      statement: "A price from any source is turned into the one shape this library answers in.",
    },
    {
      invariantKind: "departure",
      statement: "Another add-on reaches this library through a name in the global table.",
    },
    {
      invariantKind: "constraint",
      statement: "This library depends on no other add-on.",
    },
  ],
} as const satisfies EsoAddon
