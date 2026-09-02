import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_AUTHOR, ADDON_VERSION, ADDON_WEBSITE, PANEL_ID, SLASH_COMMAND } from "../constants"
import { buildDialogSections } from "./section-dialogs"
import { buildMessageSections } from "./section-messages"
import { buildWorldSections } from "./section-world"
import { buildGuildSubmenus } from "./submenus"

export function buildSettingsMenu(this: void): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "No, thank you!",
    author: ADDON_AUTHOR,
    version: ADDON_VERSION,
    slashCommand: SLASH_COMMAND,
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
  }

  const optionsData: LamControlData[] = [
    ...buildMessageSections(),
    ...buildDialogSections(),
    ...buildWorldSections(),
    ...buildGuildSubmenus(),
  ]

  registerPanel(LibAddonMenu2, PANEL_ID, panelData, optionsData)
}
