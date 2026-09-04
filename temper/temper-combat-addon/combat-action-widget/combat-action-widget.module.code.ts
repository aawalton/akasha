import type { Cooldown } from "@akasha/temper-combat-addon/combat-action-cooldown"
import {
  cooldownHide,
  cooldownStart,
  newCooldown,
} from "@akasha/temper-combat-addon/combat-action-cooldown"
import {
  bracketLowPriority,
  formatRemainLabel,
  needEndingAlert,
} from "@akasha/temper-combat-addon/combat-action-display"
import type { DurationCtx } from "@akasha/temper-combat-addon/combat-action-duration"
import {
  getDuration,
  getEndTime,
  optEffect,
} from "@akasha/temper-combat-addon/combat-action-duration"
import { getLabelFont, getStackLabelFont } from "@akasha/temper-combat-addon/combat-action-fonts"
import { getActiveHotbarCategory } from "@akasha/temper-combat-addon/combat-action-slots"
import { resolveStackLabels } from "@akasha/temper-combat-addon/combat-action-stack-labels"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"
import type { BarSettings } from "@akasha/temper-combat-addon/combat-actions-saved-variables"

const QUICKSLOT_SLOT_NUM = 9

const SHIFT_FRAME_TEXTURE = "esoui/art/actionbar/abilityframe64_up.dds"

const SHIFT_BACKGROUND_INSET = 2

export interface Widget {
  slotNum: number
  shifted: boolean
  appendIndex: number
  visible: boolean
  backdrop?: TextureControl
  background?: TextureControl
  label?: LabelControl
  stackLabel?: LabelControl
  stackLabel2?: LabelControl
  cooldown: Cooldown
}

function resolveSlotControl(slotNum: number): Control | undefined {
  const hotbarCategory = slotNum > 8 ? HOTBAR_CATEGORY_QUICKSLOT_WHEEL : getActiveHotbarCategory()
  const button = ZO_ActionBar_GetButton(slotNum, hotbarCategory)
  if (button === undefined) {
    return undefined
  }
  return button.slot
}

function getSlotBaseSize(): number {
  const button = ZO_ActionBar_GetButton(3)
  if (button === undefined) {
    return 50
  }
  const [, height] = button.slot.GetDimensions()
  return height
}

function buildShiftBackdrop(
  slot: Control,
  appendIndex: number,
  settings: BarSettings
): { backdrop: TextureControl; background: TextureControl } {
  const offsetX = settings.barShiftOffsetX
  const offsetY = settings.barShiftOffsetY
  const baseSize = getSlotBaseSize()
  const backdrop = WINDOW_MANAGER.CreateControl(undefined, slot, CT_TEXTURE)
  if (settings.barShowShiftScalePercent < 100) {
    backdrop.SetScale(settings.barShowShiftScalePercent / 100)
  }
  backdrop.SetDrawLayer(DL_BACKGROUND)
  backdrop.SetAnchor(BOTTOM, slot, TOP, offsetX + (appendIndex - 1) * (baseSize + 5), offsetY)
  backdrop.SetDimensions(baseSize, baseSize)
  backdrop.SetTexture(SHIFT_FRAME_TEXTURE)

  const background = WINDOW_MANAGER.CreateControl(undefined, backdrop, CT_TEXTURE)
  const inset = SHIFT_BACKGROUND_INSET
  background.SetAnchor(TOPLEFT, backdrop, TOPLEFT, inset, inset)
  background.SetAnchor(BOTTOMRIGHT, backdrop, BOTTOMRIGHT, -inset, -inset)
  return { backdrop, background }
}

function buildLabel(
  parent: Control,
  slotIcon: Control,
  slotNum: number,
  shifted: boolean,
  settings: BarSettings
): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  label.SetFont(getLabelFont(settings))
  label.SetColor(1, 1, 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  label.SetVerticalAlignment(TEXT_ALIGN_BOTTOM)
  label.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  if (slotNum === QUICKSLOT_SLOT_NUM) {
    label.SetAnchor(TOPLEFT, slotIcon, TOPLEFT, 5, 3)
    label.SetDrawTier(DT_HIGH)
  } else {
    const yOffset = shifted ? -settings.barLabelYOffsetInShift + 1 : -settings.barLabelYOffset + 3
    label.SetAnchor(BOTTOM, parent, BOTTOM, 0, yOffset)
  }
  return label
}

function buildStackLabel(parent: Control, shifted: boolean, settings: BarSettings): LabelControl {
  const stackLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  stackLabel.SetFont(getStackLabelFont(settings))
  stackLabel.SetColor(1, 1, 1)
  stackLabel.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  stackLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
  stackLabel.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  const yOffset = shifted
    ? -settings.barStackLabelYOffsetInShift + 2
    : -settings.barStackLabelYOffset + 0
  stackLabel.SetAnchor(TOPRIGHT, parent, TOPRIGHT, -5, yOffset)
  return stackLabel
}

function buildStackLabel2(parent: Control, shifted: boolean, settings: BarSettings): LabelControl {
  const stackLabel2 = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  stackLabel2.SetFont(getStackLabelFont(settings))
  stackLabel2.SetColor(1, 1, 1)
  stackLabel2.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  stackLabel2.SetVerticalAlignment(TEXT_ALIGN_TOP)
  stackLabel2.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  const yOffset = shifted
    ? -settings.barStackLabelYOffsetInShift + 2
    : -settings.barStackLabelYOffset + 0
  stackLabel2.SetAnchor(TOPLEFT, parent, TOPLEFT, 5, yOffset)
  return stackLabel2
}

