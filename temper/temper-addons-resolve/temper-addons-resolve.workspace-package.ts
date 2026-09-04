import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperAddonsResolve = {
  id: "01a06060-ec3c-725c-b37c-206e3c7f7e97",
  pageTypeSlug: "workspace-package",
  slug: "temper-addons-resolve",
  definition: "which addons the repository holds and what each addon needs to be built",
  manifest: "json",
  partSlugs: [
    "module/addon-json",
    "module/addon-manifest-file",
    "module/workspace-closure",
    "module/addon-roster",
    "module/deployable-addons",
    "module/distributable-set",
    "module/folder-ownership",
    "module/sibling-addons",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon is a workspace package holding an addon manifest.",
    },
    {
      invariantKind: "departure",
      statement: "An addon is found by walking the workspaces the root manifest declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy did not write is never deleted on missing evidence.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the game's addons folder.",
    },
  ],
} as const satisfies WorkspacePackage
