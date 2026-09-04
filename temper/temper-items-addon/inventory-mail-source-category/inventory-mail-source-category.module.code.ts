export type MailHeader = {
  senderDisplayName: string
  subject: string
  fromSystem: boolean
  fromCustomerService: boolean
  returned: boolean
  numAttachments: number
  attachedMoney: number
  codAmount: number
  category: MailCategory
}

export type MailSourceCategory = {
  id: string
  scanCategory: MailCategory
  matches: (this: void, header: MailHeader) => boolean
  onComplete?: (this: void, count: number) => undefined
}

export const HIRELING_MAIL_LOOTED_CALLBACK = "Temper_HirelingMailLooted"

export const HIRELING_SUBJECTS: readonly string[] = [
  "Raw Enchanter Materials",
  "Raw Clothier Materials",
  "Raw Blacksmith Materials",
  "Raw Woodworker Materials",
  "Raw Provisioner Materials",
]

export function isHirelingMailInfo(
  subject: string,
  numAttachments: number,
  attachedMoney: number,
  codAmount: number
): boolean {
  return (
    attachedMoney === 0 &&
    codAmount === 0 &&
    numAttachments > 0 &&
    HIRELING_SUBJECTS.includes(subject)
  )
}

export const HIRELING_CATEGORY: MailSourceCategory = {
  id: "hireling",
  scanCategory: MAIL_CATEGORY_SYSTEM_MAIL,
  matches: (header: MailHeader): boolean =>
    isHirelingMailInfo(
      header.subject,
      header.numAttachments,
      header.attachedMoney,
      header.codAmount
    ),
  onComplete: (count: number): undefined => {
    CALLBACK_MANAGER.FireCallbacks(HIRELING_MAIL_LOOTED_CALLBACK, count)
  },
}
