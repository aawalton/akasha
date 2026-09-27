import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionRotationBreakdownPanelCardNoDamageOrHealing = {
  id: "01a0e2b9-c5b1-75cd-9835-d2fdfa0abf5c",
  type: "page-type/temper-web-phrase",
  slug: "companion-rotation-breakdown-panel-card-no-damage-or-healing",
  title: "No damage or healing",
  description:
    "The simulation ran your slotted skills and came back with no damage and no healing. A bar of pure buff, debuff, or taunt skills produces exactly that. If a skill here should be dealing damage or healing, the simulation is not reading it, and that is Temper's to fix.",
} as const satisfies TemperWebPhrase
