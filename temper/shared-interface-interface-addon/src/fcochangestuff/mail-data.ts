import { state } from "./state"

export type MailFieldType = "recipients" | "subjects" | "texts"

export const mailSendEditFields: Readonly<Record<MailFieldType, MailEditControl>> = {
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

export const LSM_contextMenuDefaultOptions: LsmContextMenuOptions = {
  visibleRowsDropdown: 20,
  visibleRowsSubmenu: 15,
  minDropdownWidth: 200,
  sortEntries: false,
  enableFilter: true,
  headerCollapsible: true,
  submenuOpenToSide: "left",
}

export const LSM_contextMenuSettingsDefaultOptions: LsmContextMenuOptions = {
  visibleRowsDropdown: 20,
  visibleRowsSubmenu: 15,
  minDropdownWidth: 200,
  sortEntries: false,
  enableFilter: true,
  headerCollapsible: true,
}

const favoriteIcon = "EsoUI/Art/Inventory/inventory_tabIcon_quickslot_up.dds"
const profilesIcon = "/esoui/art/campaign/gamepad/gp_bonusicon_scrolls.dds"
const favoriteIconStr = zo_iconTextFormatNoSpace(favoriteIcon, 24, 24, "", true)

export const favoriteText = `|cFFD700${favoriteIconStr}|rFavorites`
const addAsFavoritePrefix = `+|c00FF00Add|r |cFFFFFF`
const addAsFavoriteSuffix = `|r |c00FF00as|r |cFFD700${favoriteIconStr}|rfavorite`
const deleteFavoritePrefix = `-|cFF0000Delete|r |cFFFFFF`
const deleteFavoriteSuffix = `|r |cFF0000from|r |cFFD700${favoriteIconStr}|rfavorite`
const deleteCurrentFavoritePrefix = `-|cFF0000Delete current|r |cFFFFFF`
const deleteCurrentFavoriteSuffix = `|r |cFF0000from|r |cFFD700${favoriteIconStr}|rfavorite`

export const profilesText = `|cFFD700${zo_iconTextFormatNoSpace(profilesIcon, 24, 24, "|rProfiles", true)}`
const profilesIconBare = zo_iconTextFormatNoSpace(profilesIcon, 24, 24, "", true)
const addAsProfilePrefix = `+|c00FF00Add as profile|r |cFFFFFF`
const addAsProfileSuffix = `|cFFD700${profilesIconBare}|r`
const deleteProfilePrefix = `-|cFF0000Delete profile|r |cFFFFFF`
const deleteProfileSuffix = `|cFFD700${profilesIconBare}|r`

function quoteValue(this: void, value: string): string {
  return `"${value}"`
}

export function addAsFavoriteString(this: void, value: string): string {
  return `${addAsFavoritePrefix}${quoteValue(value)}${addAsFavoriteSuffix}`
}
export function deleteFavoriteString(this: void, value: string): string {
  return `${deleteFavoritePrefix}${quoteValue(value)}${deleteFavoriteSuffix}`
}
export function deleteCurrentFavoriteString(this: void, value: string): string {
  return `${deleteCurrentFavoritePrefix}${quoteValue(value)}${deleteCurrentFavoriteSuffix}`
}
export function addAsProfileString(this: void, value: string): string {
  return `${addAsProfilePrefix}${quoteValue(value)}${addAsProfileSuffix}`
}
export function deleteProfileString(this: void, value: string): string {
  return `${deleteProfilePrefix}${quoteValue(value)}${deleteProfileSuffix}`
}

export const maxLastSavedEntries = 25

export const uniqueSaveMailValuesUpdaterName = "FCOCS_saveMailUpdater"

export const mailFavoritesSavedLower: Record<string, Record<string, boolean | undefined>> = {}
export const mailTextsSavedLower: Record<string, Record<string, boolean | undefined>> = {}

export const allowedMailContextMenuOwners = new LuaTable<object, boolean>()

export const mailContextMenuButtons: Record<string, Control | undefined> = {}

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
  const settings: unknown = state.settingsVars.settings
  if (isMailSettings(settings)) {
    return settings
  }
  error("FCOCS mail: settings table missing")
}

const arrowStr = " |u16:0::|u"

export function cleanSubMenuLabelText(this: void, labelTextWithArrow: string): string {
  const [result] = string.gsub(labelTextWithArrow, arrowStr, "")
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
  return mailSendEditFields[fieldType]
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
