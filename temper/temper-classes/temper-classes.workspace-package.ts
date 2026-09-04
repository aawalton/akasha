import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperClasses = {
  id: "01a06076-1b68-77b4-ae8b-23358145b5e9",
  pageTypeSlug: "workspace-package",
  slug: "temper-classes",
  definition: "the classes a character is one of",
  manifest: "json",
  partSlugs: ["module/character-class"],
} as const satisfies WorkspacePackage
