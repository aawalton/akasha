import {
  checkMaxFavoritesAndCreateSubMenus,
  checkMaxProfilesAndCreateSubMenus,
} from "./mail-context-submenus"
import {
  addAsFavoriteString,
  addAsProfileString,
  allowedMailContextMenuOwners,
  checkIfTabNeedsToBeTruncated,
  deleteCurrentFavoriteString,
  getMailSettings,
  isMailFieldType,
  isStringValue,
  LSM_contextMenuDefaultOptions,
  type LsmContextMenuOptions,
  type MailEditControl,
  type MailFieldType,
  mailContextMenuButtons,
  mailSendEditFields,
  mailTextShortener,
  maxLastSavedEntries,
  profilesText,
  validateTextField,
} from "./mail-data"
import {
  addToFavorites,
  addToProfile,
  checkIfNotAlreadyIn,
  getCurrentText,
  removeSavedValue,
  setMailValue,
} from "./mail-store"

let mailContextMenusAtEditFieldsHooked = false

let settingsForLSMContextMenu: LsmContextMenuOptions | undefined

export function onMouseUpAtMailEditBox(
  this: void,
  fieldType: MailFieldType,
  isTriangleButton: boolean,
  editCtrl: MailEditControl,
  button: number,
  upInside: boolean
): boolean | undefined {
  if (upInside === true && button === MOUSE_BUTTON_INDEX_RIGHT) {
    ClearCustomScrollableMenu()
    settingsForLSMContextMenu =
      settingsForLSMContextMenu ?? ZO_ShallowTableCopy(LSM_contextMenuDefaultOptions)
    const loc_settings = getMailSettings()
    if (loc_settings.mailContextMenus !== true) {
      if (!isTriangleButton) {
        return false
      }
    }

    const mailContextMenuButton = isTriangleButton ? mailContextMenuButtons[fieldType] : undefined
    const controlToAddContextMenuTo =
      (isTriangleButton ? mailContextMenuButton : editCtrl) ?? editCtrl

    let mailProfilesContextMenusEntriesAtEditFieldsAdded = false
    let mailFavoritesContextMenusEntriesAtEditFieldsAdded = false
    let mailLastUsedContextMenusEntriesAtEditFieldsAdded = false
    let addProfilePossible = false
    let wasProfilesAdded = false
    let addOrDeleteFavoriteAdded = false
    let wasFavoritesAdded = false

    const mailFavoritesContextMenusAtEditFields =
      isTriangleButton || loc_settings.mailFavoritesContextMenusAtEditFields === true
    const mailLastUsedContextMenusAtEditFields =
      isTriangleButton || loc_settings.mailLastUsedContextMenusAtEditFields === true
    const mailprofilesEnabled = isTriangleButton || loc_settings.enableMailProfiles === true

    const currentTextInitial = editCtrl.GetText()
    const isEmpty = type(currentTextInitial) === "string" && currentTextInitial === ""

    if (isEmpty === false) {
      AddCustomScrollableMenuEntry("Clear edit field", () => {
        editCtrl.SetText("")
      })
    } else {
      if (!isTriangleButton) {
        if (
          !mailFavoritesContextMenusAtEditFields &&
          !mailLastUsedContextMenusAtEditFields &&
          !mailprofilesEnabled
        ) {
          return undefined
        }
      }
    }

    let addOrDeleteProfileAdded = false
    if (mailprofilesEnabled && fieldType === "recipients") {
      editCtrl._type = fieldType
      allowedMailContextMenuOwners.set(editCtrl, true)

      const mailProfiles = loc_settings.mailProfiles

      const recipient = currentTextInitial
      const subject = getCurrentText("subjects")
      const textVal = getCurrentText("texts")

      const isValidatedRecipient = validateTextField("recipients", recipient, true)
      const isValidatedSubject = validateTextField("subjects", subject, true)
      const isValidatedText = validateTextField("texts", textVal, true)
      if (
        (isValidatedRecipient === true && isValidatedSubject === true) ||
        (isValidatedRecipient === true && isValidatedText === true) ||
        (isValidatedSubject === true && isValidatedText === true)
      ) {
        addProfilePossible = true

        for (const [, mailProfileData] of ipairs(mailProfiles)) {
          if (
            ((mailProfileData.recipient !== undefined && mailProfileData.recipient === recipient) ||
              (mailProfileData.recipient === undefined && recipient === "")) &&
            ((mailProfileData.subject !== undefined && mailProfileData.subject === subject) ||
              (mailProfileData.subject === undefined && subject === "")) &&
            ((mailProfileData.text !== undefined && mailProfileData.text === textVal) ||
              (mailProfileData.text === undefined && textVal === ""))
          ) {
            addProfilePossible = false
            break
          }
        }

        if (addProfilePossible === true) {
          AddCustomScrollableMenuEntry(profilesText, () => {}, LSM_ENTRY_TYPE_HEADER, undefined, {
            doNotFilter: true,
          })
          mailProfilesContextMenusEntriesAtEditFieldsAdded = true
        }
      }

      wasProfilesAdded = checkMaxProfilesAndCreateSubMenus(addProfilePossible)
      if (wasProfilesAdded === true) {
        AddCustomScrollableMenuDivider()
      }

      if (addProfilePossible === true) {
        const numProfiles = mailProfiles.length
        const nextProfileNum = numProfiles + 1

        const isNotIn = true

        if (isNotIn === true) {
          const addAsProfileText = addAsProfileString(`#${tostring(nextProfileNum)}`)
          AddCustomScrollableMenuEntry(addAsProfileText, () => {
            addToProfile(nextProfileNum, recipient, subject ?? "")
          })
          addOrDeleteProfileAdded = true
          mailProfilesContextMenusEntriesAtEditFieldsAdded = true
        }
      }
    }

    if (mailFavoritesContextMenusAtEditFields && loc_settings.mailFavorites[fieldType] === true) {
      editCtrl._type = fieldType
      allowedMailContextMenuOwners.set(editCtrl, true)

      if (addOrDeleteProfileAdded === true) {
        AddCustomScrollableMenuDivider()
      }

      wasFavoritesAdded = checkMaxFavoritesAndCreateSubMenus(fieldType, true)
      if (wasFavoritesAdded === true) {
        AddCustomScrollableMenuDivider()
      }

      const isValidated = validateTextField(fieldType, currentTextInitial)
      if (isValidated === true) {
        let isNotIn: boolean
        let shortText: string | undefined
        if (isEmpty === true) {
          isNotIn = true
        } else {
          const result = checkIfNotAlreadyIn(fieldType, true, currentTextInitial, false)
          isNotIn = result.isNotIn
          shortText = mailTextShortener(currentTextInitial)
        }
        if (isEmpty === false) {
          if (isNotIn === true) {
            const addText = addAsFavoriteString(shortText ?? "")
            AddCustomScrollableMenuEntry(addText, () => {
              addToFavorites(fieldType, undefined)
            })
            addOrDeleteFavoriteAdded = true
          } else {
            const deleteText = deleteCurrentFavoriteString(shortText ?? "")
            AddCustomScrollableMenuEntry(deleteText, () => {
              removeSavedValue(fieldType, true, currentTextInitial)
            })
            addOrDeleteFavoriteAdded = true
          }
          mailFavoritesContextMenusEntriesAtEditFieldsAdded = true
        }
      }
    }

    if (mailLastUsedContextMenusAtEditFields) {
      const lastUsedEntryRaw = loc_settings.mailLastUsed[fieldType]
      if (isStringValue(lastUsedEntryRaw) && lastUsedEntryRaw !== "") {
        const lastUsedEntry = lastUsedEntryRaw
        AddCustomScrollableMenuEntry("Last used", () => {}, LSM_ENTRY_TYPE_HEADER, undefined, {
          doNotFilter: true,
        })
        AddCustomScrollableMenuEntry(lastUsedEntry, () => {
          setMailValue(fieldType, lastUsedEntry)
        })
        mailLastUsedContextMenusEntriesAtEditFieldsAdded = true
      }

      const entries = loc_settings.mailTextsSaved[fieldType]
      if (entries !== undefined) {
        checkIfTabNeedsToBeTruncated(entries, maxLastSavedEntries)
        loc_settings.mailTextsSaved[fieldType] = entries
        if (entries.length > 0) {
          AddCustomScrollableMenuEntry(
            `Last ${tostring(maxLastSavedEntries)}`,
            () => {},
            LSM_ENTRY_TYPE_HEADER,
            undefined,
            { doNotFilter: true }
          )
          const lastUsedEntryDataSubmenu: unknown[] = []
          for (const [idx, entryData] of ipairs(entries)) {
            const shortText = mailTextShortener(entryData)
            lastUsedEntryDataSubmenu.push({
              label: `${tostring(idx)}. '${shortText}'`,
              callback: () => {
                setMailValue(fieldType, entryData)
              },
            })
          }
          AddCustomScrollableSubMenuEntry(string.upper(fieldType), lastUsedEntryDataSubmenu)
          mailLastUsedContextMenusEntriesAtEditFieldsAdded = true
        }
      }
    }

    if (
      isEmpty === false ||
      mailFavoritesContextMenusEntriesAtEditFieldsAdded ||
      addOrDeleteFavoriteAdded ||
      wasFavoritesAdded ||
      mailLastUsedContextMenusEntriesAtEditFieldsAdded ||
      mailProfilesContextMenusEntriesAtEditFieldsAdded ||
      wasProfilesAdded ||
      addProfilePossible
    ) {
      if (loc_settings.mailContextMenuSubmenusForceOpenToTheLeft === true) {
        settingsForLSMContextMenu.submenuOpenToSide = "left"
      } else {
        settingsForLSMContextMenu.submenuOpenToSide = undefined
      }
      ShowCustomScrollableMenu(controlToAddContextMenuTo, settingsForLSMContextMenu)
    } else {
      editCtrl._type = undefined
      allowedMailContextMenuOwners.delete(editCtrl)
    }
  }
  return undefined
}

