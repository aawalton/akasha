import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { isNumber, isString } from "../quiet-narrow/quiet-narrow.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"

interface FenceDialogData {
  bag: number
  slot: number
  stackCount: number
}
interface ImproveDialogData {
  bagId: number
  slotIndex: number
  boostersToApply: number
}
interface EquipDialogData {
  onAcceptCallback: (this: void) => undefined
}

function isFenceDialogData(this: void, value: unknown): value is FenceDialogData {
  return (
    isObjectRecord(value) &&
    isNumber(value.bag) &&
    isNumber(value.slot) &&
    isNumber(value.stackCount)
  )
}

function isImproveDialogData(this: void, value: unknown): value is ImproveDialogData {
  return (
    isObjectRecord(value) &&
    isNumber(value.bagId) &&
    isNumber(value.slotIndex) &&
    isNumber(value.boostersToApply)
  )
}

function isEquipDialogData(this: void, value: unknown): value is EquipDialogData {
  return isObjectRecord(value) && typeof value.onAcceptCallback === "function"
}

export function deleteEmptyMailHook(this: void): undefined {
  const savedVars = getSavedVariables()
  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    if (name === "DELETE_MAIL") {
      if (savedVars.emptyMail) {
        if (IsInGamepadPreferredMode()) {
          DeleteMail(MAIL_MANAGER_GAMEPAD.inbox.GetActiveMailId())
        } else if (MAIL_INBOX !== undefined && MAIL_INBOX.mailId !== undefined) {
          DeleteMail(MAIL_INBOX.mailId)
        }
        return true
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function hookFenceDialog(this: void): undefined {
  const savedVars = getSavedVariables()
  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    const data = args[1]
    if (name === "CANT_BUYBACK_FROM_FENCE") {
      if (savedVars.fenceDialog && isFenceDialogData(data)) {
        SellInventoryItem(data.bag, data.slot, data.stackCount)
        return true
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function hookDisbandDialog(this: void): undefined {
  const savedVars = getSavedVariables()
  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    if (name === "GROUP_DISBAND_DIALOG") {
      if (savedVars.disbandDialog) {
        GroupDisband()
        return true
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function hookLargeGroupDialog(this: void): undefined {
  const savedVars = getSavedVariables()
  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    const data = args[1]
    if (name === "LARGE_GROUP_INVITE_WARNING") {
      if (savedVars.largeGroupDialog && isString(data)) {
        const characterOrDisplayName = data
        GroupInviteByName(characterOrDisplayName)
        ZO_Menu_SetLastCommandWasFromMenu(true)
        ZO_Alert(
          ALERT,
          undefined,
          zo_strformat(
            GetString("SI_GROUPINVITERESPONSE", GROUP_INVITE_RESPONSE_INVITED),
            ZO_FormatUserFacingDisplayName(characterOrDisplayName)
          )
        )
        return true
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function hookImproveDialog(this: void): undefined {
  const savedVars = getSavedVariables()
  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    const data = args[1]
    if (
      name === "CONFIRM_IMPROVE_ITEM" ||
      name === "CONFIRM_IMPROVE_LOCKED_ITEM" ||
      name === "GAMEPAD_CONFIRM_IMPROVE_LOCKED_ITEM"
    ) {
      if (savedVars.improveDialog && isImproveDialogData(data)) {
        ImproveSmithingItem(data.bagId, data.slotIndex, data.boostersToApply)
        return true
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function hookMarketAnnouncement(this: void): undefined {
  const savedVars = getSavedVariables()
  const scene = SCENE_MANAGER.scenes.marketAnnouncement
  if (scene !== undefined) {
    function setStateHook(this: void, _self: unknown, state: number): boolean | undefined {
      if (state === SCENE_SHOWN) {
        if (savedVars.marketAnnouncement) {
          SCENE_MANAGER.ShowBaseScene()
        }
        return savedVars.marketAnnouncement
      }
      return undefined
    }
    ZO_PreHook(scene, "SetState", setStateHook)
  }
}

let notyCurrentBagId: number | undefined
let notyCurrentSlotId: number | undefined

export function hookBindAlerts(this: void): undefined {
  const savedVars = getSavedVariables()

  function tryEquipItem(this: void): boolean | undefined {
    if (
      savedVars.noBindAlert &&
      notyCurrentBagId !== undefined &&
      notyCurrentSlotId !== undefined
    ) {
      const [equipable] = IsEquipable(notyCurrentBagId, notyCurrentSlotId)
      if (equipable) {
        EquipItem(notyCurrentBagId, notyCurrentSlotId)
        return true
      }
    }
    return undefined
  }

  function onInventorySlotLocked(
    this: void,
    _eventCode: number,
    bagId: number,
    slotId: number
  ): undefined {
    if (savedVars.noBindAlert) {
      notyCurrentBagId = bagId
      notyCurrentSlotId = slotId
    }
  }
  EVENT_MANAGER.RegisterForEvent(
    "INVENTORY_SLOT_LOCKED",
    EVENT_INVENTORY_SLOT_LOCKED,
    onInventorySlotLocked
  )

  function showDialogHook(this: void, ...args: unknown[]): boolean | undefined {
    const name = args[0]
    const data = args[1]
    if (name === "CONFIRM_EQUIP_ITEM") {
      if (savedVars.noBindAlert && isEquipDialogData(data)) {
        const [status] = pcall(data.onAcceptCallback)
        if (status) {
          return true
        }
        if (tryEquipItem() === true) {
          return true
        }
      }
    }
    return undefined
  }
  ZO_PreHook("ZO_Dialogs_ShowDialog", showDialogHook)
}

export function noPortToLeader(this: void): undefined {
  const savedVars = getSavedVariables()
  const interactTypeTravelToLeader = 19
  const cannotJump: Record<number, boolean> = {
    [181]: true,
    [584]: true,
    [643]: true,
  }

  function removeFromIncomingQueue(this: void, incomingType: number): undefined {
    const queue = PLAYER_TO_PLAYER.incomingQueue
    for (const [i, incomingEntry] of ipairs(queue)) {
      if (incomingEntry.incomingType === incomingType) {
        queue.splice(i - 1, 1)
      }
    }
    ZO_Dialogs_ReleaseAllDialogsOfName("PTP_TIMED_RESPONSE_PROMPT")
  }

  SecurePostHook(
    PLAYER_TO_PLAYER,
    "AddPromptToIncomingQueue",
    function (this: void, _self: unknown, incomingType: number): undefined {
      if (incomingType === interactTypeTravelToLeader) {
        if (savedVars.noPortOnLeader === 1) {
          const groupLeaderUnitTag = GetGroupLeaderUnitTag()
          const groupLeaderZoneIndex = GetUnitZoneIndex(groupLeaderUnitTag)
          if (groupLeaderZoneIndex !== undefined) {
            const groupLeaderZoneId = GetZoneId(groupLeaderZoneIndex)
            if (cannotJump[groupLeaderZoneId] === true) {
              removeFromIncomingQueue(incomingType)
            }
          }
        } else if (savedVars.noPortOnLeader === 2) {
          removeFromIncomingQueue(incomingType)
        }
      }
    }
  )
}
