import type { Module } from "@akasha/code-system/module"

export const addonTstlConfig = {
  id: "01a060ed-2e23-72af-af9e-fc35df5b70c3",
  pageTypeSlug: "module",
  slug: "addon-tstl-config",
  definition: "the transpiler settings a build reads for an addon whose folder holds no tsconfig",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon folder holding a tsconfig is built from the tsconfig held there.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon folder holding no tsconfig is built from settings written into the build output.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings name the module the addon page says the bundle starts from.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every module code file the addon folder holds.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every declaration the addon folder holds.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every declaration a package the addon reaches holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package the addon reaches is found through the link the workspace install left.",
    },
    {
      invariantKind: "departure",
      statement:
        "The packages an addon reaches are walked through to the end rather than one deep.",
    },
    {
      invariantKind: "constraint",
      statement: "A dependency the workspace install left no link for refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own names are described by the akasha packages of declarations.",
    },
    {
      invariantKind: "departure",
      statement: "An addon page naming no bundle entry answers that nothing can be built.",
    },
    {
      invariantKind: "constraint",
      statement: "An addon page naming a bundle entry the folder does not hold refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming a page drops the page type spelled ahead of the slug.",
    },
    {
      invariantKind: "departure",
      statement: "Every module name in the bundle is worked out from the repository root down.",
    },
  ],
} as const satisfies Module
