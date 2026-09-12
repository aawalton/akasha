import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperLibExtendedJournal = {
  id: "01a0617d-5454-7d6e-a26b-24878ddb747f",
  type: "eso-addon",
  slug: "temper-lib-extended-journal",
  definition: "a window other add-ons hang a tab in, built like the game's own journal",

  addonManifest: "json",
  bindings: "xml",
  bundleEntry: "journal-main",
  parts: [
    "eso-interface/journal-controls",
    "module/journal-casts",
    "module/journal-core",
    "module/journal-l10n",
    "module/journal-main",
    "module/journal-main-menu",
    "module/journal-public-api",
    "module/journal-shape",
    "module/journal-sort-filter-list",
    "module/journal-state",
    "module/journal-tabs",
    "module/journal-tooltip-colors",
    "module/journal-tooltip-extension",
    "module/journal-tooltips",
    "module/journal-window",
    "type-declaration/journal-control-names",
    "type-declaration/journal-saved-variables",
    "type-declaration/journal-string-ids",
  ],
  interfaces: ["journal-controls"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Another add-on names a tab and hands over the control the tab draws in.",
    },
    {
      invariantKind: "departure",
      statement: "The window is built the first time the window is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A tab is shown by its name from a keybind or a slash command.",
    },
    {
      invariantKind: "departure",
      statement: "The tab shown last answers the settings keybind with its own panel.",
    },
    {
      invariantKind: "departure",
      statement: "The colors a tooltip is drawn in are kept between sessions.",
    },
    {
      invariantKind: "constraint",
      statement: "This library depends on no other add-on.",
    },
  ],
} as const satisfies EsoAddon
