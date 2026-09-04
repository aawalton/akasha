import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperPlayerCompletionUi = {
  id: "01a06267-372c-7003-8a9e-15b2f42d8750",
  pageTypeSlug: "workspace-package",
  slug: "temper-player-completion-ui",
  definition: "the panel a browser draws one player's completion in",
  manifest: "json",
  partSlugs: [
    "module/completion-activity-mode-context",
    "module/completion-search-context",
    "module/completion-panel-card",
    "module/use-completion",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A panel here reaches no data of its own.",
    },
  ],
} as const satisfies WorkspacePackage
