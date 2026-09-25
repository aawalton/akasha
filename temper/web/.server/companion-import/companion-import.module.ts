import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionImport = {
  id: "01a0640f-8510-72bd-a455-0d889d0077fd",
  type: "page-type/module",
  slug: "companion-import",
  definition: "a companion build decoded from a hash and filed against the reader's account",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who is not signed in imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is filed under the address of the reader's account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader with no account page imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash the codec will not decode is refused rather than part-imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion catalogue is read before a hash is decoded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash the reader already has gives back the build already filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build filed here is found again by its slug, since opening a build rewrites its hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion build is always live.",
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
      statement: "A build whose progress page could not be written is taken away again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build name is the companion and the main-hand weapon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion with no readable main-hand weapon is named by the companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build's slug is its name followed by a tag the account and the hash settle together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader with no account page is told so apart from a write that failed.",
    },
  ],
} as const satisfies Module
