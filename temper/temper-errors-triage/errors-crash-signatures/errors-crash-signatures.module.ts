import type { Module } from "@akasha/code-system/module"

export const errorsCrashSignatures = {
  id: "01a060cd-5650-7e48-8597-777c84f0ffa4",
  pageTypeSlug: "module",
  slug: "errors-crash-signatures",
  definition: "the known crashes an error is matched against to name the addon at fault",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A signature is matched against the message and the traceback read as one text.",
    },
    {
      invariantKind: "departure",
      statement: "The first signature that matches names the addon at fault.",
    },
    {
      invariantKind: "departure",
      statement: "An error matching no signature names no addon.",
    },
    {
      invariantKind: "departure",
      statement: "An error is keyed with every number in the message written as one mark.",
    },
    {
      invariantKind: "departure",
      statement: "A key is drawn from the first traceback frame naming an addon folder.",
    },
  ],
} as const satisfies Module
