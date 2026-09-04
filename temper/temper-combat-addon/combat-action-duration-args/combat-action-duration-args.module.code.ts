import {
  getCruxEffect,
  isCruxConsumerIcon,
} from "@akasha/temper-combat-addon/combat-action-crux-stacks"
import type { DurationCtx } from "@akasha/temper-combat-addon/combat-action-duration"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

export function buildActionCtx(
  this: void,
  action: Action,
  now: number,
  mounted: boolean
): DurationCtx {
  const cruxFallback = isCruxConsumerIcon(action.ability.icon)
    ? getCruxEffect(action.ability)
    : undefined
  return { now, mounted, cruxFallback }
}
