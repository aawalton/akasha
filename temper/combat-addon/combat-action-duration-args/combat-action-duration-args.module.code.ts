import {
  getCruxEffect,
  isCruxConsumerIcon,
} from "../combat-action-crux-stacks/combat-action-crux-stacks.module.code.ts"
import type { DurationCtx } from "../combat-action-duration/combat-action-duration.module.code.ts"
import type { Action } from "../combat-action-types/combat-action-types.module.code.ts"

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
