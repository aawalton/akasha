import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const webPageAnswers = {
  id: "01a0655a-b2a8-78a3-9dec-43e67b15bf10",
  pageTypeSlug: "workspace-package",
  slug: "web-page-answers",
  definition: "what a browser asking a site about pages and nav icons is answered with",
  manifest: "json",
  partSlugs: [
    "module/answer-page-types",
    "module/answer-page-write",
    "module/answer-pages",
    "module/nav-icon-svg",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every site serving pages over http answers from here rather than from its own copy.",
    },
    {
      invariantKind: "departure",
      statement: "What differs between two sites is passed in rather than written into a copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "The three answers reaching a service-role client stand behind a `.server` folder.",
    },
  ],
} as const satisfies WorkspacePackage
