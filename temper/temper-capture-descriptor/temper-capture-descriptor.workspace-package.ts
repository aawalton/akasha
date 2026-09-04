import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCaptureDescriptor = {
  id: "01a06053-3638-7139-bd21-390fdc77e0f0",
  pageTypeSlug: "workspace-package",
  slug: "temper-capture-descriptor",
  definition: "the shape an add-on's captured state takes where the game saves it",
  manifest: "json",
  partSlugs: ["module/descriptor"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The add-on writing a capture and the reader of that capture agree here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
