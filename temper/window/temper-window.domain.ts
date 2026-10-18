import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperWindow = {
  id: "01a0d8a1-61a5-7320-80ea-a068ddec4a1f",
  type: "page-type/domain",
  slug: "temper-window",
  definition: "how a window Temper shows in the game looks",
  parts: [
    "module/window-frame",
    "module/type-scale",
    "module/text-style",
    "module/window-rows",
    "module/window-controls",
    "module/window-spacing",
    "module/window-numbers",
    "module/tooltip-lines",
    "module/window-popover",
    "module/window-data-state",
    "module/window-open-list",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything Temper shows in the game takes the game's own keyboard look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every departure from the game's keyboard look is stated here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No Temper window has a look of its own for gamepad mode.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window ported from a community add-on takes the game's look like any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin Temper puts on the game's map or compass takes the game's own map art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Temper shows over play, with no title and nothing to close, has no frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Temper window showing data shows it loading, empty, failed or loaded.",
    },
  ],
  createdAt: "2026-09-25T12:54:10.085Z",
  updatedAt: "2026-10-18T17:16:02.330Z",
} as const satisfies Domain
