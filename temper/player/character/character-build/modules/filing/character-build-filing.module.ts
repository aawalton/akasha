import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterBuildFiling = {
  id: "01a1590a-2fef-7e1d-b86d-c75dd57e85ac",
  type: "page-type/module",
  slug: "character-build-filing",
  definition: "a character build page given the account and character it names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is filed against the character its character name names on the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build naming no account takes the account its character's page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build naming another account is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build naming no character the account has is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A live build becomes its character's live build, and a target build its target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A private build is attached to no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character already naming a build that is there keeps it, so filing never replaces a choice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character naming a build that is gone takes the build filed in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build already filed writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pages are read and written by the page access functions unless the caller states others.",
    },
  ],
  createdAt: "2026-10-20T11:20:02.286Z",
  updatedAt: "2026-10-20T11:20:02.286Z",
} as const satisfies Module
