import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibAddonKeybinds = {
  id: "01a0605a-0518-757d-8157-8586eaf48429",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-addon-keybinds",
  definition: "the split of the game's keybindings menu into standard keybinds and addon keybinds",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "addon-keybinds-entry",
  partSlugs: [
    "module/addon-keybinds-bootstrap",
    "module/addon-keybinds-load",
    "module/addon-keybinds-menu-entry",
    "module/addon-keybinds-list-hooks",
    "module/addon-keybinds-casts",
    "module/addon-keybinds-names",
    "module/addon-keybinds-strings",
    "module/addon-keybinds-types",
    "type-declaration/addon-keybinds-declarations",
    "module/addon-keybinds-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A keybind whose string id is below the game's last string id is a standard keybind.",
    },
    {
      invariantKind: "departure",
      statement: "Every other keybind is an addon keybind.",
    },
    {
      invariantKind: "departure",
      statement: "The standard menu entry and the addon menu entry keep separate scroll positions.",
    },
    {
      invariantKind: "departure",
      statement: "A header is shown only where a row beneath that header is shown.",
    },
    {
      invariantKind: "departure",
      statement: "Another addon hooks a row by listening for the callbacks fired here.",
    },
    {
      invariantKind: "departure",
      statement: "Loading twice leaves the first load alone.",
    },
  ],
} as const satisfies EsoAddon
