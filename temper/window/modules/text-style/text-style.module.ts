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
      statement: "Body text is the game's ZoFontGame, in the game's normal text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading is the game's ZoFontWinH4, in capitals and the selected text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Strong text is the game's ZoFontGameBold, in the selected text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column or field label is set as the game's sort header is, in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number in a table or a stat is set as body text is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Accent text is bold and in the game's contrast gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text less important than body text is the default text color, the least is hint.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part's color is read from the game's interface colors when it is painted.",
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
      statement: "A part's color is also given as the hex the game's inline color markup reads.",
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
  createdAt: "2026-09-25T14:30:48.506Z",
  updatedAt: "2026-10-18T17:23:25.067Z",
} as const satisfies Module