function addMailFieldsContextMenuHooks(this: void): undefined {
  for (const [fieldType, editFieldCtrl] of pairs(mailSendEditFields)) {
    if (editFieldCtrl !== undefined && isMailFieldType(fieldType)) {
      const ft = fieldType
      const currentHandler = editFieldCtrl.GetHandler("OnMouseUp")
      if (currentHandler === undefined) {
        editFieldCtrl.SetHandler("OnMouseUp", (_self, btn, upInside) =>
          onMouseUpAtMailEditBox(ft, false, editFieldCtrl, tonumber(btn) ?? 0, upInside === true)
        )
      } else {
        ZO_PostHookHandler(editFieldCtrl, "OnMouseUp", (_self, btn, upInside) => {
          onMouseUpAtMailEditBox(ft, false, editFieldCtrl, tonumber(btn) ?? 0, upInside === true)
        })
      }
      mailContextMenusAtEditFieldsHooked = true
    }
  }
}

export function updateMailContextMenuButtonContextMenus(
  this: void,
  fieldType?: MailFieldType
): undefined {
  if (fieldType !== undefined && mailContextMenuButtons[fieldType] !== undefined) {
    const editCtrl = mailSendEditFields[fieldType]
    onMouseUpAtMailEditBox(fieldType, true, editCtrl, MOUSE_BUTTON_INDEX_RIGHT, true)
  }
}

export function checkIfEditBoxContextMenusNeedAnUpdate(this: void): undefined {
  if (mailContextMenusAtEditFieldsHooked === true) {
    return
  }
  addMailFieldsContextMenuHooks()
}
