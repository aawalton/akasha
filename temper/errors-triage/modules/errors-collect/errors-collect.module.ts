import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsCollect = {
  id: "01a060cd-5650-7b6e-ab6c-41d8a589a7ce",
  type: "module",
  slug: "errors-collect",
  definition: "every error entry gathered out of what each account saved",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every account in the saved file is gathered from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account saving no entries adds nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The entries keep the order the accounts were saved in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No entry is weighed here.",
    },
  ],
} as const satisfies Module
