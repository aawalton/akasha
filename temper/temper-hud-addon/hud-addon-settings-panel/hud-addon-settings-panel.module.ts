import type { Module } from "@akasha/code-system/module"

export const hudAddonSettingsPanel = {
  id: "01a061c5-18dd-700e-a1a1-88e5a1cecf77",
  pageTypeSlug: "module",
  slug: "hud-addon-settings-panel",
  definition: "the settings page a player turns each HUD part on and off from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part sits under the category the catalog gives that part.",
    },
    {
      invariantKind: "departure",
      statement: "The categories appear in the order the catalog first names a category.",
    },
    {
      invariantKind: "departure",
      statement: "A checkbox turned on shows its part.",
    },
  ],
} as const satisfies Module
