import type { Module } from "@akasha/code-system/module"

export const addonDataProof = {
  id: "01a0694d-0713-7912-ae1c-585ecc7d5c1f",
  pageTypeSlug: "module",
  slug: "addon-data-proof",
  definition: "whether every file the addon data run emits comes back byte-identical",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The real write table is driven with a write that compares rather than writes.",
    },
    {
      invariantKind: "departure",
      statement: "A file the run would emit is judged against the file standing on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A file no run has emitted yet is absent rather than different.",
    },
    {
      invariantKind: "departure",
      statement: "A section is driven on its own so that a section that throws hides no other.",
    },
    {
      invariantKind: "departure",
      statement: "Where a section throws, the throw is what is reported about that section.",
    },
    {
      invariantKind: "departure",
      statement: "A section is reported whether the sections beside it stood or fell.",
    },
    {
      invariantKind: "departure",
      statement: "Naming sections narrows the run to the sections named.",
    },
    {
      invariantKind: "departure",
      statement:
        "The populations are asked for through the same table and the same asking the run uses.",
    },
    {
      invariantKind: "absence",
      statement: "No second table names which page type a population is read from.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the store will not answer is reported and read as no rows.",
    },
    {
      invariantKind: "departure",
      statement: "A population that fails leaves the sections that do not read it judged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
