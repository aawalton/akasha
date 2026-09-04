import type { Module } from "@akasha/code-system/module"

export const companionsCodecConstants = {
  id: "01a0611d-84d0-7633-b29f-14f7be7fd63b",
  pageTypeSlug: "module",
  slug: "companions-codec-constants",
  definition: "the bit widths the companion and character build codecs read a build hash by",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A width here is the width the codec on the other side reads.",
    },
  ],
} as const satisfies Module
