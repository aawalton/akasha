import type { Action } from "akasha/temper/combat-addon/combat-action-types/combat-action-types.module.code.ts"
import {
  getCruxEffect,
  isCruxConsumerIcon,
} from "akasha/temper/combat-addon/modules/combat-action-crux-stacks/combat-action-crux-stacks.module.code.ts"
import type { DurationCtx } from "akasha/temper/combat-addon/modules/combat-action-duration/combat-action-duration.module.code.ts"

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
