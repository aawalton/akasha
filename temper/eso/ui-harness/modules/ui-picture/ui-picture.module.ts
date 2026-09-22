import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiPicture = {
  id: "01a0c9dd-cc82-7f73-b0c4-69cb07323425",
  type: "page-type/module",
  slug: "ui-picture",
  definition: "a picture of the controls a snapshot carries, taken outside the game",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The controls become a page a browser lays out, and the browser takes the picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control sits where the layout says it sits rather than where a browser puts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden control and everything under that control are left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color the game states from nought to one becomes a color a browser reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A font's size and weight are read off the name the control was given.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The game's own typefaces ship inside the client, so a near one is used instead.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game edges a backdrop with a texture, and tints that texture with a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop given no edge texture is drawn with no edge, whatever its edge color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge texture the control was given no color for is drawn untinted.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "An edge is a line one pixel wide rather than the texture's own art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller says which file is behind a texture the game names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture with no file behind it is a box carrying that texture's name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No control here is given a size by the text inside that control.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A test lane has a home of its own, and no browser is installed under that home.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here opens a browser.",
    },
  ],
} as const satisfies Module
