import type { Module } from "@akasha/code-system/module"

export const companionsProgress = {
  id: "01a0611d-84de-7012-b6a4-85e9b16fe633",
  pageTypeSlug: "module",
  slug: "companions-progress",
  definition: "recording a companion's experience, rapport and skill line ranks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Progress is recorded per companion rather than per character.",
    },
  ],
} as const satisfies Module
