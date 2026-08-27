import { switchBankMenuBarDescriptor } from "./bank"
import { toggleGroupElectionAutoDecline } from "./group"
import { ScrollScrollList } from "./inventory-scrollbar"
import { keybinds } from "./keybinds"
import { openLAMAddonSettings } from "./mainmenu"
import { playerPinPingPong } from "./map"
import { muteSFXSound } from "./sounds"
import { TogglePromotionalEventTrackerUI } from "./ui"

export interface TemperFCOChangeStuffGlobal extends Record<string, unknown> {
  openLAMAddonSettings: typeof openLAMAddonSettings
  playerPinPingPong: typeof playerPinPingPong
  keybinds: typeof keybinds
  muteSFXSound: typeof muteSFXSound
  toggleGroupElectionAutoDecline: typeof toggleGroupElectionAutoDecline
  switchBankMenuBarDescriptor: typeof switchBankMenuBarDescriptor
  TogglePromotionalEventTrackerUI: typeof TogglePromotionalEventTrackerUI
  ScrollScrollList: typeof ScrollScrollList
}

declare global {
  var TemperFCOChangeStuff: TemperFCOChangeStuffGlobal
}

globalThis.TemperFCOChangeStuff = {
  openLAMAddonSettings,
  playerPinPingPong,
  keybinds,
  muteSFXSound,
  toggleGroupElectionAutoDecline,
  switchBankMenuBarDescriptor,
  TogglePromotionalEventTrackerUI,
  ScrollScrollList,
}
