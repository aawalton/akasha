import type { Module } from "../../code-system/modules/module.page-type.ts"

export const tsconfigReferences = {
  id: "01a06868-b18d-78ce-87db-9426be7dee4b",
  pageTypeSlug: "module",
  slug: "tsconfig-references",
  definition: "the references a repository's tsconfig files hold, and which reach nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tsconfig files read are the two at the repository root and the one in each workspace folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reference is read against the folder holding the tsconfig that states the reference.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reference naming a folder reaches that folder where the folder holds a tsconfig.",
    },
    {
      invariantKind: "departure",
      statement: "A reference naming a file reaches that file where the file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A reference climbing out of the repository reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A tsconfig is read by a parser admitting comments and a trailing comma.",
    },
    {
      invariantKind: "departure",
      statement: "A dropped reference takes the comma after that reference.",
    },
    {
      invariantKind: "departure",
      statement: "The last dropped reference takes the comma before that reference instead.",
    },
    {
      invariantKind: "departure",
      statement: "A comma taken by a dropped reference is not taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "What is left is answered as text rather than as values.",
    },
    {
      invariantKind: "absence",
      statement: "A tsconfig stating no references list is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the disk.",
    },
    {
      invariantKind: "gap",
      statement: "A reference whose target moved is repointed rather than dropped.",
    },
  ],
} as const satisfies Module
