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
      decisionKind: "decision-kind/constraint",
      statement: "The game fades a control by its own alpha times that of every control above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control faded to nothing and everything under it are left out.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "Text is set in the game's own typeface where a caller says which file is behind it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face with no file behind it is set in a near typeface instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face is known by the name the game gives it or by the file it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The near typeface for the game's body text is a condensed one, as the game's is.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game edges a backdrop with a texture, and tints that texture with a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop given neither an edge texture nor an edge size is drawn with no edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge given a size and no texture is a solid line as wide as that size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge texture the control was given no color for is drawn untinted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge with no file behind it is a line one pixel wide.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An edge file holds eight pieces in a row: left, right, top, bottom, then the corners.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The top and bottom pieces of an edge file are stored turned a quarter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A backdrop's center art is repeated inside its insets, tinted by its center color.",
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
      decisionKind: "decision-kind/departure",
      statement: "A texture shows the part of its file its coordinates name, tinted by its color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Art is painted in the page once it loads, and the picture is taken after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button is drawn with its normal art where a file is behind that art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button with no art behind it and showing no text is drawn as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button with no art behind it is framed by a line where it shows text.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game grows a label given no size to fit the text inside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label laid out with no size is drawn as wide and tall as its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link or an underline the markup wraps is drawn as the words it wraps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text the markup colors is drawn in that color until the markup ends it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon the markup names is drawn where a caller says which file is behind it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon with no file behind it is left out of the text.",
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
