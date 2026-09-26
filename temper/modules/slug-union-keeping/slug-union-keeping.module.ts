import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slugUnionKeeping = {
  id: "01a0df08-262b-7037-9e76-8d0575d4ef36",
  type: "page-type/module",
  slug: "slug-union-keeping",
  definition:
    "a type naming every page of one page type by its slug, written again from those pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of the type added, taken away or renamed writes the type again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the change adds is counted though the index does not list it yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slugs are written once each, in the order they sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type holding no slug is written as a type naming nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One page type's slugs may be parted among several types by what each page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already with the body that would be written again is left alone.",
    },
  ],
} as const satisfies Module
