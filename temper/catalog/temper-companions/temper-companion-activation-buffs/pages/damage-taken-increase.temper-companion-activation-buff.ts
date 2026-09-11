import type { TemperCompanionActivationBuff } from "akasha/temper/catalog/temper-companions/temper-companion-activation-buffs/temper-companion-activation-buff.page-type.types.ts"

export const damageTakenIncrease = {
  id: "01a05fcd-70f3-7c50-8220-635ad21a3287",
  type: "temper-companion-activation-buff",
  slug: "damage-taken-increase",
  key: "damage-taken-increase",
  title: "Damage Taken",
} as const satisfies TemperCompanionActivationBuff
