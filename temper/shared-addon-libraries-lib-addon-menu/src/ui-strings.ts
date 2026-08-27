export interface LamStrings {
  PANEL_NAME: string
  AUTHOR: string
  VERSION: string
  WEBSITE: string
  FEEDBACK: string
  TRANSLATION: string
  DONATION: string
  PANEL_INFO_FONT: string
  RELOAD_UI_WARNING: string
  RELOAD_DIALOG_TITLE: string
  RELOAD_DIALOG_TEXT: string
  RELOAD_DIALOG_RELOAD_BUTTON: string
  RELOAD_DIALOG_DISCARD_BUTTON: string
}

export const L: LamStrings = {
  PANEL_NAME: "Addons",
  AUTHOR: string.format("%s: <<X:1>>", GetString(SI_ADDON_MANAGER_AUTHOR)),
  VERSION: "Version: <<X:1>>",
  WEBSITE: "Visit Website",
  FEEDBACK: "Feedback",
  TRANSLATION: "Translation",
  DONATION: "Donate",
  PANEL_INFO_FONT: "$(CHAT_FONT)|14|soft-shadow-thin",
  RELOAD_UI_WARNING: "Changes to this setting require a UI reload in order to take effect.",
  RELOAD_DIALOG_TITLE: "UI Reload Required",
  RELOAD_DIALOG_TEXT:
    "Some changes require a UI reload in order to take effect. Do you want to reload now or discard the changes?",
  RELOAD_DIALOG_RELOAD_BUTTON: "Reload",
  RELOAD_DIALOG_DISCARD_BUTTON: "Discard",
}
