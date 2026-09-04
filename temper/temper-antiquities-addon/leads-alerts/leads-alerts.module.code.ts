import { ACTIVITY_ID_TO_ANTIQUITY_ID } from "../leads-activity-map/leads-activity-map.module.code.ts"
import {
  BLUE_TEXT_HEX,
  GREEN_TEXT_HEX,
  ORANGE_TEXT_HEX,
  RED_TEXT_HEX,
  YELLOW_TEXT_HEX,
} from "../leads-colors/leads-colors.module.code.ts"
import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"
import { getPledgeDungeons } from "../leads-undaunted/leads-undaunted.module.code.ts"

let alertsTooltipMessages: string[] = []

export function getAlertsTooltipMessages(): string[] {
  return alertsTooltipMessages
}

function getAlertsColor(d7: number, d1: number, h1: number, udc: number): string {
  if (h1 > 0) {
    return RED_TEXT_HEX
  }
  if (d1 > 0) {
    return ORANGE_TEXT_HEX
  }
  if (udc > 0) {
    return BLUE_TEXT_HEX
  }
  if (d7 > 0) {
    return YELLOW_TEXT_HEX
  }
  return GREEN_TEXT_HEX
}

export function setAlerts(d7: number, d1: number, h1: number): undefined {
  const messages: string[] = []
  alertsTooltipMessages = messages
  messages.push(string.format(STRINGS.TOOLTIP_ALERTS_1HOUR, h1))
  messages.push(string.format(STRINGS.TOOLTIP_ALERTS_1DAY, d1))
  messages.push(string.format(STRINGS.TOOLTIP_ALERTS_7DAYS, d7))

  const pledgeDungeons = getPledgeDungeons()
  if (pledgeDungeons !== undefined) {
    let udc = 0
    for (const dungeon of pledgeDungeons) {
      const daid = ACTIVITY_ID_TO_ANTIQUITY_ID[dungeon.GetNormalId()]
      if (daid !== undefined) {
        const haveLead = DoesAntiquityHaveLead(daid)
        const antiquityName = GetAntiquityName(daid)
        const setId = GetAntiquitySetId(daid)
        const setName = GetAntiquitySetName(GetAntiquitySetId(daid))
        const numRecovered = GetNumAntiquitiesRecovered(daid)
        const repeatable = IsAntiquityRepeatable(daid)
        if (repeatable || (numRecovered === 0 && !haveLead)) {
          if (setId > 0) {
            messages.push(string.format("%s : %s", dungeon.GetName(), setName))
          } else {
            messages.push(string.format("%s : %s", dungeon.GetName(), antiquityName))
          }
          if (haveLead && repeatable) {
            messages.push(STRINGS.TOOLTIP_ALERTS_UD_SCRYFIRST)
          }
          udc = udc + 1
        }
      }
    }
    if (udc === 0) {
      messages.push(STRINGS.TOOLTIP_ALERTS_UD_NONEFOUND)
    }
    const color = getAlertsColor(d7, d1, h1, udc)
    TemperLeadsMainWindowTitleAlerts.SetText(
      string.format(STRINGS.LABEL_ALERTS, color, d7, d1, h1, udc)
    )
  } else {
    for (const line of STRINGS.TOOLTIP_ALERTS_UD_MISSING) {
      messages.push(line)
    }
    const color = getAlertsColor(d7, d1, h1, 0)
    TemperLeadsMainWindowTitleAlerts.SetText(
      string.format(STRINGS.LABEL_ALERTS_UD_MISSING, color, d7, d1, h1)
    )
  }
}
