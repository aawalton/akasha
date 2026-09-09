import { isTemperLocked } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"

const LOCK_TEXTURE = "EsoUI/Art/Miscellaneous/locked_up.dds"
const ICON_SIZE = 24
const ICON_CHILD_SUFFIX = "TemperLock"
const EVENT_NAMESPACE = "TemperInventoryEquipLock"

const CHARACTER_PREFIX = "ZO_CharacterEquipmentSlots"
const COMPANION_PREFIX = "ZO_CompanionCharacterWindow_Keyboard_TopLevelEquipmentSlots"
const CHARACTER_WINDOW = "ZO_Character"
const COMPANION_WINDOW = "ZO_CompanionCharacterWindow_Keyboard_TopLevel"

const SLOT_SUFFIX_BY_EQUIP: readonly (readonly [number, string])[] = [
  [EQUIP_SLOT_HEAD, "Head"],
  [EQUIP_SLOT_SHOULDERS, "Shoulder"],
  [EQUIP_SLOT_HAND, "Glove"],
  [EQUIP_SLOT_LEGS, "Leg"],
  [EQUIP_SLOT_CHEST, "Chest"],
  [EQUIP_SLOT_WAIST, "Belt"],
  [EQUIP_SLOT_FEET, "Foot"],
  [EQUIP_SLOT_NECK, "Neck"],
  [EQUIP_SLOT_RING1, "Ring1"],
  [EQUIP_SLOT_RING2, "Ring2"],
  [EQUIP_SLOT_MAIN_HAND, "MainHand"],
  [EQUIP_SLOT_OFF_HAND, "OffHand"],
  [EQUIP_SLOT_POISON, "Poison"],
  [EQUIP_SLOT_BACKUP_MAIN, "BackupMain"],
  [EQUIP_SLOT_BACKUP_OFF, "BackupOff"],
  [EQUIP_SLOT_BACKUP_POISON, "BackupPoison"],
]

function getOrCreateIcon(slotControl: Control): Control {
  const existing = slotControl.GetNamedChild(ICON_CHILD_SUFFIX)
  if (existing !== undefined) return existing
  const icon = WINDOW_MANAGER.CreateControl(
    `${slotControl.GetName()}${ICON_CHILD_SUFFIX}`,
    slotControl,
    CT_TEXTURE
  )
  icon.SetTexture(LOCK_TEXTURE)
  icon.SetDimensions(ICON_SIZE, ICON_SIZE)
  icon.SetAnchor(TOPLEFT, slotControl, TOPLEFT, 2, 2)
  icon.SetDrawTier(DT_HIGH)
  return icon
}

function refreshSlots(prefix: string, bagId: number): undefined {
  for (const [equipSlot, suffix] of SLOT_SUFFIX_BY_EQUIP) {
    const slotControl = WINDOW_MANAGER.GetControlByName(`${prefix}${suffix}`)
    if (slotControl === undefined) continue
    getOrCreateIcon(slotControl).SetHidden(!isTemperLocked(bagId, equipSlot))
  }
}

export function refreshEquipmentLockOverlays(): undefined {
  refreshSlots(CHARACTER_PREFIX, BAG_WORN)
  refreshSlots(COMPANION_PREFIX, BAG_COMPANION_WORN)
}

export function registerEquipmentLockOverlay(): undefined {
  const characterWindow = WINDOW_MANAGER.GetControlByName(CHARACTER_WINDOW)
  if (characterWindow !== undefined) {
    ZO_PostHookHandler(characterWindow, "OnEffectivelyShown", function (this: void): undefined {
      refreshEquipmentLockOverlays()
    })
  }
  const companionWindow = WINDOW_MANAGER.GetControlByName(COMPANION_WINDOW)
  if (companionWindow !== undefined) {
    ZO_PostHookHandler(companionWindow, "OnEffectivelyShown", function (this: void): undefined {
      refreshEquipmentLockOverlays()
    })
  }
  EVENT_MANAGER.RegisterForEvent(
    EVENT_NAMESPACE,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void, _event: number, bagId: number): undefined {
      if (bagId !== BAG_WORN && bagId !== BAG_COMPANION_WORN) return
      refreshEquipmentLockOverlays()
    }
  )
}
