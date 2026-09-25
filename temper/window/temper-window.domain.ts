import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperWindow = {
  id: "01a0d8a1-61a5-7320-80ea-a068ddec4a1f",
  type: "page-type/domain",
  slug: "temper-window",
  definition: "how a window Temper shows in the game looks",
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
      decisionKind: "decision-kind/gap",
      statement: "Text is colored in the web's primary, secondary or tertiary text color.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The accent is the web's gold, and accent text is bold.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Text is set in Geist, and a number in Geist Mono.",
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
