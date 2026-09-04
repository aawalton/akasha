interface EsoInventorySlotData {
  bagId: number
  slotIndex: number
  name?: string
  stackCount?: number
  researchAssistant?: string
  dataEntry?: { isHeader?: boolean }
}
interface EsoInventorySlot {
  data: EsoInventorySlotData
}
interface EsoInventoryContainer {
  data: EsoInventorySlot[]
}

declare const ZO_PlayerInventoryBackpack: EsoInventoryContainer
declare const ZO_PlayerBankBackpack: EsoInventoryContainer
declare const ZO_HouseBankBackpack: EsoInventoryContainer
declare const ZO_SmithingTopLevelDeconstructionPanelInventoryBackpack: EsoInventoryContainer

declare const BANK_FRAGMENT: SceneFragment

interface EsoMailEditControl {
  SetText: (this: EsoMailEditControl, text: string) => void
  GetText: (this: EsoMailEditControl) => string | undefined
}
interface EsoMailSend {
  to: EsoMailEditControl
  subject: EsoMailEditControl
  Send: (this: EsoMailSend) => void
  staticKeybindStripDescriptor: KeybindButtonGroupDescriptor[]
}
declare const MAIL_SEND: EsoMailSend
