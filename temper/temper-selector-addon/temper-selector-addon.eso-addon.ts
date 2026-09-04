import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperSelectorAddon = {
  id: "01a061ef-c8a5-7acc-81f1-b5b3b65ee46d",
  pageTypeSlug: "eso-addon",
  slug: "temper-selector-addon",
  definition: "the add-on saving which add-ons are on as a pack the player switches between",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "selector-entry",
  partSlugs: [
    "module/selector-constants",
    "module/selector-types",
    "module/selector-strings",
    "module/selector-addon-manager",
    "module/selector-saved-variables",
    "module/selector-packs-core",
    "module/selector-packs",
    "module/selector-keybinds",
    "module/selector-search",
    "module/selector-ui-layout",
    "module/selector-ui-dropdown",
    "module/selector-ui-settings-menu",
    "module/selector-slash-commands",
    "module/selector-events",
    "module/selector-public-api",
    "module/selector-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pack holds the add-ons that were on when the pack was saved.",
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
