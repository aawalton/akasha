import { requireAt } from "@akasha/utils-narrow/require-at"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { formatItemList } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
export interface MailCandidate {
  bagId: number
  slotIndex: number
  recipient: string
  itemLink: string
}

export function extractMailRecipient(destination: string): string | undefined {
  if (destination.startsWith("mail:")) {
    const handle = destination.slice("mail:".length)
    if (handle.length > 0) return handle
  }
  return undefined
}

export function onOpenMailbox(): undefined {
  const candidates: MailCandidate[] = []
  let skipped = 0

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "mail") return
    if (destination === undefined) {
      skipped++
      return
    }

    const recipient = extractMailRecipient(destination)
    if (recipient === undefined) {
      skipped++
      return
    }

    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) {
      clearPendingAction(bagId, slotIndex)
      return
    }

    if (!CanQueueItemAttachment(bagId, slotIndex, 1)) {
      skipped++
      return
    }

    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
    candidates.push({ bagId, slotIndex, recipient, itemLink })
  })

  if (candidates.length === 0) {
    if (skipped > 0) {
      d(`[${ADDON_NAME}] No items to mail (${skipped} skipped — no destination or not attachable)`)
    }
    return
  }

  const byRecipient = new LuaMap<string, MailCandidate[]>()
  for (const candidate of candidates) {
    let group = byRecipient.get(candidate.recipient)
    if (!group) {
      group = []
      byRecipient.set(candidate.recipient, group)
    }
    group.push(candidate)
  }

  interface MailBatch {
    recipient: string
    items: MailCandidate[]
  }

  const batches: MailBatch[] = []
  for (const [recipient, items] of byRecipient) {
    let offset = 0
    while (offset < items.length) {
      batches.push({
        recipient,
        items: items.slice(offset, offset + MAIL_MAX_ATTACHED_ITEMS),
      })
      offset += MAIL_MAX_ATTACHED_ITEMS
    }
  }

  let batchIndex = 0
  let totalSent = 0
  let totalSkipped = skipped
  const sentLinks: string[] = []

  function sendNextBatch(): undefined {
    if (batchIndex >= batches.length) {
      printSummary()
      EVENT_MANAGER.UnregisterForEvent(`${ADDON_NAME}_MailSendSuccess`, EVENT_MAIL_SEND_SUCCESS)
      EVENT_MANAGER.UnregisterForEvent(`${ADDON_NAME}_MailSendFailed`, EVENT_MAIL_SEND_FAILED)
      return
    }

    const batch = requireAt(batches, batchIndex, "batches")
    batchIndex++

    let attachSlot = 1
    const batchLinks: string[] = []
    const attached: MailCandidate[] = []

    for (const item of batch.items) {
      const [stackCount] = GetSlotStackSize(item.bagId, item.slotIndex)
      if (stackCount === 0) {
        clearPendingAction(item.bagId, item.slotIndex)
        continue
      }

      if (!CanQueueItemAttachment(item.bagId, item.slotIndex, attachSlot)) {
        totalSkipped++
        continue
      }

      QueueItemAttachment(item.bagId, item.slotIndex, attachSlot)
      batchLinks.push(item.itemLink)
      attached.push(item)
      attachSlot++
    }

    if (attached.length === 0) {
      sendNextBatch()
      return
    }

    EVENT_MANAGER.RegisterForEvent(
      `${ADDON_NAME}_MailSendSuccess`,
      EVENT_MAIL_SEND_SUCCESS,
      function (this: void): undefined {
        for (const item of attached) {
          clearPendingAction(item.bagId, item.slotIndex)
        }
        for (const link of batchLinks) {
          sentLinks.push(link)
        }
        totalSent += attached.length
        sendNextBatch()
      }
    )

    EVENT_MANAGER.RegisterForEvent(
      `${ADDON_NAME}_MailSendFailed`,
      EVENT_MAIL_SEND_FAILED,
      function (this: void): undefined {
        d(`[${ADDON_NAME}] Mail send failed for ${attached.length} item(s) to ${batch.recipient}`)
        EVENT_MANAGER.UnregisterForEvent(`${ADDON_NAME}_MailSendSuccess`, EVENT_MAIL_SEND_SUCCESS)
        EVENT_MANAGER.UnregisterForEvent(`${ADDON_NAME}_MailSendFailed`, EVENT_MAIL_SEND_FAILED)
        printSummary()
      }
    )

    SendMail(batch.recipient, "Temper Inventory", "")
  }

  function printSummary(): undefined {
    const skippedMsg = totalSkipped > 0 ? ` (${totalSkipped} skipped — not attachable)` : ""
    const itemsMsg = sentLinks.length > 0 ? `: ${formatItemList(sentLinks)}` : ""
    d(`[${ADDON_NAME}] Mailed ${totalSent} item(s)${skippedMsg}${itemsMsg}`)
  }

  sendNextBatch()
}
