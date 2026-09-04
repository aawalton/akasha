import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperCatalogSideFile = {
  id: "01a060ce-b8ca-70c9-aff9-a8d013b9d7e5",
  pageTypeSlug: "workspace-package",
  slug: "temper-catalog-side-file",
  definition: "what the catalog addon is told to collect again, written where the addon reads it",
  manifest: "json",
  partSlugs: ["module/catalog-side-file", "module/catalog-file-paths"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The addon is told what to collect again through a file rather than a call.",
    },
    {
      invariantKind: "departure",
      statement: "The file is Lua the addon loads as a table.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies WorkspacePackage
