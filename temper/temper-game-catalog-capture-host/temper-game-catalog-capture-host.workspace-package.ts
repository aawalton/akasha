import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperGameCatalogCaptureHost = {
  id: "01a06084-d418-72e5-b162-3bb5b84f91b3",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-catalog-capture-host",
  definition: "the zod schemas reading every game catalog a capture addon saved",
  manifest: "json",
  partSlugs: [
    "module/achievement-catalog-schema",
    "module/antiquity-lore-catalog-schema",
    "module/cadwell-catalog-schema",
    "module/collectibles-catalog-schema",
    "module/lore-library-catalog-schema",
    "module/poi-catalog-schema",
    "module/recipe-catalog-schema",
    "module/trait-research-catalog-schema",
    "module/tribute-catalog-schema",
    "module/zone-completion-catalog-schema",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each catalog here is a module of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A completion catalog here is read from a key the game already gives as a number.",
    },
  ],
} as const satisfies WorkspacePackage
