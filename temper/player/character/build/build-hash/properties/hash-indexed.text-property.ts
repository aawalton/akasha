import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const hashIndexed = {
  id: "01a0d5be-2064-7ee6-b753-68438fdbc94c",
  type: "page-type/text-property",
  slug: "hash-indexed",
  propertySlug: "hash-indexed",
  definition: "a table in this page's code whose places a build hash holds",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "On a module, the name is a constant declared at the top of the module's code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "On a page type, the name is the field its pages are put in order by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table named here is the one an encoder or a decoder reads, whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table spread into the table named here is read through that table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page saying nothing here holds no table a build hash reads by place.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
