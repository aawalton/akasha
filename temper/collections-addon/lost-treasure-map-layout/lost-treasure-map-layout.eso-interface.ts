import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const lostTreasureMapLayout = {
  id: "01a0624c-a660-7e1e-90ff-1cb6ff118829",
  type: "page-type/eso-interface",
  slug: "lost-treasure-map-layout",
  definition: "the movable treasure map window and the icon a settings row is marked with",
  markup: "xml",
  loadedAs: "LostTreasure.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map window is dragged by its own texture rather than by a title bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dragging the window calls back into the tracker so the place is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is clamped to the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The close button hides the map window rather than taking the map window away.",
    },
  ],
} as const satisfies EsoInterface
