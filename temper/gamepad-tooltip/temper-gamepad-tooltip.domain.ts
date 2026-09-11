import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperGamepadTooltip = {
  id: "01a090e3-3836-7ac7-aa31-0457b5aa81bb",
  type: "domain",
  slug: "temper-gamepad-tooltip",
  definition: "the style a line of the game's gamepad map tooltip is drawn in",
  parts: ["module/gamepad-tooltip-style"],
} as const satisfies Domain
