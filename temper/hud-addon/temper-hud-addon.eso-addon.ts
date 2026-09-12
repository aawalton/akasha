import type { EsoAddon } from "akasha/code/eso-addons/eso-addon.page-type.types.ts"

export const temperHudAddon = {
  id: "01a061c5-18dd-7011-a8e7-8f6d488e9b03",
  type: "eso-addon",
  slug: "temper-hud-addon",
  definition:
    "the add-on holding the status bar and the slash command every Temper add-on adds a subcommand to",

  addonManifest: "json",
  bundleEntry: "hud-addon-entry",
  parts: [
    "module/hud-addon-bar",
    "module/hud-addon-builtins",
    "module/hud-addon-command-registry",
    "module/hud-addon-commands",
    "module/hud-addon-entry",
    "module/hud-addon-field-registry",
    "module/hud-addon-format",
    "module/hud-addon-hide-init",
    "module/hud-addon-hide-plan",
    "module/hud-addon-hide-registry",
    "module/hud-addon-hide-targets",
    "module/hud-addon-hide-types",
    "module/hud-addon-public-api",
    "module/hud-addon-saved-variables",
    "module/hud-addon-settings-panel",
    "module/hud-addon-types",
    "module/hud-addon-visibility-version",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The parts of the HUD the heads-up add-on hides are read from `temper-hud-components`.",
    },
    {
      invariantKind: "departure",
      statement: "The parts the player has shown and hidden are kept across the whole account.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on adding a field to the bar states the order that field sits at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows the meaning of any other add-on's field.",
    },
  ],
} as const satisfies EsoAddon
