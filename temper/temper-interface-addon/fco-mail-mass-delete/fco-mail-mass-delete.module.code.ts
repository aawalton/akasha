import {
  getMailSettings,
  LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS,
  MAIL_CONTEXT_MENU_BUTTONS,
} from "../fco-mail-data/fco-mail-data.module.code.ts"

interface MailInboxEntry {
  mailId?: Id64
  senderDisplayName?: string
  senderCharacterName?: string
  formattedSubject?: string
  category?: number
  unread?: boolean
  numAttachments?: number
  codAmount?: number
  attachedMoney?: number
}

let MAILS_TO_DELETE: MailInboxEntry[] = []

function resetQueuedMailes(this: void): undefined {
  MAILS_TO_DELETE = []
}

function deleteMailNow(this: void, mailEntryData: MailInboxEntry): undefined {
  const senderSuffix =
    mailEntryData.senderCharacterName !== undefined ? `/${mailEntryData.senderCharacterName}` : ""
  d(
    `[FCOCS]Deleting mail from: ${tostring(mailEntryData.senderDisplayName)}${senderSuffix}, subject: ${tostring(
      mailEntryData.formattedSubject
    )}`
  )
  if (mailEntryData.mailId !== undefined) {
    DeleteMail(mailEntryData.mailId)
  }
}

function deleteQueuedMails(this: void): undefined {
  if (ZO_IsTableEmpty(MAILS_TO_DELETE)) {
    return
  }
  const mailDeleteDelay = getMailSettings().mailDeleteDelay ?? 0
  let delay = 0
  for (const [, mailEntryData] of ipairs(MAILS_TO_DELETE)) {
    if (mailDeleteDelay === 0) {
      deleteMailNow(mailEntryData)
    } else {
      const mailEntryDataCopy = ZO_ShallowTableCopy(mailEntryData)
      zo_callLater(() => {
        deleteMailNow(mailEntryDataCopy)
      }, delay)
      delay = delay + mailDeleteDelay
    }
  }
  resetQueuedMailes()
}

const DO_DEBUG = false

function checkDeleteMailWithCriteria(
  this: void,
  mailEntryData: MailInboxEntry | undefined,
  mailCategory: number,
  isUnread: boolean | undefined,
  maxAttachments?: number,
  maxCODAmount?: number
): boolean {
  if (
    mailEntryData === undefined ||
    mailEntryData.mailId === undefined ||
    mailCategory === undefined ||
    isUnread === undefined
  ) {
    return false
  }
  const maxAtt = maxAttachments ?? 0
  const maxCOD = maxCODAmount ?? 0

  if (DO_DEBUG) {
    d(
      `[FCOCS]Checking mail ID: ${tostring(
        mailEntryData.mailId !== undefined ? zo_getSafeId64Key(mailEntryData.mailId) : undefined
      )}`
    )
  }

  return (
    (mailEntryData.mailId !== undefined &&
      mailEntryData.category === mailCategory &&
      mailEntryData.unread === isUnread &&
      (mailEntryData.numAttachments ?? 0) <= maxAtt &&
      (mailEntryData.codAmount ?? 0) <= maxCOD &&
      mailEntryData.attachedMoney === 0) ||
    false
  )
}

function deleteEmptyPlayerMails(this: void, isUnread: boolean | undefined): undefined {
  resetQueuedMailes()
  if (isUnread === undefined) {
    return
  }
  const mailInbox = MAIL_INBOX
  const masterList = mailInbox !== undefined ? mailInbox.masterList : undefined
  if (masterList === undefined || masterList.length <= 0) {
    return
  }

  let anyMailDeleteWasQueued = false
  for (const [, mailEntryData] of ipairs(masterList)) {
    if (
      checkDeleteMailWithCriteria(mailEntryData, MAIL_CATEGORY_PLAYER_MAIL, isUnread, 0, 0) === true
    ) {
      MAILS_TO_DELETE[MAILS_TO_DELETE.length] = mailEntryData
      anyMailDeleteWasQueued = true
    }
  }

  if (anyMailDeleteWasQueued) {
    deleteQueuedMails()
  }
}

function isAnyMailInInbox(this: void): boolean {
  const masterList = MAIL_INBOX !== undefined ? MAIL_INBOX.masterList : undefined
  return masterList !== undefined && masterList.length > 0
}

export function getMailReceivedMassChangeContextMenu(this: void): undefined {
  ClearCustomScrollableMenu()
  const settings = getMailSettings()
  if (settings.mailContextMenus !== true) {
    return
  }

  AddCustomScrollableMenuHeader("Mass-Change", { doNotFilter: true })
  AddCustomScrollableMenuEntry(
    "Delete read player mails, w/o attachments",
    () => {
      deleteEmptyPlayerMails(false)
    },
    LSM_ENTRY_TYPE_NORMAL,
    undefined,
    { enabled: () => isAnyMailInInbox() }
  )
  AddCustomScrollableMenuEntry(
    "Delete |cFF0000un|rread player mails, w/o attachments",
    () => {
      deleteEmptyPlayerMails(true)
    },
    LSM_ENTRY_TYPE_NORMAL,
    undefined,
    { enabled: () => isAnyMailInInbox() }
  )

  ShowCustomScrollableMenu(
    MAIL_CONTEXT_MENU_BUTTONS["Inbox_MassChange"],
    LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS
  )
}
