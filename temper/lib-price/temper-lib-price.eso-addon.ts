import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibPrice = {
  id: "01a0615d-c21d-7961-8564-2c0c9e040e08",
  type: "eso-addon",
  slug: "temper-lib-price",
  definition: "what an item is worth, gathered from every trading add-on the player has",

  addonManifest: "json",
  bundleEntry: "module/price-main",
  parts: [
    "module/price-api",
    "module/price-cache",
    "module/price-casts",
    "module/price-constants",
    "module/price-dispatch",
    "module/price-log",
    "module/price-lua-truthy",
    "module/price-main",
    "module/price-public-api",
    "module/price-sources-att",
    "module/price-sources-crown",
    "module/price-sources-furc",
    "module/price-sources-mm",
    "module/price-sources-npc",
    "module/price-sources-rolis",
    "module/price-sources-ttc",
    "module/price-state",
    "module/price-types",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every source is asked unless the caller names the sources to ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source the player has not installed answers nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A price read from a source is held for five minutes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A price from Master Merchant is read again on every ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A price from any source is turned into the one shape this library answers in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another add-on reaches this library through a name in the global table.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This library depends on no other add-on.",
    },
  ],
} as const satisfies EsoAddon
