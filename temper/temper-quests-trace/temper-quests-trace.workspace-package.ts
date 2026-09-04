import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperQuestsTrace = {
  id: "01a06098-98a2-7c25-8f77-066842973eb3",
  pageTypeSlug: "workspace-package",
  slug: "temper-quests-trace",
  definition: "what the quest addon decided, read back from what the addon saved",
  manifest: "json",
  partSlugs: ["module/auto-quest-trace"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trace is read here outside the game rather than inside the game.",
    },
    {
      invariantKind: "absence",
      statement: "No game function is called here.",
    },
  ],
} as const satisfies WorkspacePackage
