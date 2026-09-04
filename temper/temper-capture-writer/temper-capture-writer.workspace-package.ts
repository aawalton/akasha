import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCaptureWriter = {
  id: "01a060b5-5ba6-79b3-9194-4261a9b83de6",
  pageTypeSlug: "workspace-package",
  slug: "temper-capture-writer",
  definition: "the add-on side of a capture, where the game is asked to save what was gathered",
  manifest: "json",
  partSlugs: ["module/capture-writer", "module/account-wide-vars", "module/run-batched"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An add-on states the capture in a descriptor and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A capture is saved for the whole account rather than for one character.",
    },
    {
      invariantKind: "constraint",
      statement: "This code is compiled to Lua and runs inside the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a saved file back.",
    },
  ],
} as const satisfies WorkspacePackage
