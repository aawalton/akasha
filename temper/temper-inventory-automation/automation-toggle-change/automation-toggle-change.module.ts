import type { Module } from "@akasha/code-system/module"

export const automationToggleChange = {
  id: "01a06038-b7a4-7626-9f8d-00da1e05f38a",
  pageTypeSlug: "module",
  slug: "automation-toggle-change",
  definition: "the settings that follow from switching one toggle in one scope",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scope is either everyone or one named character or one named companion.",
    },
    {
      invariantKind: "departure",
      statement: "A character scope names the character by its ESO character identity.",
    },
    {
      invariantKind: "departure",
      statement: "A companion scope names the companion by its companion identity.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle both characters and companions carry needs a target to tell which.",
    },
    {
      invariantKind: "departure",
      statement: "A target contradicting the one side its toggle applies to is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A target stated outside the global scope is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle the named side does not carry is refused before anything changes.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names every toggle the side does carry.",
    },
    {
      invariantKind: "departure",
      statement: "A value of nothing takes the toggle away rather than switching it off.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle taken away falls back to what the global scope says.",
    },
    {
      invariantKind: "departure",
      statement: "Settings come back new rather than changed in place.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
