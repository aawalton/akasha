import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionBuildFiling = {
  id: "01a0d8c3-435d-70ba-95c4-6618cd04fc04",
  type: "page-type/module",
  slug: "companion-build-filing",
  definition:
    "a decoded companion build filed against an account and made that companion's live build",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller decodes and names the build before it is filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash matching the companion's live build writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash the account already has files no second build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build filed here is found again by its slug, since opening a build rewrites its hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build no slug finds is found by the account and the hash together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build's slug is its name followed by a tag the account and the hash settle together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion build filed here is always live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build filed becomes the companion's live build on its progress page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's progress page is found by the address of the companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A progress page made here is slugged by companion id and account, and titled by companion name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new build whose progress page could not be written is taken away again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build filed before stays where its progress page could not be written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pages are read and written by the page access functions unless the caller states others.",
    },
  ],
} as const satisfies Module
