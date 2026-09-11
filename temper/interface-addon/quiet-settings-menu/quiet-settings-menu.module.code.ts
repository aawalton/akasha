import {
  ADDON_AUTHOR,
  ADDON_VERSION,
  ADDON_WEBSITE,
  PANEL_ID,
  SLASH_COMMAND,
} from "akasha/temper/interface-addon/quiet-identity/quiet-identity.module.code.ts"
import { buildDialogSections } from "akasha/temper/interface-addon/quiet-settings-dialogs/quiet-settings-dialogs.module.code.ts"
import { buildGuildSubmenus } from "akasha/temper/interface-addon/quiet-settings-guilds/quiet-settings-guilds.module.code.ts"
import { buildMessageSections } from "akasha/temper/interface-addon/quiet-settings-messages/quiet-settings-messages.module.code.ts"
import { buildWorldSections } from "akasha/temper/interface-addon/quiet-settings-world/quiet-settings-world.module.code.ts"
import { registerPanel } from "akasha/temper/settings-panel/register-panel/register-panel.module.code.ts"

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
