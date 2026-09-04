import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonHookEagerCapture = {
  id: "01a062a8-e76a-7827-ac45-326fa4e9d4f3",
  pageTypeSlug: "module",
  slug: "check-addon-hook-eager-capture",
  definition: "the run judging every load-installed hook an add-on on the roster holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population this run states is the code the roster's add-ons hold.",
    },
    {
      invariantKind: "constraint",
      statement: "A field is deferred when the field is published from inside a function body.",
    },
    {
      invariantKind: "constraint",
      statement: "A deferred field an add-on's own file assigns at load is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A name a closure declares of its own shadows the capture and is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "What the run declined to read is reported beside what the run read.",
    },
  ],
} as const satisfies Module
