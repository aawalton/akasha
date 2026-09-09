import { STATE } from "../fco-state/fco-state.module.code.ts"

export type MailFieldType = "recipients" | "subjects" | "texts"

export const MAIL_SEND_EDIT_FIELDS: Readonly<Record<MailFieldType, MailEditControl>> = {
  recipients: ZO_MailSendToField,
  subjects: ZO_MailSendSubjectField,
  texts: ZO_MailSendBodyField,
}

export interface MailEditControl extends EditControl {
  _type?: MailFieldType
}

export interface LsmContextMenuOptions {
  visibleRowsDropdown: number
  visibleRowsSubmenu: number
  minDropdownWidth: number
  sortEntries: boolean
  enableFilter: boolean
  headerCollapsible: boolean
  submenuOpenToSide?: string | undefined
}

export const LSM_CONTEXT_MENU_DEFAULT_OPTIONS: LsmContextMenuOptions = {
  visibleRowsDropdown: 20,
  visibleRowsSubmenu: 15,
  minDropdownWidth: 200,
  sortEntries: false,
  enableFilter: true,
  headerCollapsible: true,
  submenuOpenToSide: "left",
}

export const LSM_CONTEXT_MENU_SETTINGS_DEFAULT_OPTIONS: LsmContextMenuOptions = {
  visibleRowsDropdown: 20,
  visibleRowsSubmenu: 15,
  minDropdownWidth: 200,
  sortEntries: false,
  enableFilter: true,
  headerCollapsible: true,
}

const FAVORITE_ICON = "EsoUI/Art/Inventory/inventory_tabIcon_quickslot_up.dds"
const PROFILES_ICON = "/esoui/art/campaign/gamepad/gp_bonusicon_scrolls.dds"
const favoriteIconStr = zo_iconTextFormatNoSpace(FAVORITE_ICON, 24, 24, "", true)

export const favoriteText = `|cFFD700${favoriteIconStr}|rFavorites`
const ADD_AS_FAVORITE_PREFIX = `+|c00FF00Add|r |cFFFFFF`
const addAsFavoriteSuffix = `|r |c00FF00as|r |cFFD700${favoriteIconStr}|rfavorite`
const DELETE_FAVORITE_PREFIX = `-|cFF0000Delete|r |cFFFFFF`
const deleteFavoriteSuffix = `|r |cFF0000from|r |cFFD700${favoriteIconStr}|rfavorite`
const DELETE_CURRENT_FAVORITE_PREFIX = `-|cFF0000Delete current|r |cFFFFFF`
const deleteCurrentFavoriteSuffix = `|r |cFF0000from|r |cFFD700${favoriteIconStr}|rfavorite`

export const profilesText = `|cFFD700${zo_iconTextFormatNoSpace(PROFILES_ICON, 24, 24, "|rProfiles", true)}`
const profilesIconBare = zo_iconTextFormatNoSpace(PROFILES_ICON, 24, 24, "", true)
const ADD_AS_PROFILE_PREFIX = `+|c00FF00Add as profile|r |cFFFFFF`
const addAsProfileSuffix = `|cFFD700${profilesIconBare}|r`
const DELETE_PROFILE_PREFIX = `-|cFF0000Delete profile|r |cFFFFFF`
const deleteProfileSuffix = `|cFFD700${profilesIconBare}|r`

function quoteValue(this: void, value: string): string {
  return `"${value}"`
}

export function addAsFavoriteString(this: void, value: string): string {
  return `${ADD_AS_FAVORITE_PREFIX}${quoteValue(value)}${addAsFavoriteSuffix}`
}
export function deleteFavoriteString(this: void, value: string): string {
  return `${DELETE_FAVORITE_PREFIX}${quoteValue(value)}${deleteFavoriteSuffix}`
}
export function deleteCurrentFavoriteString(this: void, value: string): string {
  return `${DELETE_CURRENT_FAVORITE_PREFIX}${quoteValue(value)}${deleteCurrentFavoriteSuffix}`
}
export function addAsProfileString(this: void, value: string): string {
  return `${ADD_AS_PROFILE_PREFIX}${quoteValue(value)}${addAsProfileSuffix}`
}
export function deleteProfileString(this: void, value: string): string {
  return `${DELETE_PROFILE_PREFIX}${quoteValue(value)}${deleteProfileSuffix}`
}

