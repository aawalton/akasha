import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperWindow = {
  id: "01a0d8a1-61a5-7320-80ea-a068ddec4a1f",
  type: "page-type/domain",
  slug: "temper-window",
  definition: "how a window Temper shows in the game looks",
  parts: ["module/window-frame", "module/type-scale", "module/text-style"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Temper window is made in the web's visual language wherever no decision here departs from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every departure from the web's visual language is stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Temper adds inside one of the game's own windows takes the game's look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window Temper opens inside one of the game's own scenes takes the game's look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Temper shows over play, with no title and nothing to close, has no frame.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement: "Every gap between controls is one of the web's spacing steps.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A dropdown, scroll bar, slider or text box keeps the game's behaviour and takes the web's look.",
    },
  ],
} as const satisfies Domain
