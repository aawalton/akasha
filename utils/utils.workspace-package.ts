import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const utils = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "utils",
  definition: "the pieces every domain reaches for and no domain claims",
  manifest: "json",
  parts: [
    "domain/utils-fs",
    "domain/utils-narrow",
    "domain/utils-process",
    "domain/utils-run",
    "domain/utils-system",
    "domain/utils-sync",
  ],
} as const satisfies WorkspacePackage
