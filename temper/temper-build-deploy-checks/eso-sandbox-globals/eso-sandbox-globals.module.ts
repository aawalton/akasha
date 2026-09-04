import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoSandboxGlobals = {
  id: "01a06365-e827-7005-8d42-8950da32503e",
  pageTypeSlug: "module",
  slug: "eso-sandbox-globals",
  definition: "the substitute game globals a bundle finds when a sandbox loads the bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A stub answers every property reach with a stub of the stub's own.",
    },
    {
      invariantKind: "constraint",
      statement: "A stub reached twice under one name answers with the same stub both times.",
    },
    {
      invariantKind: "constraint",
      statement: "A stub answers no promise.",
    },
    {
      invariantKind: "constraint",
      statement: "A stub is told from a real value by one marked property.",
    },
    {
      invariantKind: "departure",
      statement: "A load seeds only the game names a bundle reads at load time.",
    },
  ],
} as const satisfies Module
