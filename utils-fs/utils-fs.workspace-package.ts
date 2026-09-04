import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const utilsFs = {
  id: "01a05c4c-9440-7c8e-bb95-ba621d52090a",
  pageTypeSlug: "workspace-package",
  slug: "utils-fs",
  definition: "how a file lands whole and how a path spelled from home is spelled in full",
  manifest: "json",
  partSlugs: [
    "module/atomic-write",
    "module/expand-tilde",
    "module/missing",
    "module/read-stdin-or-file",
  ],
} as const satisfies WorkspacePackage
