import type { Module } from "@akasha/code-system/module"

export const errorsLiveness = {
  id: "01a060cd-5651-794e-9cb4-d37959543fd2",
  pageTypeSlug: "module",
  slug: "errors-liveness",
  definition: "whether an error is still happening or was left behind by a mend",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error last seen before its addon was mended is left behind.",
    },
    {
      invariantKind: "departure",
      statement: "An error unseen for longer than the staleness allowed is left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A mend weighs ahead of recency.",
    },
    {
      invariantKind: "departure",
      statement: "An addon outside the repository is judged by recency alone.",
    },
    {
      invariantKind: "departure",
      statement: "The addon owning an error is read off the first traceback frame.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
