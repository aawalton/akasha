import { getCruxEffect, isCruxConsumerIcon } from "../model/crux"
import type { DurationCtx } from "../model/duration"
import type { Action } from "../model/types"

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
