import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDeclarationText = {
  id: "01a0673e-3ddf-7003-bbda-94a1b1824f32",
  type: "page-type/module",
  slug: "eso-declaration-text",
  definition: "the TypeScript declaration text a set of selected game tokens is written as",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Declarations are answered in groups rather than as one body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group is the smallest run of lines a file may be divided between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call answering nothing is a declared const holding a function type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An object states each method as a property holding a function type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing written here carries a comment or a blank line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function takes a void `this` before every other parameter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every parameter is declared optional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One return is written as the return type and several returns as a tuple.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call with variable returns ends its tuple in a rest of the last type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enum is a number type and an enum value a declared number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An object with no methods and no parent is an empty type rather than an interface.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
