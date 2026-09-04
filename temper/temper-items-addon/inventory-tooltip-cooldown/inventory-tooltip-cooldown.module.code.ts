import {
  findCooldownGroup,
  getDlcDailyCooldownRemaining,
  isOpenCooldownEnabled,
} from "../inventory-open-cooldown-protection/inventory-open-cooldown-protection.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
export function registerTooltipHook(): undefined {
  const originalSetBagItem = ItemTooltip.SetBagItem

  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ): undefined {
    originalSetBagItem.call(this, bagId, slotIndex, displayFlags)

    if (!isOpenCooldownEnabled()) return

    const group = findCooldownGroup(bagId, slotIndex)
    if (group) {
      const sv = getSavedVariables()
      const expiry = sv.openCooldowns?.[group.key]
      const now = GetTimeStamp()
      if (expiry === undefined || now >= expiry) return
      const remaining = expiry - now
      const formatted = ZO_FormatTime(
        remaining,
        TIME_FORMAT_STYLE_DESCRIPTIVE_SHORT,
        TIME_FORMAT_PRECISION_SECONDS,
        TIME_FORMAT_DIRECTION_DESCENDING
      )
      this.AddLine(
        `|cFF4444Cooldown: ${formatted}|r`,
        "",
        1,
        1,
        1,
        BOTTOM,
        MODIFY_TEXT_TYPE_NONE,
        TEXT_ALIGN_CENTER,
        true
      )
      return
    }

    const dlcRemaining = getDlcDailyCooldownRemaining(bagId, slotIndex)
    if (dlcRemaining === undefined) return
    const formatted = ZO_FormatTime(
      dlcRemaining,
      TIME_FORMAT_STYLE_DESCRIPTIVE_SHORT,
      TIME_FORMAT_PRECISION_SECONDS,
      TIME_FORMAT_DIRECTION_DESCENDING
    )
    this.AddLine(
      `|cFF4444Cooldown: ${formatted}|r`,
      "",
      1,
      1,
      1,
      BOTTOM,
      MODIFY_TEXT_TYPE_NONE,
      TEXT_ALIGN_CENTER,
      true
    )
  }
}
