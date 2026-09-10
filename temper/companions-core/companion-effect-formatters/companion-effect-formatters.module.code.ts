import { capitalize } from "@akasha/utils/narrow/capitalize"
import type {
  TargetScope,
  TargetType,
} from "../../skill-kinds/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import { statusEffectTypes } from "../../skill-kinds/status-effect-types/status-effect-types.module.code.ts"
import { targetScopes } from "../../skill-kinds/target-scopes/target-scopes.module.code.ts"
import { targetTypes } from "../../skill-kinds/target-types/target-types.module.code.ts"

export function formatDamageType(type: string): string {
  return capitalize(type)
}

export function formatCooldown(cooldown: number): string {
  const rounded = Math.round(cooldown * 10) / 10
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1)
}

export function formatTargetInfo(target: { type: TargetType; scope: TargetScope }): string {
  const scope = targetScopes.data[target.scope].name
  const type = targetTypes.data[target.type].name

  return scope === "Single" ? type : `${scope} / ${type}`
}

export function formatEnemyType(type: string): string {
  const labels: Record<string, string> = {
    undead: "Undead",
    daedra: "Daedra",
    werewolf: "Werewolf",
    "difficult-monster": "Elite Enemy",
  }
  return labels[type] ?? type
}

export function formatStatusType(status: string): string {
  if (statusEffectTypes.has(status)) {
    return statusEffectTypes.data[status].name
  }
  return status
}

export function formatWeaponType(type: string): string {
  const labels: Record<string, string> = {
    flame: "Flame",
    frost: "Frost",
    shock: "Shock",
  }
  return labels[type] ?? type
}
