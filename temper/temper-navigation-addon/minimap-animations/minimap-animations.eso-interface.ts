import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const minimapAnimations = {
  id: "01a06269-2b17-76b4-a6e1-d7eb1d3b209f",
  pageTypeSlug: "eso-interface",
  slug: "minimap-animations",
  definition: "the animation the minimap window resizes and moves with",
  markup: "xml",
  loadedAs: "TemperNavigation_Controls.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The document holds an animation timeline and no control.",
    },
    {
      invariantKind: "departure",
      statement: "The document loads before the Lua bundle.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua bundle reaches the timeline by name.",
    },
  ],
} as const satisfies EsoInterface