export function newWidget(
  this: void,
  slotNum: number,
  shifted: boolean,
  appendIndex: number,
  settings: BarSettings
): Widget {
  const slot = resolveSlotControl(slotNum)
  const slotIcon = slot?.GetNamedChild("Icon") ?? slot

  let backdrop: TextureControl | undefined
  let background: TextureControl | undefined
  if (shifted && slot !== undefined) {
    const built = buildShiftBackdrop(slot, appendIndex, settings)
    backdrop = built.backdrop
    background = built.background
  }

  const labelParent: Control | undefined = backdrop ?? slotIcon
  let label: LabelControl | undefined
  let stackLabel: LabelControl | undefined
  let stackLabel2: LabelControl | undefined
  if (labelParent !== undefined && slotIcon !== undefined) {
    label = buildLabel(labelParent, slotIcon, slotNum, shifted, settings)
    stackLabel = buildStackLabel(labelParent, shifted, settings)
    stackLabel2 = buildStackLabel2(labelParent, shifted, settings)
  }

  const cooldownParent: Control = backdrop ?? slot ?? slotIcon ?? GuiRoot
  const cooldown = newCooldown(cooldownParent, settings)

  const widget: Widget = {
    slotNum,
    shifted,
    appendIndex,
    visible: true,
    cooldown,
  }
  if (backdrop !== undefined) widget.backdrop = backdrop
  if (background !== undefined) widget.background = background
  if (label !== undefined) widget.label = label
  if (stackLabel !== undefined) widget.stackLabel = stackLabel
  if (stackLabel2 !== undefined) widget.stackLabel2 = stackLabel2
  return widget
}

function resolveBackgroundIcon(action: Action): string {
  return action.ability.icon
}

function renderLabel(
  label: LabelControl,
  action: Action,
  remain: number,
  ctx: DurationCtx,
  settings: BarSettings
): undefined {
  if (!settings.barLabelEnabled) {
    label.SetHidden(true)
    return undefined
  }
  const opt = optEffect(action, ctx)
  if (opt?.levelIsLow) {
    const hint = bracketLowPriority(`${Math.trunc(remain / 1000)}`)
    const c = settings.barLowPriorityLabelColor
    label.SetColor(c[0], c[1], c[2], c[3])
    label.SetText(hint)
    label.SetHidden(false)
    return undefined
  }
  const hint = formatRemainLabel(remain, {
    ignoreDecimal: settings.barLabelIgnoreDecimal,
    ignoreDecimalThreshold: settings.barLabelIgnoreDecimalThreshold,
  })
  const isEnding = needEndingAlert(action) && remain < settings.barCooldownEndingSeconds * 1000
  const c = isEnding ? settings.barLabelEndingColor : settings.barLabelColor
  label.SetColor(c[0], c[1], c[2], c[3])
  label.SetText(hint)
  label.SetHidden(false)
  return undefined
}

function renderStackLabels(
  stackLabel: LabelControl,
  stackLabel2: LabelControl,
  action: Action,
  ctx: DurationCtx,
  settings: BarSettings
): undefined {
  if (!settings.barStackLabelEnabled) {
    stackLabel.SetHidden(true)
    stackLabel2.SetHidden(true)
    return undefined
  }
  const { right, left } = resolveStackLabels(action, ctx)
  const c = settings.barStackLabelColor

  if (right.kind === "hidden") {
    stackLabel.SetHidden(true)
  } else {
    stackLabel.SetText(right.text)
    stackLabel.SetColor(c[0], c[1], c[2], c[3])
    stackLabel.SetHidden(false)
  }

  if (left.kind === "value") {
    stackLabel2.SetText(left.text)
    stackLabel2.SetHidden(false)
  } else {
    stackLabel2.SetHidden(true)
  }
  return undefined
}

function renderCooldown(
  cooldown: Cooldown,
  action: Action,
  remain: number,
  ctx: DurationCtx,
  settings: BarSettings
): undefined {
  if (!settings.barCooldownVisible || remain <= 0) {
    cooldownHide(cooldown)
    return undefined
  }
  const duration = getDuration(action, ctx).duration
  cooldownStart(cooldown, remain, duration, !needEndingAlert(action), settings)
  return undefined
}

export function widgetUpdateWithAction(
  this: void,
  w: Widget,
  action: Action,
  ctx: DurationCtx,
  settings: BarSettings
): undefined {
  w.visible = true
  if (w.backdrop !== undefined) {
    w.backdrop.SetHidden(false)
  }
  if (w.background !== undefined) {
    w.background.SetTexture(resolveBackgroundIcon(action))
    w.background.SetHidden(false)
  }

  const endTime = getEndTime(action, ctx)
  const remain = Math.max(endTime - ctx.now, 0)

  if (w.label !== undefined) {
    renderLabel(w.label, action, remain, ctx, settings)
  }
  if (w.stackLabel !== undefined && w.stackLabel2 !== undefined) {
    renderStackLabels(w.stackLabel, w.stackLabel2, action, ctx, settings)
  }
  renderCooldown(w.cooldown, action, remain, ctx, settings)
  return undefined
}

export function widgetHide(this: void, w: Widget): undefined {
  if (w.backdrop !== undefined) {
    w.backdrop.SetHidden(true)
  }
  if (w.background !== undefined) {
    w.background.SetHidden(true)
  }
  if (w.label !== undefined) {
    w.label.SetHidden(true)
  }
  if (w.stackLabel !== undefined) {
    w.stackLabel.SetHidden(true)
  }
  if (w.stackLabel2 !== undefined) {
    w.stackLabel2.SetHidden(true)
  }
  cooldownHide(w.cooldown)
  w.visible = false
  return undefined
}
