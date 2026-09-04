import type { Module } from "@akasha/code-system/module"

export const libSetsTipVeteranBreakdown = {
  id: "01a06231-8f1e-737c-a36f-8ed525388bae",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-veteran-breakdown",
  definition: "the per-slot veteran or normal reading of a monster set whose pieces differ",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The breakdown only appears when the pieces do not all agree.",
    },
    {
      invariantKind: "departure",
      statement: "A slot with no veteran flag recorded is shown as a question mark.",
    },
  ],
} as const satisfies Module
