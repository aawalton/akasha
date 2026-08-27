import { ADDON_NAME } from "../constants"
import { getSavedVariables } from "../saved-variables"
import { INSECT_NAMES, INTERACTION_TAKE } from "../strings"

export function hookFriendsMessages(this: void): undefined {
  const SV = getSavedVariables()
  if (SV.friends) {
    EVENT_MANAGER.UnregisterForEvent("ChatRouter", EVENT_FRIEND_PLAYER_STATUS_CHANGED)
  }
}

export function noUniversalStones(this: void): undefined {
  const SV = getSavedVariables()

  function disableUniversalCheckbox(this: void, _eventCode: number, craftSkill: number): undefined {
    if (
      craftSkill === CRAFTING_TYPE_BLACKSMITHING ||
      craftSkill === CRAFTING_TYPE_CLOTHIER ||
      craftSkill === CRAFTING_TYPE_WOODWORKING
    ) {
      if (GetCurrentSmithingStyleItemCount(ZO_ADJUSTED_UNIVERSAL_STYLE_ITEM_INDEX) === 0) {
        ZO_SmithingTopLevelCreationPanelStyleListUniversalStyleItem.SetHidden(true)
      } else {
        ZO_SmithingTopLevelCreationPanelStyleListUniversalStyleItem.SetHidden(false)
      }
    }
  }

  if (SV.noUniversalStones) {
    EVENT_MANAGER.RegisterForEvent(
      ADDON_NAME,
      EVENT_CRAFTING_STATION_INTERACT,
      disableUniversalCheckbox
    )
  } else {
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_CRAFTING_STATION_INTERACT)
    ZO_SmithingTopLevelCreationPanelStyleListUniversalStyleItem.SetHidden(false)
  }
}

export function noGuildLeave(this: void): undefined {
  const SV = getSavedVariables()
  const descriptor = GUILD_HOME.keybindStripDescriptor[1]
  if (descriptor === undefined) {
    return
  }
  if (SV.noGuildLeave === 1) {
    descriptor.visible = function (this: void): boolean {
      return false
    }
  } else if (SV.noGuildLeave === 2 && SV.guildLeave[GUILD_HOME.guildId] === true) {
    descriptor.visible = function (this: void): boolean {
      return false
    }
  } else {
    descriptor.visible = function (this: void): boolean {
      return true
    }
  }
}

export function noGuildLeavePreHook(this: void): undefined {
  ZO_PreHook(GUILD_HOME, "RefreshAll", noGuildLeave)
}

export function hookReticleTake(this: void): undefined {
  const SV = getSavedVariables()

  function disableReticleTakeHook(this: void, interactionPossible: boolean): boolean {
    if (interactionPossible) {
      if (SV.reticleTake || SV.emptyInteractions) {
        const [action, interactableName, interactionBlocked, , additionalInteractInfo] =
          GetGameCameraInteractableActionInfo()
        if (action !== undefined && interactableName !== undefined) {
          if (action === INTERACTION_TAKE) {
            if (SV.reticleTake) {
              let isInsect = false
              for (const insect of INSECT_NAMES) {
                if (interactableName === insect) {
                  isInsect = true
                  break
                }
              }
              if (isInsect) {
                return true
              }
            }
          } else if (SV.emptyInteractions && interactionBlocked) {
            const dontShow: Record<number, boolean> = {
              [ADDITIONAL_INTERACT_INFO_EMPTY]: true,
            }
            if (dontShow[additionalInteractInfo] === true) {
              return true
            }
          }
        }
      }
    }
    return false
  }
  ZO_PreHook(RETICLE, "TryHandlingInteraction", disableReticleTakeHook)
}

export function dontInterruptHarvesting(this: void): undefined {
  const SV = getSavedVariables()
  function showHook(this: void, self: EndInWorldInteractionsFragment): boolean | undefined {
    if (SV.nonstopHarvest) {
      EndPendingInteraction()
      self.OnShown()
      return true
    }
    return undefined
  }
  ZO_PreHook(END_IN_WORLD_INTERACTIONS_FRAGMENT, "Show", showHook)
}

