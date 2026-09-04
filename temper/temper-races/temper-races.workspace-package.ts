import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperRaces = {
  id: "01a0608a-c133-7d7f-96d5-f0070cf3a77a",
  pageTypeSlug: "workspace-package",
  slug: "temper-races",
  definition: "the playable races an Elder Scrolls Online character is born into",
  manifest: "json",
  partSlugs: ["module/races", "module/race-icon-url"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The race data here is written out from the race pages.",
    },
    {
      invariantKind: "departure",
      statement: "A race is reached by its own id rather than by the race id the game holds.",
    },
  ],
} as const satisfies WorkspacePackage
