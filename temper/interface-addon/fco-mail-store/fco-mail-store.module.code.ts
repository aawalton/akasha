import {
  addAsProfileString,
  getEditBoxByFieldType,
  getMailSettings,
  isNumberValue,
  isStringValue,
  MAIL_FAVORITES_SAVED_LOWER,
  MAIL_SEND_EDIT_FIELDS,
  MAIL_TEXTS_SAVED_LOWER,
  type MailFieldType,
  type MailProfileData,
} from "../fco-mail-data/fco-mail-data.module.code.ts"

export interface NotAlreadyInResult {
  isNotIn: boolean
  currentText: string | undefined
  tabToAdd: string[] | MailProfileData[] | undefined
  tabToAddStrLower: Record<string, boolean | undefined> | undefined
}

function isStringTab(
  this: void,
  tab: string[] | MailProfileData[] | undefined
): tab is string[] | undefined {
  return tab === undefined || tab.length === 0 || type(tab[0]) === "string"
}

function isProfileTab(
  this: void,
  tab: string[] | MailProfileData[] | undefined
): tab is MailProfileData[] | undefined {
  return tab === undefined || tab.length === 0 || type(tab[0]) === "table"
}

export function getCurrentText(
  this: void,
  fieldType: MailFieldType,
  notEmpty?: boolean
): string | undefined {
  const onlyNotEmpty = notEmpty ?? false
  const editField = getEditBoxByFieldType(fieldType)
  if (editField === undefined) {
    return undefined
  }
  const editBoxText = editField.GetText()
  if (onlyNotEmpty === true && editBoxText === "") {
    return undefined
  }
  return editBoxText
}

export function updateTextsSavedStringLower(
  this: void,
  fieldType: MailFieldType,
  isFavorite: boolean,
  textToAdd: string | undefined
): undefined {
  const fav = isFavorite ?? false
  if (isStringValue(textToAdd) && textToAdd !== "") {
    const textToAddLower = string.lower(textToAdd)
    if (fav === true) {
      const favTab = MAIL_FAVORITES_SAVED_LOWER[fieldType] ?? {}
      MAIL_FAVORITES_SAVED_LOWER[fieldType] = favTab
      favTab[textToAddLower] = true
    } else {
      const txtTab = MAIL_TEXTS_SAVED_LOWER[fieldType] ?? {}
      MAIL_TEXTS_SAVED_LOWER[fieldType] = txtTab
      txtTab[textToAddLower] = true
    }
  } else {
    const settings = getMailSettings()
    if (fav === true) {
      const mailFavoritesSaved = settings.mailFavoritesSaved[fieldType]
      MAIL_FAVORITES_SAVED_LOWER[fieldType] = {}
      const favTab = MAIL_FAVORITES_SAVED_LOWER[fieldType]
      if (mailFavoritesSaved !== undefined) {
        for (const [, textUpper] of ipairs(mailFavoritesSaved)) {
          favTab[string.lower(textUpper)] = true
        }
      }
    } else {
      const mailTextsSaved = settings.mailTextsSaved[fieldType]
      MAIL_TEXTS_SAVED_LOWER[fieldType] = {}
      const txtTab = MAIL_TEXTS_SAVED_LOWER[fieldType]
      if (mailTextsSaved !== undefined) {
        for (const [, textUpper] of ipairs(mailTextsSaved)) {
          txtTab[string.lower(textUpper)] = true
        }
      }
    }
  }
}

export function updateLowercaseTextTables(this: void): undefined {
  for (const [fieldType] of pairs(MAIL_SEND_EDIT_FIELDS)) {
    updateTextsSavedStringLower(fieldType, true, undefined)
    updateTextsSavedStringLower(fieldType, false, undefined)
  }
}

