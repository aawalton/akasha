import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointSourceTypes = {
  id: "01a06108-2ff9-79f9-89de-7ec1b805bb4d",
  pageTypeSlug: "module",
  slug: "skill-point-source-types",
  definition: "the shape of a place The Elder Scrolls Online hands a character a skill point",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
