import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperPlayerProfile = {
  id: "01a06354-4b4a-7d43-a987-292baabd8135",
  pageTypeSlug: "workspace-package",
  slug: "temper-player-profile",
  definition: "the handle and platform settings one player is known by",
  manifest: "json",
  partSlugs: ["module/use-player"],
} as const satisfies WorkspacePackage
