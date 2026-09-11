import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const counted = {
  id: "01a08ccc-aca8-7215-b4dd-560d25d104b5",
  pageTypeSlug: "module",
  type: "module",
  slug: "counted",
  definition: "a count said beside the thing counted, in the singular or the plural",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count of one is said with the singular.",
    },
    {
      invariantKind: "departure",
      statement: "Every other count is said with the plural.",
    },
    {
      invariantKind: "departure",
      statement: "A count of none is said with the plural.",
    },
    {
      invariantKind: "departure",
      statement: "The plural is the singular with an `s` at its end.",
    },
    {
      invariantKind: "absence",
      statement: "A count is written as digits rather than as a word.",
    },
  ],
} as const satisfies Module
