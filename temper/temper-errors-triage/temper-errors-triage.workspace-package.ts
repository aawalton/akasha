import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperErrorsTriage = {
  id: "01a060cd-564e-7685-8e5f-1bf87cbf4467",
  pageTypeSlug: "workspace-package",
  slug: "temper-errors-triage",
  definition: "how an error the game reported is judged",
  manifest: "json",
  partSlugs: [
    "module/errors-saved-variables",
    "module/errors-collect",
    "module/errors-crash-signatures",
    "module/errors-liveness",
    "module/errors-triage",
    "module/errors-triage-gather",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error is judged from what the addon saved rather than from the live game.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement carries the reason the judgement was reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
