import { getBarSettings } from "../combat-action-bar-settings/combat-action-bar-settings.module.code.ts"
import { getNewest } from "../combat-action-build/combat-action-build.module.code.ts"
import type { DurationCtx } from "../combat-action-duration/combat-action-duration.module.code.ts"
import { buildActionCtx } from "../combat-action-duration-args/combat-action-duration-args.module.code.ts"
import { onEngineUpdate } from "../combat-action-engine-context/combat-action-engine-context.module.code.ts"
import { matchesAbility } from "../combat-action-matching/combat-action-matching.module.code.ts"
import { STATE } from "../combat-action-queue/combat-action-queue.module.code.ts"
import {
  collectShiftActions,
  renderShiftPass,
} from "../combat-action-shift-bar/combat-action-shift-bar.module.code.ts"
import {
  getActiveHotbarCategory,
  readSlotAbility,
} from "../combat-action-slots/combat-action-slots.module.code.ts"
import type { Action } from "../combat-action-types/combat-action-types.module.code.ts"
import type { Widget } from "../combat-action-widget/combat-action-widget.module.code.ts"
import {
  newWidget,
  widgetHide,
  widgetUpdateWithAction,
} from "../combat-action-widget/combat-action-widget.module.code.ts"
import type { BarSettings } from "../combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

const QUICKSLOT_SLOT_NUM = 9

const QUICKSLOT_FAKE_SLOT = 3

const mainBarWidgetMap = new Map<number, Widget>()
const shiftedBarWidgetMap = new Map<number, Widget>()
const appendedBarWidgetMap = new Map<number, Widget>()
let quickslotWidget: Widget | undefined
let quickslotFakeAction: Action | undefined

let SHIFT_ACTIVE = false

export function isShiftActive(this: void): boolean {
  return SHIFT_ACTIVE
}

function newQuickslotFakeAction(): Action {
  const slotAbility = readSlotAbility(QUICKSLOT_FAKE_SLOT, getActiveHotbarCategory())
  const ability =
    slotAbility ??
    ({
      id: 0,
      name: "",
      showName: "",
      icon: "",
      description: "",
      type: 0,
    } satisfies Action["ability"])
  return {
    sn: 0,
    slotNum: QUICKSLOT_SLOT_NUM,
    hotbarCategory: HOTBAR_CATEGORY_QUICKSLOT_WHEEL,
    ability,
    relatedAbilityList: [],
    channeled: false,
    castTime: 0,
    startTime: 0,
    duration: 0,
    descriptionNums: [],
    endTime: 0,
    effectList: [],
    effectEndTimes: [],
    stackCount: 0,
    lastEffectTime: 0,
    targetOut: false,
    fake: true,
    saved: false,
    flags: {
      forArea: false,
      forEnemy: false,
      forGround: false,
      forSelf: false,
      forTank: false,
      shifted: false,
      onlyOneTarget: false,
    },
    data: {},
  }
}

function resolveMainBarAction(
  slotNum: number,
  hotbarCategory: number
): { action: Action; abilityId: number } | undefined {
  const slotAbility = readSlotAbility(slotNum, hotbarCategory)
  if (slotAbility === undefined) {
    return undefined
  }
  const abilityId = slotAbility.id

  let action: Action | undefined
  for (const candidate of STATE.idActionMap.values()) {
    if (candidate.hotbarCategory === hotbarCategory && candidate.slotNum === slotNum) {
      action = candidate
      break
    }
  }
  if (action !== undefined && !matchesAbility(action.ability, slotAbility, false)) {
    action = undefined
  }

  if (action === undefined) {
    action = STATE.idActionMap.get(abilityId)
    if (action === undefined) {
      for (const candidate of STATE.idActionMap.values()) {
        if (matchesAbility(candidate.ability, slotAbility, false)) {
          action = candidate
          break
        }
      }
    }
  }

  if (action === undefined) {
    return undefined
  }
  return { action, abilityId }
}

function renderMainBar(
  now: number,
  mounted: boolean,
  settings: BarSettings,
  hotbarCategory: number,
  showedActionMap: Map<number, Action>
): undefined {
  for (let slotNum = 3; slotNum <= 8; slotNum = slotNum + 1) {
    const resolved = resolveMainBarAction(slotNum, hotbarCategory)
    let widget = mainBarWidgetMap.get(slotNum)
    if (resolved !== undefined) {
      const action = getNewest(resolved.action)
      action.flags.shifted = false
      showedActionMap.set(action.ability.id, action)
      showedActionMap.set(resolved.abilityId, action)
      if (widget === undefined) {
        widget = newWidget(slotNum, false, 0, settings)
        mainBarWidgetMap.set(slotNum, widget)
      }
      widgetUpdateWithAction(widget, action, buildActionCtx(action, now, mounted), settings)
    } else if (widget !== undefined) {
      widgetHide(widget)
    }
  }
  return undefined
}

function renderQuickslot(now: number, mounted: boolean, settings: BarSettings): undefined {
  if (!settings.barShowInQuickslot) {
    return undefined
  }
  const [remain, duration, global] = GetSlotCooldownInfo(
    GetCurrentQuickslot(),
    HOTBAR_CATEGORY_QUICKSLOT_WHEEL
  )
  if (remain > 0 && global !== true) {
    if (quickslotWidget === undefined) {
      quickslotWidget = newWidget(QUICKSLOT_SLOT_NUM, false, 0, settings)
    }
    if (quickslotFakeAction === undefined) {
      quickslotFakeAction = newQuickslotFakeAction()
    }
    const fake = quickslotFakeAction
    fake.startTime = now + remain - duration
    fake.duration = duration
    fake.endTime = now + remain
    const ctx: DurationCtx = { now, mounted, cruxFallback: undefined }
    widgetUpdateWithAction(quickslotWidget, fake, ctx, settings)
  } else if (quickslotWidget !== undefined) {
    widgetHide(quickslotWidget)
  }
  return undefined
}

function onCoreUpdate(this: void, now: number): undefined {
  const settings = getBarSettings()
  if (!settings.barEnabled) {
    return undefined
  }
  const mounted = IsMounted()
  const hotbarCategory = getActiveHotbarCategory()
  const showedActionMap = new Map<number, Action>()

  renderMainBar(now, mounted, settings, hotbarCategory, showedActionMap)

  for (const widget of shiftedBarWidgetMap.values()) {
    widgetHide(widget)
  }
  for (const widget of appendedBarWidgetMap.values()) {
    widgetHide(widget)
  }

  renderQuickslot(now, mounted, settings)

  let anyShifted = false
  if (settings.barShowShift) {
    const toShow = collectShiftActions(showedActionMap, hotbarCategory, now, mounted)
    anyShifted = renderShiftPass(
      toShow,
      now,
      mounted,
      settings,
      shiftedBarWidgetMap,
      appendedBarWidgetMap
    )
  }

  SHIFT_ACTIVE = anyShifted
  return undefined
}

export function registerBar(this: void): undefined {
  const settings = getBarSettings()
  if (!settings.barEnabled) {
    return undefined
  }
  onEngineUpdate(onCoreUpdate)
  return undefined
}
