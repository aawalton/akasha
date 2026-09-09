import {
  getStackEffect,
  getStartTime,
} from "../combat-action-duration/combat-action-duration.module.code.ts"
import { buildActionCtx } from "../combat-action-duration-args/combat-action-duration-args.module.code.ts"
import { STATE } from "../combat-action-queue/combat-action-queue.module.code.ts"
import type { Action } from "../combat-action-types/combat-action-types.module.code.ts"
import type { Widget } from "../combat-action-widget/combat-action-widget.module.code.ts"
import {
  newWidget,
  widgetUpdateWithAction,
} from "../combat-action-widget/combat-action-widget.module.code.ts"
import type { BarSettings } from "../combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

export function collectShiftActions(
  showedActionMap: ReadonlyMap<number, Action>,
  hotbarCategory: number,
  now: number,
  mounted: boolean
): readonly Action[] {
  const idActionMap: ReadonlyMap<number, Action> = STATE.idActionMap
  const kept: Action[] = []
  for (const [id, action] of idActionMap) {
    if (showedActionMap.has(id)) {
      continue
    }
    const stackEffect = getStackEffect(action, buildActionCtx(action, now, mounted))
    const stackCount = stackEffect !== undefined ? stackEffect.stackCount : 0
    if (
      action.effectList.length === 0 &&
      stackCount > 0 &&
      action.hotbarCategory === hotbarCategory
    ) {
      continue
    }
    action.flags.shifted = true
    kept.push(action)
  }
  kept.sort((a: Action, b: Action) => {
    const sa = getStartTime(a)
    const sb = getStartTime(b)
    if (sa > sb) {
      return -1
    }
    if (sa < sb) {
      return 1
    }
    return 0
  })
  return kept
}

export function renderShiftPass(
  toShow: readonly Action[],
  now: number,
  mounted: boolean,
  settings: BarSettings,
  shiftedBarWidgetMap: Map<number, Widget>,
  appendedBarWidgetMap: Map<number, Widget>
): boolean {
  let appendIndex = 0
  let rendered = false
  for (const action of toShow) {
    const slotNum = action.slotNum
    let widget = shiftedBarWidgetMap.get(slotNum)
    if (widget?.visible) {
      appendIndex = appendIndex + 1
      widget = appendedBarWidgetMap.get(appendIndex)
      if (widget === undefined) {
        widget = newWidget(8, true, appendIndex, settings)
        appendedBarWidgetMap.set(appendIndex, widget)
      }
    } else if (widget === undefined) {
      widget = newWidget(slotNum, true, 0, settings)
      shiftedBarWidgetMap.set(slotNum, widget)
    }
    widgetUpdateWithAction(widget, action, buildActionCtx(action, now, mounted), settings)
    rendered = true
  }
  return rendered
}
