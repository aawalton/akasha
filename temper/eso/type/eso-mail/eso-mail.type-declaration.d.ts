interface MailKeybindDescriptor {
  keybind?: string
  name?: string | ((this: void, descriptor: MailKeybindDescriptor) => string | undefined)
}

interface MailInbox {
  selectionKeybindStripDescriptor?: MailKeybindDescriptor[]
}

declare const MAIL_INBOX: MailInbox | undefined

declare const ZO_MailSendToField: EditControl
declare const ZO_MailSendSubjectField: EditControl
declare const ZO_MailSendBodyField: EditControl

interface MailSendCurrencyControl extends Control {
  OnBeginInput: () => void
}
declare const ZO_MailSendSendCurrency: MailSendCurrencyControl

interface MailInbox {
  GetOpenMailId: (this: MailInbox) => number | undefined
}

interface MailInbox {
  RefreshAttachmentSlots?: (this: MailInbox) => undefined
  GetMailData: (this: MailInbox, mailId: Id64, isMailFromGuild: boolean) => MailData
  attachmentSlots?: Record<number, Control | undefined>
  isMailFromGuild?: boolean
}

interface MailInbox {
  masterList?: Array<Record<string, unknown>>
  mailId?: Id64
}
