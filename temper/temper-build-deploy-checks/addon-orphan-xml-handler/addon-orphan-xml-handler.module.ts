import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonOrphanXmlHandler = {
  id: "01a062a8-e76a-77f5-a7f2-de80170b6c77",
  pageTypeSlug: "module",
  slug: "addon-orphan-xml-handler",
  definition: "whether an inline markup handler names what an add-on's source defines nowhere",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An add-on publishing no global namespace has no handler judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A handler inside a markup comment is no handler.",
    },
    {
      invariantKind: "constraint",
      statement: "A handler whose body is blank is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A non-blank `OnUpdate` naming a published namespace is a finding of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A member written onto any object anywhere in the add-on counts as defined.",
    },
  ],
} as const satisfies Module
