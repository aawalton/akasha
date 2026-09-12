import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperSelectorAddon = {
  id: "01a061ef-c8a5-7acc-81f1-b5b3b65ee46d",
  type: "eso-addon",
  slug: "temper-selector-addon",
  definition: "the add-on saving which add-ons are on as a pack the player switches between",

  addonManifest: "json",
  bindings: "xml",
  bundleEntry: "selector-entry",
  parts: [
    "module/selector-addon-manager",
    "module/selector-constants",
    "module/selector-entry",
    "module/selector-events",
    "module/selector-keybinds",
    "module/selector-packs",
    "module/selector-packs-core",
    "module/selector-public-api",
    "module/selector-saved-variables",
    "module/selector-search",
    "module/selector-slash-commands",
    "module/selector-strings",
    "module/selector-types",
    "module/selector-ui-dropdown",
    "module/selector-ui-layout",
    "module/selector-ui-settings-menu",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pack has the add-ons that were on when the pack was saved.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on outside the pack being loaded is switched off.",
    },
    {
      invariantKind: "departure",
      statement: "This add-on is never switched off by a pack.",
    },
    {
      invariantKind: "departure",
      statement: "The game acts on a switched add-on only once the interface reloads.",
    },
  ],
} as const satisfies EsoAddon
