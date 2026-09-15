import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibAddonKeybinds = {
  id: "01a0605a-0518-757d-8157-8586eaf48429",
  type: "page-type/eso-addon",
  slug: "temper-lib-addon-keybinds",
  definition: "the split of the game's keybindings menu into standard keybinds and addon keybinds",

  addonManifest: "json",
  bundleEntry: "module/addon-keybinds-entry",
  parts: [
    "module/addon-keybinds-bootstrap",
    "module/addon-keybinds-casts",
    "module/addon-keybinds-entry",
    "module/addon-keybinds-list-hooks",
    "module/addon-keybinds-load",
    "module/addon-keybinds-menu-entry",
    "module/addon-keybinds-names",
    "module/addon-keybinds-strings",
    "module/addon-keybinds-types",
    "type-declaration/addon-keybinds-declarations",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A keybind whose string id is below the game's last string id is a standard keybind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other keybind is an addon keybind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The standard menu entry and the addon menu entry keep separate scroll positions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header is shown only where a row beneath that header is shown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Another addon hooks a row by listening for the callbacks fired here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Loading twice leaves the first load alone.",
    },
  ],
} as const satisfies EsoAddon