export const MAX_LAST_SAVED_ENTRIES = 25

export const UNIQUE_SAVE_MAIL_VALUES_UPDATER_NAME = "FCOCS_saveMailUpdater"

export const MAIL_FAVORITES_SAVED_LOWER: Record<string, Record<string, boolean | undefined>> = {}
export const MAIL_TEXTS_SAVED_LOWER: Record<string, Record<string, boolean | undefined>> = {}

export const allowedMailContextMenuOwners = new LuaTable<object, boolean>()

export const MAIL_CONTEXT_MENU_BUTTONS: Record<string, Control | undefined> = {}

export interface MailProfileData {
  _name?: string
  recipient?: string
  subject?: string
  text?: string
}

export interface MailSettings {
  mailContextMenus?: boolean
  mailFavorites: Record<string, boolean>
  mailFavoritesSaved: Record<string, string[]>
  mailTextsSaved: Record<string, string[]>
  mailLastUsed: Record<string, string>
  mailProfiles: MailProfileData[]
  overwriteMailFields: Record<string, boolean>
  saveMailFields: Record<string, boolean>
  autoLoadMailFields: Record<string, boolean>
  autoLoadMailFieldsAt: { mailOpen: Record<string, boolean>; mailWasSend: Record<string, boolean> }
  splitMailFavoritesIntoAlphabet?: boolean
  mailFavoritesContextMenusAtEditFields?: boolean
  mailLastUsedContextMenusAtEditFields?: boolean
  enableMailProfiles?: boolean
  mailContextMenuSubmenusForceOpenToTheLeft?: boolean
  mailDeleteDelay?: number
}

function isMailSettings(this: void, value: unknown): value is MailSettings {
  return type(value) === "table"
}

export function getMailSettings(this: void): MailSettings {
  const settings: unknown = STATE.settingsVars.settings
  if (isMailSettings(settings)) {
    return settings
  }
  error("FCOCS mail: settings table missing")
}

const ARROW_STR = " |u16:0::|u"

export function cleanSubMenuLabelText(this: void, labelTextWithArrow: string): string {
  const [result] = string.gsub(labelTextWithArrow, ARROW_STR, "")
  return result
}

export function mailTextShortener(this: void, entryData: string): string {
  const stringLength = string.len(entryData)
  if (stringLength > 50) {
    return `${string.sub(entryData, 1, 50)}...`
  }
  const [lineBreakPos] = string.find(entryData, "\n", 1, false)
  if (lineBreakPos !== undefined && lineBreakPos > 1) {
    if (stringLength > 10) {
      return `${string.sub(entryData, 1, lineBreakPos - 1)} <line break>...`
    }
  }
  return entryData
}

export function checkIfTabNeedsToBeTruncated(
  this: void,
  tabToCheck: unknown[],
  maxEntries: number
): undefined {
  const numEntries = tabToCheck.length
  if (numEntries > maxEntries) {
    for (let idx = maxEntries + 1; idx <= numEntries; idx++) {
      tabToCheck[idx - 1] = undefined
    }
  }
}

export function isStringValue(this: void, value: unknown): value is string {
  return type(value) === "string"
}

export function isNumberValue(this: void, value: unknown): value is number {
  return type(value) === "number"
}

export function isMailFieldType(this: void, key: string): key is MailFieldType {
  return key === "recipients" || key === "subjects" || key === "texts"
}

export function validateTextField(
  this: void,
  fieldType: MailFieldType,
  textToValidate: unknown,
  doNotAllowEmpty?: boolean
): boolean {
  const noEmpty = doNotAllowEmpty ?? false
  if (!isStringValue(textToValidate)) {
    return false
  }
  const text = textToValidate
  if (text === "") {
    return !noEmpty
  }
  if (fieldType === "recipients") {
    if (text === "@") {
      return false
    }
  }
  return true
}

export function getEditBoxByFieldType(
  this: void,
  fieldType: MailFieldType
): MailEditControl | undefined {
  return MAIL_SEND_EDIT_FIELDS[fieldType]
}

export function isAnyFavoriteSettingEnabled(this: void): boolean {
  const settingsFavorites = getMailSettings().mailFavorites
  for (const [, isEnabled] of pairs(settingsFavorites)) {
    if (isEnabled === true) {
      return true
    }
  }
  return false
}
