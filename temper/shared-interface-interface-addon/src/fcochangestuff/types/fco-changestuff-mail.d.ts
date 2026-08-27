declare function zo_getSafeId64Key(this: void, id64: Id64): string

interface MailInbox {
  masterList?: Array<Record<string, unknown>>
  mailId?: Id64
}

declare const ZO_MailInbox: Control
declare const ZO_MailSend: Control

declare function ZO_Dialogs_IsDialogRegistered(this: void, name: string): boolean
declare function ZO_Dialogs_IsShowingDialog(this: void): boolean
declare function ZO_Dialogs_GetEditBoxText(this: void, dialog: unknown): string | undefined

interface ZO_DialogInfo {
  editBox?: Record<string, unknown>
  noChoiceCallback?: (this: void) => void
}

declare const LSM_ENTRY_TYPE_HEADER: number
declare const LSM_ENTRY_TYPE_DIVIDER: number
declare const LSM_ENTRY_TYPE_NORMAL: number
declare const LSM_ENTRY_TYPE_CHECKBOX: number
declare const LSM_ENTRY_TYPE_SUBMENU: number

interface MailBuddyGlobal {
  settingsVars: {
    settings?: {
      SetRecipient?: string[]
      SetSubject?: string[]
    }
  }
}
declare const MailBuddy: MailBuddyGlobal | undefined
declare const MailBuddy_SavedVars: object | undefined
