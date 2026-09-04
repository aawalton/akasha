import type { Module } from "@akasha/code-system/module"

export const esouiCatalog = {
  id: "01a06069-b78e-7d2b-92aa-b3faa2d1f562",
  pageTypeSlug: "module",
  slug: "esoui-catalog",
  definition: "what ESOUI answers about the addons ESOUI carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "ESOUI answers over HTTP as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "An answer of another shape is refused rather than read past.",
    },
    {
      invariantKind: "departure",
      statement: "A network error is raised as an operational error naming the address asked.",
    },
    {
      invariantKind: "departure",
      statement: "A status other than success is raised as an operational error.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming no install folder is carried through as naming none.",
    },
    {
      invariantKind: "departure",
      statement: "The first detail record answers for the file asked about.",
    },
  ],
} as const satisfies Module
