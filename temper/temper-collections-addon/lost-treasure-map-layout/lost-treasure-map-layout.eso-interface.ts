import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const lostTreasureMapLayout = {
  id: "01a0624c-a660-7e1e-90ff-1cb6ff118829",
  pageTypeSlug: "eso-interface",
  slug: "lost-treasure-map-layout",
  definition: "the movable treasure map window and the icon a settings row is marked with",
  markup: "xml",
  loadedAs: "LostTreasure.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The map window is dragged by its own texture rather than by a title bar.",
    },
    {
      invariantKind: "departure",
      statement: "Dragging the window calls back into the tracker so the place is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The window is clamped to the screen.",
    },
    {
      invariantKind: "departure",
      statement: "The close button hides the map window rather than taking the map window away.",
    },
  ],
} as const satisfies EsoInterface
