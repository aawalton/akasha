import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const utilsSync = {
  id: "01a05c6a-2bb3-7c64-b97e-cdaaf5e58872",
  pageTypeSlug: "workspace-package",
  slug: "utils-sync",
  definition: "the day it is in UTC, and the shape a page type's properties are declared in",
  manifest: "json",
  partSlugs: ["module/today", "module/page-type-props"],
} as const satisfies WorkspacePackage