export function dontReadBooks(this: void): undefined {
  const SV = getSavedVariables()

  function onShowBook(
    this: void,
    _eventCode: number,
    title: string,
    body: string,
    medium: number,
    showTitle: boolean,
    bookId: number
  ): undefined {
    const [overrideImage, overrideImageTitlePosition] = GetLoreBookOverrideImageFromBookId(bookId)
    LORE_READER.Show(title, body, medium, showTitle, overrideImage, overrideImageTitlePosition)
    PlaySound(LORE_READER.OpenSound)
  }

  function onDontShowBook(this: void): undefined {
    EndInteraction(INTERACTION_BOOK)
  }

  if (SV.dontReadBooks) {
    LORE_READER.control.UnregisterForEvent(EVENT_SHOW_BOOK)
    LORE_READER.control.RegisterForEvent(EVENT_SHOW_BOOK, onDontShowBook)
  } else {
    LORE_READER.control.UnregisterForEvent(EVENT_SHOW_BOOK)
    LORE_READER.control.RegisterForEvent(EVENT_SHOW_BOOK, onShowBook)
  }
}

export function hookReportItemFromInventory(this: void): undefined {
  const SV = getSavedVariables()
  function addSlotActionHook(
    this: void,
    _self: unknown,
    actionStringId: number
  ): boolean | undefined {
    if (SV.noReportOnItems && actionStringId === SI_ITEM_ACTION_REPORT_ITEM) {
      return true
    }
    return undefined
  }
  ZO_PreHook(ZO_InventorySlotActions, "AddSlotAction", addSlotActionHook)
}

export function doDisableChatAutoComplete(this: void): undefined {
  const SV = getSavedVariables()
  function getAutoCompletionResultsHook(this: void): boolean {
    return SV.disableChatAutoComplete
  }
  ZO_PreHook(SlashCommandAutoComplete, "GetAutoCompletionResults", getAutoCompletionResultsHook)
}

function onPlayerActivatedDisableChatAutoComplete(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)
  doDisableChatAutoComplete()
}

export function disableChatAutoComplete(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_PLAYER_ACTIVATED,
    onPlayerActivatedDisableChatAutoComplete
  )
}

export function hookAcceptOfferedQuest(this: void, fromLAM: boolean): undefined {
  const SV = getSavedVariables()
  const original = INTERACTION.eventCallbacks[EVENT_QUEST_OFFERED]

  let masterWritReceived = false
  function onQuestOffered(this: void, ...args: unknown[]): undefined {
    if (masterWritReceived) {
      masterWritReceived = false
    } else if (original !== undefined) {
      original(...args)
    }
  }

  function onLootReceived(this: void, _a: unknown, _b: unknown, itemLink: string): undefined {
    const [itemType] = GetItemLinkItemType(itemLink)
    if (itemType === ITEMTYPE_MASTER_WRIT) {
      masterWritReceived = true
    }
  }

  if (SV.dontAcceptWritQuest) {
    INTERACTION.control.RegisterForEvent(EVENT_LOOT_RECEIVED, onLootReceived)
    INTERACTION.control.AddFilterForEvent(EVENT_LOOT_RECEIVED, REGISTER_FILTER_BAG_ID, BAG_BACKPACK)
    INTERACTION.control.AddFilterForEvent(EVENT_LOOT_RECEIVED, REGISTER_FILTER_UNIT_TAG, "player")
    INTERACTION.control.UnregisterForEvent(EVENT_QUEST_OFFERED)
    INTERACTION.control.RegisterForEvent(EVENT_QUEST_OFFERED, onQuestOffered)
  } else if (fromLAM && original !== undefined) {
    INTERACTION.control.UnregisterForEvent(EVENT_QUEST_OFFERED)
    INTERACTION.control.UnregisterForEvent(EVENT_LOOT_RECEIVED)
    INTERACTION.control.RegisterForEvent(EVENT_QUEST_OFFERED, original)
  }
}
