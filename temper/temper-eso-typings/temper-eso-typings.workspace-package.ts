import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperEsoTypings = {
  id: "01a0673e-3ddf-7000-a6f4-66fa0861fb9d",
  pageTypeSlug: "workspace-package",
  slug: "temper-eso-typings",
  definition: "the game's own API documentation dump read as TypeScript declarations",
  manifest: "json",
  partSlugs: [
    "module/eso-doc-tokens",
    "module/eso-token-scope",
    "module/eso-declaration-text",
    "module/eso-opt-in",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dump is read as text rather than as a grammar.",
    },
    {
      invariantKind: "departure",
      statement: "A token the dump describes is carried through unjudged.",
    },
    {
      invariantKind: "departure",
      statement: "An opt-in list rather than the dump decides what is declared.",
    },
    {
      invariantKind: "departure",
      statement: "An enum a selected token names is selected too.",
    },
    {
      invariantKind: "departure",
      statement: "An object above a selected object is selected too.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the clone or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "The opt-in list itself is held outside this package.",
    },
  ],
} as const satisfies WorkspacePackage
