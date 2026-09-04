import { isTemperLocked } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"

const LOCK_TEXTURE = "EsoUI/Art/Miscellaneous/locked_up.dds"
const ICON_SIZE = 32
const ICON_CHILD_SUFFIX = "TemperLock"

const hookedDataTypes = new Set<object>()
const HOOKED_LISTS: ZoScrollListControl[] = []

function getOrCreateIcon(rowControl: Control): Control {
  const existing = rowControl.GetNamedChild(ICON_CHILD_SUFFIX)
  if (existing !== undefined) return existing
  const icon = WINDOW_MANAGER.CreateControl(
    `${rowControl.GetName()}${ICON_CHILD_SUFFIX}`,
    rowControl,
    CT_TEXTURE
  )
  icon.SetTexture(LOCK_TEXTURE)
  icon.SetDimensions(ICON_SIZE, ICON_SIZE)
  icon.SetAnchor(LEFT, rowControl, LEFT, 0, 0)
  icon.SetDrawTier(DT_HIGH)
  return icon
}

function updateRowLockIcon(
  this: void,
  rowControl: Control,
  slotData: InventoryRowSlotData
): undefined {
  const bagId = slotData.bagId
  const slotIndex = slotData.slotIndex
  if (bagId === undefined || slotIndex === undefined) return
  getOrCreateIcon(rowControl).SetHidden(!isTemperLocked(bagId, slotIndex))
}

export function registerInventoryLockOverlay(): undefined {
  for (const [invTypeKey, inv] of Object.entries(PLAYER_INVENTORY.inventories)) {
    if (inv === undefined) continue
    if (tonumber(invTypeKey) === INVENTORY_QUEST_ITEM) continue
    const listView = inv.listView
    const dataType = listView?.dataTypes?.[1]
    if (listView === undefined || dataType === undefined) continue
    if (hookedDataTypes.has(dataType)) continue
    hookedDataTypes.add(dataType)
    SecurePostHook(dataType, "setupCallback", updateRowLockIcon)
    HOOKED_LISTS.push(listView)
  }
}

export function refreshLockOverlays(): undefined {
  for (const list of HOOKED_LISTS) {
    ZO_ScrollList_RefreshVisible(list)
  }
}
