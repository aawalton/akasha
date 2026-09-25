import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherTokenCheck = {
  id: "01a0640f-8510-7490-bf5f-876df0d09100",
  type: "page-type/module",
  slug: "watcher-token-check",
  definition: "the account a watcher token presented to the server represents",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A token of the wrong shape is refused without the store being reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stored hash is compared in time that does not vary with how far the hash matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enrolment naming no account grants nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An enrolment matched by its digest and granting nothing names the key that enrolment wanted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The user a token grants is the key of the account page its enrolment names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enrolment whose account page names no user grants nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token that matches no enrolment is refused without a word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bookkeeping write that fails does not decide authentication.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every key this module selects is a key the enrolment's page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property that is uncommitted or secret counts as declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The keys a page type declares are gathered by walking the page types that type extends.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The enrolment is read as the system, because this read is what names the reader.",
    },
  ],
} as const satisfies Module
