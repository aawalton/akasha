import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const checkoutVersion = {
  id: "01a05c9d-dccd-7864-8e73-f8fd81e86a9c",
  pageTypeSlug: "workspace-package",
  slug: "checkout-version",
  definition: "which commit of which checkout the code now running was taken from",
  manifest: "json",
  partSlugs: ["module/provenance"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The checkout is found by walking up from the running file.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout git cannot describe is unattributable rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A worktree holding uncommitted work is said to be dirty.",
    },
  ],
} as const satisfies WorkspacePackage
