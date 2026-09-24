import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiArtPainting = {
  id: "01a0d493-d343-7db9-8802-186be63d391f",
  type: "page-type/module",
  slug: "ui-art-painting",
  definition: "the game's art painted onto the canvases a picture's page holds",
  code: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The painting runs inside the browser's page, so it reaches nothing outside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A canvas says what to paint on it through its own data attributes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tint multiplies the art and keeps the art's own transparency.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coordinates running backwards flip the art they name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge's sides are repeated along the backdrop, and its corners are set once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that will not load leaves its canvas empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here opens a browser.",
    },
  ],
} as const satisfies Module
