import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useTemperImport = {
  id: "01a06432-b190-775e-b337-08bc9a817717",
  type: "page-type/module",
  slug: "use-temper-import",
  definition: "the import a browser runs, from the file chosen to the result held",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import merges forward against the completion already counted rather than writing over it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A completion that could not be read stops the import rather than reading as absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character or companion is written under the address of the account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion page is found by the address of the companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion page takes the companion's id as its slug and its name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account page made by this import is read back for its address.",
    },
  ],
} as const satisfies Module
