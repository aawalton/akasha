import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCatalogCore = {
  id: "01a06071-0c7a-7792-ab3e-69213b5eaf92",
  pageTypeSlug: "workspace-package",
  slug: "temper-catalog-core",
  definition: "the shape a capture of the game's reference data takes, and the walk that fills it",
  manifest: "json",
  partSlugs: [
    "module/catalog-payload",
    "module/catalog-descriptor",
    "module/domain-keys",
    "module/domain-registry",
    "module/saved-variables-accessor",
    "module/apply-invalidations",
    "module/clear-target",
    "module/batch-config",
    "module/catalog-walk",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "departure",
      statement: "Each catalog domain's collector lives in a package apart from this one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
