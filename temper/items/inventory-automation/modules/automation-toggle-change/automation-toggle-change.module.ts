import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationToggleChange = {
  id: "01a06038-b7a4-7626-9f8d-00da1e05f38a",
  type: "page-type/module",
  slug: "automation-toggle-change",
  definition: "the settings that follow from switching a toggle in a scope",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope is the global scope or a named character or a named companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character scope names the character by its ESO character identity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion scope names the companion by its companion identity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle characters and companions both carry needs a target naming the side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target contradicting the one side its toggle applies to is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target stated outside the global scope is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle the named side does not carry is refused before anything changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names every toggle the side does carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of nothing takes the toggle away rather than switching that toggle off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle taken away falls back to the value the global scope has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settings come back new rather than changed in place.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
