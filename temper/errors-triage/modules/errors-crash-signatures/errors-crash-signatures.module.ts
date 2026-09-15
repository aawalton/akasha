import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsCrashSignatures = {
  id: "01a060cd-5650-7e48-8597-777c84f0ffa4",
  type: "module",
  slug: "errors-crash-signatures",
  definition: "the known crashes an error is matched against to name the addon at fault",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A signature is matched against the message and the traceback read as one text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first signature that matches names the addon at fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error matching no signature names no addon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error is keyed with every number in the message written as one mark.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is drawn from the first traceback frame naming an addon folder.",
    },
  ],
} as const satisfies Module
