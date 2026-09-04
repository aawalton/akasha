import type { Module } from "@akasha/code-system/module"

export const addonDataOutputDirs = {
  id: "01a06837-d6c8-7575-95dd-44fa2e3c7d3e",
  pageTypeSlug: "module",
  slug: "addon-data-output-dirs",
  definition: "the directory each rendered table is written under while targets are still folders",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An output dir is worked out from the checkout the run walks.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout named in `CODE_ROOT` is the one an output dir stands under.",
    },
    {
      invariantKind: "departure",
      statement: "A dir whose parent is absent from disk is refused rather than created.",
    },
    {
      invariantKind: "absence",
      statement: "No dir is guarded over, the guarded list standing empty.",
    },
    {
      invariantKind: "departure",
      statement: "An empty guarded list is a guard with nothing left to stand over.",
    },
    {
      invariantKind: "gap",
      statement: "A rendered table names the module it lands as rather than a folder.",
    },
  ],
} as const satisfies Module
