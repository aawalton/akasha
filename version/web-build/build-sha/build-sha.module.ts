import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildSha = {
  id: "01a05c48-deeb-700e-a808-4f4784f43278",
  pageTypeSlug: "module",
  slug: "build-sha",
  definition: "the forty hexadecimal characters a commit is named by, read out of one string",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Anything that is not forty lower hexadecimal characters is read as absent.",
    },
  ],
} as const satisfies Module
