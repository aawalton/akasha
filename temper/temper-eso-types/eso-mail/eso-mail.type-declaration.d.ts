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
