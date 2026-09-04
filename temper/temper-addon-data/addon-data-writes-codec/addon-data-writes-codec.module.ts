import type { Module } from "@akasha/code-system/module"

export const addonDataWritesCodec = {
  id: "01a06837-d6c9-7fd4-9904-6563858424cb",
  pageTypeSlug: "module",
  slug: "addon-data-writes-codec",
  definition: "the codec section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One rendering of the codec constants is written under two destinations.",
    },
    {
      invariantKind: "departure",
      statement:
        "The codec section reads no page, the constants standing in the codec's own widths.",
    },
  ],
} as const satisfies Module
