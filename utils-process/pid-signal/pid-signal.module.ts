import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pidSignal = {
  id: "01a05c4f-6f2e-7d2e-bf84-237cf8284bd3",
  pageTypeSlug: "module",
  slug: "pid-signal",
  definition: "whether a process id still answers, read by signalling it with nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pid another user owns is a pid that is there.",
    },
    {
      invariantKind: "departure",
      statement: "Only ESRCH proves a process is gone.",
    },
    {
      invariantKind: "departure",
      statement: "An errno that is neither ESRCH nor EPERM reads as unknown.",
    },
    {
      invariantKind: "departure",
      statement: "Every caller folds unknown its own way and says why in the fold.",
    },
    {
      invariantKind: "absence",
      statement: "The reading itself carries no answer of alive or dead.",
    },
  ],
} as const satisfies Module