export function checkIfNotAlreadyIn(
  this: void,
  fieldType: MailFieldType | undefined,
  isFavorite: boolean,
  entryName: string | number | undefined,
  ignoreAlreadyIn?: boolean,
  isProfile?: boolean
): NotAlreadyInResult {
  const ignore = ignoreAlreadyIn ?? false
  const profile = isProfile ?? false

  if (fieldType !== undefined && !profile) {
    let currentText: string | undefined
    if (isStringValue(entryName) && entryName !== "") {
      currentText = entryName
    } else {
      currentText = getCurrentText(fieldType)
    }
    if (isStringValue(currentText) && currentText !== "") {
      const currentTextLower = string.lower(currentText)
      const settings = getMailSettings()
      const tabToAdd =
        isFavorite === true
          ? settings.mailFavoritesSaved[fieldType]
          : settings.mailTextsSaved[fieldType]
      const tabToAddStrLower =
        isFavorite === true
          ? MAIL_FAVORITES_SAVED_LOWER[fieldType]
          : MAIL_TEXTS_SAVED_LOWER[fieldType]
      if (tabToAdd !== undefined) {
        if (tabToAddStrLower !== undefined && tabToAddStrLower[currentTextLower] === true) {
          if (ignore === true) {
            return { isNotIn: true, currentText, tabToAdd, tabToAddStrLower }
          }
          return { isNotIn: false, currentText: undefined, tabToAdd, tabToAddStrLower }
        }
        return { isNotIn: true, currentText, tabToAdd, tabToAddStrLower }
      }
    }
  } else if (profile === true && isNumberValue(entryName)) {
    const settings = getMailSettings()
    const tabToAdd = settings.mailProfiles
    if (tabToAdd !== undefined) {
      if (tabToAdd[entryName - 1] !== undefined) {
        if (ignore === true) {
          return { isNotIn: true, currentText: undefined, tabToAdd, tabToAddStrLower: undefined }
        }
        return { isNotIn: false, currentText: undefined, tabToAdd, tabToAddStrLower: undefined }
      }
    } else {
      return {
        isNotIn: false,
        currentText: undefined,
        tabToAdd: undefined,
        tabToAddStrLower: undefined,
      }
    }
  }

  return {
    isNotIn: false,
    currentText: undefined,
    tabToAdd: undefined,
    tabToAddStrLower: undefined,
  }
}

export function removeSavedValue(
  this: void,
  fieldType: MailFieldType | undefined,
  isFavorite: boolean,
  entryName: string | number,
  isProfile?: boolean
): undefined {
  const fav = isFavorite ?? false
  const profile = isProfile ?? false

  if (fieldType !== undefined && !profile && isStringValue(entryName)) {
    const result = checkIfNotAlreadyIn(fieldType, fav, entryName, false, false)
    const tabToRemove = result.tabToAdd
    if (result.isNotIn === true || tabToRemove === undefined || !isStringTab(tabToRemove)) {
      return
    }
    let posInTab: number | undefined
    for (const [idx, value] of ipairs(tabToRemove)) {
      if (posInTab === undefined && string.lower(value) === string.lower(entryName)) {
        posInTab = idx
        break
      }
    }
    if (posInTab !== undefined) {
      tabToRemove.splice(posInTab - 1, 1)
      if (result.tabToAddStrLower !== undefined) {
        result.tabToAddStrLower[string.lower(entryName)] = undefined
      }
    }
  } else if (fieldType === undefined && profile === true && isNumberValue(entryName)) {
    const result = checkIfNotAlreadyIn(undefined, false, entryName, false, true)
    const tabToRemove = result.tabToAdd
    if (result.isNotIn === true || tabToRemove === undefined || !isProfileTab(tabToRemove)) {
      return
    }
    tabToRemove.splice(entryName - 1, 1)
  }
}

export function updateMailEditBoxText(
  this: void,
  fieldType: MailFieldType,
  newText: string,
  doOverride?: boolean
): undefined {
  const editField = getEditBoxByFieldType(fieldType)
  if (editField === undefined) {
    return
  }
  let override = doOverride
  if (override === undefined) {
    override = getMailSettings().overwriteMailFields[fieldType] === true
  }
  if (override === true || editField.GetText() === "") {
    editField.SetText(newText)
  }
}

export function setMailValue(
  this: void,
  fieldType: MailFieldType | undefined,
  entryData: string | number,
  doOverride?: boolean,
  isProfile?: boolean
): undefined {
  if (fieldType !== undefined && isProfile !== true) {
    if (!isStringValue(entryData) || entryData === "") {
      return
    }
    updateMailEditBoxText(fieldType, entryData, doOverride)
  } else if (fieldType === undefined && isProfile === true && isNumberValue(entryData)) {
    const profileEntries = getMailSettings().mailProfiles
    const profileEntryData = profileEntries[entryData - 1]
    if (profileEntryData === undefined) {
      return
    }
    const recipient = profileEntryData.recipient
    const subject = profileEntryData.subject
    const text = profileEntryData.text
    if (
      (recipient === undefined && subject === undefined && text === undefined) ||
      (recipient === "" && subject === "" && text === "")
    ) {
      return
    }
    if (recipient !== undefined && recipient !== "") {
      updateMailEditBoxText("recipients", recipient, doOverride)
    }
    if (subject !== undefined && subject !== "") {
      updateMailEditBoxText("subjects", subject, doOverride)
    }
    if (text !== undefined && text !== "") {
      updateMailEditBoxText("texts", text, doOverride)
    }
  }
}

export function loadLastUsedValue(this: void, fieldType: MailFieldType): undefined {
  const lastUsedSettings = getMailSettings().mailLastUsed[fieldType]
  if (!isStringValue(lastUsedSettings) || lastUsedSettings === "") {
    return
  }
  setMailValue(fieldType, lastUsedSettings, true)
}

