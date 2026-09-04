import type { Module } from "@akasha/code-system/module"

export const dataEncodeEntry = {
  id: "01a06061-96a2-7ec7-8dd4-d8d8ce2fc3ff",
  pageTypeSlug: "module",
  slug: "data-encode-entry",
  definition: "the global the game reads the encoding library from once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "The self test runs once the game says this addon has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The wait is dropped as soon as the self test has run.",
    },
  ],
} as const satisfies Module
