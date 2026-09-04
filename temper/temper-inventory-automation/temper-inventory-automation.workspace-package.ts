import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperInventoryAutomation = {
  id: "01a06038-b7a2-7d0b-bbd4-68460f00c22e",
  pageTypeSlug: "workspace-package",
  slug: "temper-inventory-automation",
  definition: "what temper keeps up for a character or a companion without being asked",
  manifest: "json",
  partSlugs: [
    "module/automation-toggles",
    "module/automation-settings-shape",
    "module/automation-toggle-change",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An automation is on or off or unsaid.",
    },
    {
      invariantKind: "departure",
      statement: "An automation left unsaid for a character falls back to the global scope.",
    },
    {
      invariantKind: "departure",
      statement: "A character and a companion are automated separately.",
    },
    {
      invariantKind: "departure",
      statement: "The settings are held as JSON the addon and the tooling both read.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here reads a saved-variables file.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies WorkspacePackage
