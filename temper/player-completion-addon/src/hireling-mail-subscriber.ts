import { ADDON_NAME } from "./constants"
import { HIRELING_MAILS_DAILY_TARGET, nextHirelingMailCount } from "./hireling-mail-count"
import { getSavedVariables } from "./saved-variables"
import { scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { getEsoDateString } from "./tracking/daily-writs"

const HIRELING_MAIL_LOOTED_CALLBACK = "Temper_HirelingMailLooted"

function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

function onHirelingMailLooted(this: void, delta: unknown): undefined {
  if (!isNumber(delta) || delta <= 0) return
  const sv = getSavedVariables()
  const today = getEsoDateString(GetTimeStamp())
  sv.hirelingMails = nextHirelingMailCount(sv.hirelingMails, today, delta)
  d(`[${ADDON_NAME}] Hireling mail ${sv.hirelingMails.count}/${HIRELING_MAILS_DAILY_TARGET} today`)
  scheduleTaskAutoCompletionCheck()
}

export function registerHirelingMailSubscriber(): undefined {
  CALLBACK_MANAGER.RegisterCallback(HIRELING_MAIL_LOOTED_CALLBACK, onHirelingMailLooted)
}
