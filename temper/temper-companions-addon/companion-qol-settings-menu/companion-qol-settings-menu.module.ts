import type { Module } from "@akasha/code-system/module"

export const companionQolSettingsMenu = {
  id: "01a0611d-84cd-74e4-bf3d-f59f450727cb",
  pageTypeSlug: "module",
  slug: "companion-qol-settings-menu",
  definition: "the settings panel a player changes the quality-of-life behaviour from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel is built through the add-on menu library rather than drawn by hand.",
    },
  ],
} as const satisfies Module
