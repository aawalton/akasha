import type { Module } from "@akasha/code/module"

export const useTemperImport = {
  id: "01a06432-b190-775e-b337-08bc9a817717",
  pageTypeSlug: "module",
  slug: "use-temper-import",
  definition: "the import a browser runs, from the file chosen to the result held",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An import merges forward against the completion already counted rather than writing over it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A completion that could not be read stops the import rather than reading as absent.",
    },
  ],
} as const satisfies Module
