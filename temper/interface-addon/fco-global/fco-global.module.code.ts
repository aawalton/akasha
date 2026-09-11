import { switchBankMenuBarDescriptor } from "akasha/temper/interface-addon/fco-bank/fco-bank.module.code.ts"
import { toggleGroupElectionAutoDecline } from "akasha/temper/interface-addon/fco-group/fco-group.module.code.ts"
import { scrollScrollList } from "akasha/temper/interface-addon/fco-inventory-scrollbar/fco-inventory-scrollbar.module.code.ts"
import { keybinds } from "akasha/temper/interface-addon/fco-keybinds/fco-keybinds.module.code.ts"
import { openLAMAddonSettings } from "akasha/temper/interface-addon/fco-mainmenu/fco-mainmenu.module.code.ts"
import { playerPinPingPong } from "akasha/temper/interface-addon/fco-map/fco-map.module.code.ts"
import { muteSFXSound } from "akasha/temper/interface-addon/fco-sounds/fco-sounds.module.code.ts"
import { togglePromotionalEventTrackerUi } from "akasha/temper/interface-addon/fco-ui/fco-ui.module.code.ts"

globalThis.TemperFCOChangeStuff = {
  openLAMAddonSettings,
  playerPinPingPong,
  keybinds,
  muteSFXSound,
  toggleGroupElectionAutoDecline,
  switchBankMenuBarDescriptor,
  TogglePromotionalEventTrackerUI: togglePromotionalEventTrackerUi,
  ScrollScrollList: scrollScrollList,
}
