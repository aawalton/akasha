import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperHudAddon = {
  id: "01a061c5-18dd-7011-a8e7-8f6d488e9b03",
  pageTypeSlug: "eso-addon",
  slug: "temper-hud-addon",
  definition:
    "the add-on holding the status bar and the slash command every Temper add-on adds a subcommand to",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "hud-addon-entry",
  partSlugs: [
    "module/hud-addon-format",
    "module/hud-addon-visibility-version",
    "module/hud-addon-types",
    "module/hud-addon-saved-variables",
    "module/hud-addon-field-registry",
    "module/hud-addon-command-registry",
    "module/hud-addon-commands",
    "module/hud-addon-bar",
    "module/hud-addon-builtins",
    "module/hud-addon-hide-targets",
    "module/hud-addon-hide-types",
    "module/hud-addon-hide-plan",
    "module/hud-addon-hide-registry",
    "module/hud-addon-hide-init",
    "module/hud-addon-settings-panel",
    "module/hud-addon-public-api",
    "module/hud-addon-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Another add-on reaches the heads-up add-on through the global rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parts of the HUD the heads-up add-on hides are read from `temper-hud-components`.",
    },
    {
      invariantKind: "departure",
      statement: "What the player has shown and hidden is kept across the whole account.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on adding a field to the bar states the order that field sits at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any other add-on's field means.",
    },
  ],
} as const satisfies EsoAddon
