import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workspaceDirs = {
  id: "01a05c48-deeb-700b-9305-52a189c99aa2",
  pageTypeSlug: "module",
  slug: "workspace-dirs",
  definition: "the folders a root manifest's workspaces entries stand for, with globs expanded",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A glob of trailing single stars is expanded one folder down for each star.",
    },
    {
      invariantKind: "departure",
      statement:
        "A glob ending in a doubled star is expanded to every folder at any depth under the prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A doubled star carrying no prefix is expanded from the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A glob of any other shape is thrown on.",
    },
    {
      invariantKind: "departure",
      statement: "An expanded folder holding no manifest is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A folder of linked packages is left out of a doubled star expansion.",
    },
    {
      invariantKind: "departure",
      statement: "A folder whose name opens with a dot is left out of a doubled star expansion.",
    },
  ],
} as const satisfies Module
