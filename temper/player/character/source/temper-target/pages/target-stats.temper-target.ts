import type { TemperTarget } from "akasha/temper/player/character/source/temper-target/temper-target.page-type.types.ts"

export const targetStats = {
  id: "01a0df59-89b4-74ea-8a74-e7975a88bef2",
  type: "page-type/temper-target",
  slug: "target-stats",
  title: "Target Stats",
  effects: [
    { metric: "temper-metric/target-armor", effectType: "integer", value: 18200 },
    { metric: "temper-metric/target-spell-debuff", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-physical-debuff", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-weapon-power", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-spell-power", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-damage-taken", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-defense-bonus", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-critical-resistance", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-critical-damage", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-penetration", effectType: "integer", value: 0 },
    { metric: "temper-metric/target-attack-bonus", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-percent-health", effectType: "fractional-change", value: 1 },
    { metric: "temper-metric/target-damage-done", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-healing-received", effectType: "fractional-change", value: 0 },
    { metric: "temper-metric/target-health-recovery", effectType: "fractional-change", value: 0 },
    {
      metric: "temper-metric/target-critical-damage-done",
      effectType: "fractional-change",
      value: 0,
    },
  ],
} as const satisfies TemperTarget
