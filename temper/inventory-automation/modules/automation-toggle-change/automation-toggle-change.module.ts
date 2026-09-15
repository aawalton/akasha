import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationToggleChange = {
  id: "01a06038-b7a4-7626-9f8d-00da1e05f38a",
  type: "module",
  slug: "automation-toggle-change",
  definition: "the settings that follow from switching one toggle in one scope",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope is the global scope or a named character or a named companion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character scope names the character by its ESO character identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion scope names the companion by its companion identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle characters and companions both carry needs a target naming the side.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target contradicting the one side its toggle applies to is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target stated outside the global scope is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle the named side does not carry is refused before anything changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names every toggle the side does carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value of nothing takes the toggle away rather than switching that toggle off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle taken away falls back to the value the global scope has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings come back new rather than changed in place.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
