import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonOrphanXmlHandler = {
  id: "01a062a8-e76a-75a7-946b-4bf70079cd3d",
  pageTypeSlug: "module",
  slug: "check-addon-orphan-xml-handler",
  definition: "the run judging every inline markup handler an add-on on the roster holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The population the run states is the code and the markup the roster's add-ons hold.",
    },
    {
      invariantKind: "constraint",
      statement: "Markup held by an add-on publishing no namespace is counted and left unexamined.",
    },
    {
      invariantKind: "constraint",
      statement: "A member defined only in a machine-written file reads here as defined nowhere.",
    },
    {
      invariantKind: "constraint",
      statement: "What the run left unexamined is reported beside what the run examined.",
    },
  ],
} as const satisfies Module
