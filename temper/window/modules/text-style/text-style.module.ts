import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textStyle = {
  id: "01a0d8f9-dbba-7a3c-aa3d-19fbc330b7d7",
  type: "page-type/module",
  slug: "text-style",
  definition: "the part a piece of text plays in a Temper window, and the look that part takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every piece of text in a Temper window plays one part, and the part sets its look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Body text is 14 in Geist at 400, in the primary text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading is 14 in Geist at 500, in the primary text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column or field label is 12 in Geist at 500, secondary and in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number in a table or a stat is 14 in Geist Mono.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Accent text is bold and in the web's gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text less important than body text is secondary, and the least is tertiary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color other than a text color is given only where it names a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on's load declares each part's font to the game by name, for its layouts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text made in code names its font by the path the game reads it from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text shown over play takes its part's face with the game's thick soft shadow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part's shadowed face is declared under its name followed by OverPlay.",
    },
  ],
} as const satisfies Module
