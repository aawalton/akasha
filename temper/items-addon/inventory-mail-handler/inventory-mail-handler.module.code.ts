import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { patchMailKeybindName } from "../inventory-mail-keybind-patch/inventory-mail-keybind-patch.module.code.ts"
import {
  HIRELING_CATEGORY,
  type MailHeader,
  type MailSourceCategory,
} from "../inventory-mail-source-category/inventory-mail-source-category.module.code.ts"
export type MailHandlerState = "idle" | "waiting-response"

export const MAX_TAKE_PASSES = 25

export const RESPONSE_TIMEOUT_MS = 3000

export let state: MailHandlerState = "idle"
export let pendingCount = 0
export let matchCount = 0
export let takePasses = 0
export let activeCategory: MailSourceCategory | undefined = undefined

export const RESPONSE_EVENT = ADDON_NAME + "_MailTakeAllResponse"
export const INBOX_UPDATE_EVENT = ADDON_NAME + "_MailInboxUpdate"
export const CLOSE_EVENT = ADDON_NAME + "_MailboxClosed"
export const RESPONSE_TIMEOUT_UPDATE = ADDON_NAME + "_MailTakeAllTimeout"

export type TakeAllDecision = "take" | "finish"

export function decideAfterResponse(
  succeeded: boolean,
  canTakeMore: boolean,
  passes: number,
  maxPasses: number
): TakeAllDecision {
  if (!succeeded) return "finish"
  if (passes >= maxPasses) return "finish"
  if (!canTakeMore) return "finish"
  return "take"
}

export function parseMailHeader(mailId: Id64): MailHeader {
  const [
    senderDisplayName,
    ,
    subject,
    ,
    ,
    fromSystem,
    fromCustomerService,
    returned,
    numAttachments,
    attachedMoney,
    codAmount,
    ,
    ,
    category,
  ] = GetMailItemInfo(mailId)
  return {
    senderDisplayName,
    subject,
    fromSystem,
    fromCustomerService,
    returned,
    numAttachments,
    attachedMoney,
    codAmount,
    category,
  }
}

export function countCategoryMatches(category: MailSourceCategory): number {
  let count = 0
  const total = GetNumMailItemsByCategory(category.scanCategory)
  for (let index = 1; index <= total; index++) {
    const mailId = GetMailIdByIndex(category.scanCategory, index)
    if (category.matches(parseMailHeader(mailId))) {
      count++
    }
  }
  return count
}

export function tryTakeAll(this: void): undefined {
  if (state !== "idle") return
  const category = activeCategory
  if (category === undefined) return

  if (takePasses >= MAX_TAKE_PASSES) {
    finishSession()
    return
  }
  if (!CanTryTakeAllMailAttachmentsInCategory(category.scanCategory, true)) {
    if (takePasses > 0) finishSession()
    return
  }

  pendingCount = countCategoryMatches(category)
  takePasses++
  state = "waiting-response"
  patchMailKeybindName()
  TakeAllMailAttachmentsInCategory(category.scanCategory, true)
  EVENT_MANAGER.RegisterForUpdate(
    RESPONSE_TIMEOUT_UPDATE,
    RESPONSE_TIMEOUT_MS,
    function (this: void): undefined {
      EVENT_MANAGER.UnregisterForUpdate(RESPONSE_TIMEOUT_UPDATE)
      if (state === "waiting-response") {
        matchCount += pendingCount
        pendingCount = 0
        finishSession()
      }
    }
  )
}

export function onTakeAllResponse(
  this: void,
  _event: number,
  result: MailTakeAttachmentResult,
  _category: MailCategory,
  _headersRemoved: boolean
): undefined {
  if (state !== "waiting-response") return
  EVENT_MANAGER.UnregisterForUpdate(RESPONSE_TIMEOUT_UPDATE)
  const category = activeCategory
  const succeeded = result === MAIL_TAKE_ATTACHMENT_RESULT_SUCCESS
  if (succeeded) {
    matchCount += pendingCount
  }
  pendingCount = 0
  state = "idle"

  const canTakeMore =
    category !== undefined && CanTryTakeAllMailAttachmentsInCategory(category.scanCategory, true)
  if (decideAfterResponse(succeeded, canTakeMore, takePasses, MAX_TAKE_PASSES) === "take") {
    tryTakeAll()
    return
  }
  finishSession()
}

export function onInboxUpdate(this: void): undefined {
  if (state !== "idle") return
  if (activeCategory === undefined) return
  tryTakeAll()
}

export function finishSession(reason?: string): undefined {
  EVENT_MANAGER.UnregisterForEvent(
    RESPONSE_EVENT,
    EVENT_MAIL_TAKE_ALL_ATTACHMENTS_IN_CATEGORY_RESPONSE
  )
  EVENT_MANAGER.UnregisterForEvent(INBOX_UPDATE_EVENT, EVENT_MAIL_INBOX_UPDATE)
  EVENT_MANAGER.UnregisterForEvent(CLOSE_EVENT, EVENT_MAIL_CLOSE_MAILBOX)
  EVENT_MANAGER.UnregisterForUpdate(RESPONSE_TIMEOUT_UPDATE)

  const count = matchCount
  const category = activeCategory

  state = "idle"
  pendingCount = 0
  matchCount = 0
  takePasses = 0
  activeCategory = undefined

  if (count > 0) {
    d(`[${ADDON_NAME}] Looted ${count} ${category?.id ?? "mail"} mail(s)`)
    category?.onComplete?.(count)
  }
  if (reason !== undefined) {
    d(`[${ADDON_NAME}] ${reason}`)
  }
}

export function beginMailSession(this: void, category: MailSourceCategory): undefined {
  if (state !== "idle" || activeCategory !== undefined) return

  activeCategory = category
  state = "idle"
  pendingCount = 0
  matchCount = 0
  takePasses = 0

  EVENT_MANAGER.RegisterForEvent(
    RESPONSE_EVENT,
    EVENT_MAIL_TAKE_ALL_ATTACHMENTS_IN_CATEGORY_RESPONSE,
    onTakeAllResponse
  )
  EVENT_MANAGER.RegisterForEvent(INBOX_UPDATE_EVENT, EVENT_MAIL_INBOX_UPDATE, onInboxUpdate)
  EVENT_MANAGER.RegisterForEvent(CLOSE_EVENT, EVENT_MAIL_CLOSE_MAILBOX, onMailboxClosed)

  tryTakeAll()
}

export function onMailboxClosed(this: void): undefined {
  if (activeCategory === undefined) return
  finishSession()
}

export function registerMailHandler(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_MailboxOpened",
    EVENT_MAIL_OPEN_MAILBOX,
    function (this: void): undefined {
      beginMailSession(HIRELING_CATEGORY)
    }
  )
}
