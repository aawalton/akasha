import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDeclarationNarrowing = {
  id: "01a0ca7d-ccfa-7d68-ad8a-cc8ae5982e94",
  type: "page-type/module",
  slug: "eso-declaration-narrowing",
  definition: "the declarations left once the ones something else already states are taken out",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a hand-written declaration states is left out, whatever kind it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type alias under a name the compiler already declares is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interface under such a name is kept, because an interface merges.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A second alias under one name is what a compiler refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type naming an alias left out is written as the type that alias named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is matched whole, so a longer name carrying it is untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group left holding nothing goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind is narrowed together, because one kind names another kind's alias.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names the compiler declares are read from the compiler's own library files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The library files read are the ones carrying the globals a declaration could hit.",
    },
  ],
} as const satisfies Module