export function saveAsFavorit(
  this: void,
  fieldType: MailFieldType,
  favoriteValue: string | undefined
): boolean {
  const result = checkIfNotAlreadyIn(fieldType, true, favoriteValue, false)
  if (result.isNotIn === true) {
    const tabToAdd = isStringTab(result.tabToAdd) ? result.tabToAdd : undefined
    const currentText = result.currentText
    if (tabToAdd !== undefined && currentText !== undefined) {
      tabToAdd.push(currentText)
      table.sort(tabToAdd)
      updateTextsSavedStringLower(fieldType, true, currentText)
      return true
    }
  }
  return false
}

export function saveAsProfile(
  this: void,
  profileIndex: number,
  enteredProfileName: string | undefined
): boolean {
  if (profileIndex === undefined || profileIndex <= 0) {
    return false
  }
  if (enteredProfileName === undefined || enteredProfileName === "") {
    return false
  }
  const profileEntries = getMailSettings().mailProfiles
  const profileEntryData = profileEntries[profileIndex - 1]
  if (profileEntryData === undefined) {
    const newProfileData: MailProfileData = {
      _name: enteredProfileName,
      recipient: getCurrentText("recipients", true),
      subject: getCurrentText("subjects", true),
      text: getCurrentText("texts", true),
    }
    profileEntries[profileIndex - 1] = newProfileData
    return true
  }
  return false
}

export function saveAsLastUsedList(
  this: void,
  fieldType: MailFieldType,
  lastUsedValue: string | undefined
): boolean {
  const result = checkIfNotAlreadyIn(fieldType, false, lastUsedValue, true)
  const currentText = result.currentText
  const tabToAdd = isStringTab(result.tabToAdd) ? result.tabToAdd : undefined
  const tabToAddLower = result.tabToAddStrLower
  if (
    (result.isNotIn === true && !isStringValue(currentText)) ||
    currentText === "" ||
    tabToAdd === undefined ||
    tabToAddLower === undefined
  ) {
    return false
  }
  if (!isStringValue(currentText)) {
    return false
  }
  tabToAdd.unshift(currentText)
  updateTextsSavedStringLower(fieldType, false, currentText)
  return true
}

export function saveAsLastUsed(
  this: void,
  fieldType: MailFieldType,
  lastUsedValue?: string
): undefined {
  const currentText = lastUsedValue ?? getCurrentText(fieldType)
  if (!isStringValue(currentText)) {
    return
  }
  const isNotEmptyString = currentText !== ""
  if (isNotEmptyString || (fieldType === "texts" && currentText === "")) {
    getMailSettings().mailLastUsed[fieldType] = currentText
  }
}

export function saveMailValue(
  this: void,
  fieldType: MailFieldType,
  isFavorite: boolean,
  isLastUsed: boolean
): undefined {
  const fav = isFavorite ?? false
  const last = isLastUsed ?? false
  if (last === true) {
    saveAsLastUsed(fieldType, undefined)
  } else if (fav === true) {
    saveAsFavorit(fieldType, undefined)
  }
}

export function saveLastUsedValue(this: void, fieldType: MailFieldType): undefined {
  saveAsLastUsed(fieldType)
}

export function addToFavorites(
  this: void,
  fieldType: MailFieldType,
  favoriteValue: string | undefined
): boolean {
  return saveAsFavorit(fieldType, favoriteValue)
}

const ADD_MAIL_PROFILE_DIALOG = "FCOCS_ADD_MAIL_PROFILE_DIALOG"

export function addToProfile(
  this: void,
  profileIndex: number,
  recipient: string,
  subject: string
): undefined {
  if (!ZO_Dialogs_IsDialogRegistered(ADD_MAIL_PROFILE_DIALOG)) {
    ZO_Dialogs_RegisterCustomDialog(ADD_MAIL_PROFILE_DIALOG, {
      title: {
        text: addAsProfileString(tostring(profileIndex)),
      },
      mainText: {
        text: "Add new mail profile name",
      },
      editBox: {},
      noChoiceCallback: () => {},
      buttons: [
        {
          requiresTextInput: true,
          text: "Save as profile",
          callback: (dialog) => {
            const enteredProfileName = ZO_Dialogs_GetEditBoxText(dialog)
            if (enteredProfileName !== undefined && enteredProfileName !== "") {
              const profileIndexValue = tonumber(dialog.data.profileIndex)
              if (profileIndexValue !== undefined) {
                saveAsProfile(profileIndexValue, enteredProfileName)
              }
            }
          },
        },
        {
          text: SI_DIALOG_CANCEL,
          callback: () => {},
        },
      ],
    })
  }
  ZO_Dialogs_ShowPlatformDialog(
    ADD_MAIL_PROFILE_DIALOG,
    { profileIndex, editBoxText: `${recipient}_${subject}` },
    { title: { text: addAsProfileString(tostring(profileIndex)) } }
  )
}
