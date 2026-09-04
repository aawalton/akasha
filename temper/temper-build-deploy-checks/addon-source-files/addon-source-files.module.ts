import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonSourceFiles = {
  id: "01a062a8-e76a-7fda-a7db-9dcb0cf64d2f",
  pageTypeSlug: "module",
  slug: "addon-source-files",
  definition: "which files under a game add-on's own folder are that add-on's source and markup",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An add-on's own code is the module code beside the add-on's own pages.",
    },
    {
      invariantKind: "constraint",
      statement: "An add-on still outside akasha keeps its code under a `src` folder.",
    },
    {
      invariantKind: "constraint",
      statement: "A machine-written file is the add-on's own wherever the file sits.",
    },
    {
      invariantKind: "constraint",
      statement: "A machine-written file counts even where a scan declines to read the file.",
    },
    {
      invariantKind: "constraint",
      statement: "A type declaration is no code.",
    },
    {
      invariantKind: "constraint",
      statement: "A test is no code.",
    },
    {
      invariantKind: "constraint",
      statement: "A file a build wrote is a copy of a file already counted.",
    },
    {
      invariantKind: "constraint",
      statement: "A file another package owns is no part of the add-on.",
    },
    {
      invariantKind: "departure",
      statement: "Five checks each held a walk of their own before this one.",
    },
  ],
} as const satisfies Module
