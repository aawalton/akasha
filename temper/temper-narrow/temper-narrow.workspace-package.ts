import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperNarrow = {
  id: "01a060b6-99a1-7f39-a4b3-1a7f8d33b445",
  pageTypeSlug: "workspace-package",
  slug: "temper-narrow",
  definition: "the narrowings add-on code needs that only the game's own Lua can do",
  manifest: "json",
  partSlugs: ["module/require-numeric-key"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "This code is compiled to Lua and runs inside the game.",
    },
    {
      invariantKind: "departure",
      statement: "A narrowing that reaches no Lua belongs in `@akasha/utils-narrow` instead.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal here throws the plain error the game's Lua understands.",
    },
  ],
} as const satisfies WorkspacePackage
