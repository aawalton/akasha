declare const ARMORY_BUILD_EQUIP_SLOT_STATE_EMPTY: number
declare const ARMORY_BUILD_EQUIP_SLOT_STATE_INACCESSIBLE: number
declare const ARMORY_BUILD_EQUIP_SLOT_STATE_MISSING: number
declare const ARMORY_BUILD_EQUIP_SLOT_STATE_VALID: number

declare const ZO_ARMORY_BUILD_ICON_TEXTURE_FORMATTER: string

declare const ZO_ARMORY_KEYBOARD_COLLAPSED_ENTRY_HEIGHT: number
declare const ZO_ARMORY_KEYBOARD_EXPANDED_ENTRY_HEIGHT: number
declare const ZO_ARMORY_KEYBOARD_UNLOCK_ENTRY_HEIGHT: number

interface ZoArmoryManager {
  PerformDeferredInitialization: (this: ZoArmoryManager) => void
}

declare const ZO_ARMORY_MANAGER: ZoArmoryManager

declare const STATS_BG_FRAGMENT: SceneFragment

declare const ZO_Character_GetEmptyEquipSlotTexture: (this: void, equipSlot: number) => string

declare const ZO_GenerateCommaSeparatedListWithoutAnd: (
  this: void,
  items: readonly string[]
) => string

declare const SI_ARMORY_BUILD_DEFAULT_NAME_FORMATTER: number
declare const SI_ARMORY_BUILD_RESTORE_CONFIRMATION_DIALOG_TEXT: number
declare const SI_ARMORY_BUILD_SAVE_CONFIRMATION_DIALOG_TEXT: number
declare const SI_ARMORY_CURSE_TYPE_LABEL: number
declare const SI_ARMORY_MUNDUS_STONE_LABEL: number
declare const SI_ARMORY_OPEN_BUILD_DIALOG_ACTION: number
declare const SI_ARMORY_OUTFIT_LABEL: number
declare const SI_ARMORY_RESTORE_BUILD_ACTION: number
declare const SI_ARMORY_SAVE_BUILD_ACTION: number
declare const SI_ARMORY_UNLOCKED_BUILD_COUNT: number
declare const SI_NO_OUTFIT_EQUIP_ENTRY: number
