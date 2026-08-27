export function IsThirdAlchemySlotUnlocked(this: void): boolean {
  return ZO_Alchemy_IsThirdAlchemySlotUnlocked()
}

export function AddLine(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color: ZoColorDef,
  alignment: number
): undefined {
  const [r, g, b] = color.UnpackRGB()
  tooltip.AddLine(
    text,
    "",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_NONE,
    alignment,
    alignment !== TEXT_ALIGN_LEFT
  )
}

export function AddLineCenter(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  AddLine(tooltip, text, color ?? ZO_TOOLTIP_DEFAULT_COLOR, TEXT_ALIGN_CENTER)
}

export function AddLineTitle(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  const resolved = color ?? ZO_SELECTED_TEXT
  const [r, g, b] = resolved.UnpackRGB()
  tooltip.AddLine(
    text,
    "ZoFontHeader3",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_UPPERCASE,
    TEXT_ALIGN_CENTER,
    true
  )
}

export function AddLineSubTitle(
  this: void,
  tooltip: TooltipControl,
  text: string,
  color?: ZoColorDef
): undefined {
  const resolved = color ?? ZO_SELECTED_TEXT
  const [r, g, b] = resolved.UnpackRGB()
  tooltip.AddLine(
    text,
    "ZoFontWinH5",
    r,
    g,
    b,
    CENTER,
    MODIFY_TEXT_TYPE_UPPERCASE,
    TEXT_ALIGN_CENTER,
    true
  )
}

export function IsScreenRightHalf(this: void, sender: Control): boolean {
  const [x] = GuiRoot.GetCenter()
  return sender.GetLeft() > x
}

export function IsScreenLowerHalf(this: void, sender: Control): boolean {
  const [, y] = GuiRoot.GetCenter()
  return sender.GetTop() > y
}

export function ShowAnnoucement(this: void, text: string): undefined {
  const message = CENTER_SCREEN_ANNOUNCE.CreateMessageParams(
    CSA_CATEGORY_SMALL_TEXT,
    SOUNDS.QUEST_OBJECTIVE_INCREMENT
  )
  message.SetSound(SOUNDS.QUEST_OBJECTIVE_INCREMENT)
  message.SetText(text)
  message.MarkSuppressIconFrame()
  message.MarkShowImmediately()
  CENTER_SCREEN_ANNOUNCE.QueueMessage(message)
}

export function ClearTooltips(this: void): undefined {
  ClearTooltip(InformationTooltip)
  ClearTooltip(ItemTooltip)
  ClearTooltip(TemperPotionsTooltip)
}
