import type { WeaponBar } from "@akasha/temper-equipment-kinds/weapon-bars"
import type { ShieldItem, WeaponItem } from "../item-composites/item-composites.module.code.ts"
import type {
  WeaponBars,
  WeaponSlotItem,
  WeaponSlotUpdateParams,
} from "../loadout-types/loadout-types.module.code.ts"
import { mergeItemData } from "../merge-item-data/merge-item-data.module.code.ts"
import { isShieldSlot, isWeaponSlot } from "../weapon-slot-access/weapon-slot-access.module.code.ts"

function isWeaponUpdate(
  updates: Partial<WeaponItem> | Partial<ShieldItem>
): updates is Partial<WeaponItem> {
  const hasType = "type" in updates && updates.type !== undefined
  if (hasType) {
    return updates.type !== "shield"
  }
  if ("poison" in updates) {
    return true
  }
  return true
}

function isShieldUpdate(
  updates: Partial<WeaponItem> | Partial<ShieldItem>
): updates is Partial<ShieldItem> {
  const hasType = "type" in updates && updates.type !== undefined
  if (hasType) {
    return updates.type === "shield"
  }
  return false
}

function updateWeaponSlotWithWeapon(
  currentSlot: { itemType: "weapon"; data: WeaponItem },
  updates: Partial<WeaponItem>
): WeaponSlotItem {
  return {
    itemType: "weapon",
    data: mergeItemData(currentSlot.data, updates),
  }
}

function updateWeaponSlotWithShield(
  currentSlot: { itemType: "shield"; data: ShieldItem },
  updates: Partial<ShieldItem>
): WeaponSlotItem {
  return {
    itemType: "shield",
    data: mergeItemData(currentSlot.data, updates),
  }
}

function createDefaultWeaponSlot(updates: Partial<WeaponItem>): WeaponSlotItem {
  return {
    itemType: "weapon",
    data: mergeItemData(
      {
        type: "no-type",
        set: "no-set",
        trait: "no-trait",
        enchantment: "no-enchant",
        poison: "no-poison",
      },
      updates
    ),
  }
}

export function updateWeaponItem(
  equipment: WeaponBars,
  slotId: "main-hand" | "off-hand",
  barId: WeaponBar,
  updates: WeaponSlotUpdateParams
): Pick<WeaponBars, "primary-weapon-bar"> | Pick<WeaponBars, "backup-weapon-bar"> {
  const currentBar = equipment[barId]
  const currentSlot = currentBar[slotId]

  let updatedSlot: WeaponSlotItem

  if (isWeaponSlot(currentSlot) && isWeaponUpdate(updates)) {
    updatedSlot = updateWeaponSlotWithWeapon(currentSlot, updates)
  } else if (isShieldSlot(currentSlot) && isShieldUpdate(updates)) {
    updatedSlot = updateWeaponSlotWithShield(currentSlot, updates)
  } else if (isWeaponSlot(currentSlot) && isShieldUpdate(updates)) {
    updatedSlot = {
      itemType: "shield",
      data: mergeItemData(
        {
          type: "shield",
          weight: "shield",
          trait: "no-trait",
          enchantment: "no-enchant",
          set: "no-set",
        },
        updates
      ),
    }
  } else if (isShieldSlot(currentSlot) && isWeaponUpdate(updates)) {
    updatedSlot = {
      itemType: "weapon",
      data: mergeItemData(
        {
          type: "no-type",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          poison: "no-poison",
        },
        updates
      ),
    }
  } else {
    if (isWeaponUpdate(updates)) {
      updatedSlot = createDefaultWeaponSlot(updates)
    } else {
      updatedSlot = {
        itemType: "shield",
        data: mergeItemData(
          {
            type: "shield",
            weight: "shield",
            trait: "no-trait",
            enchantment: "no-enchant",
            set: "no-set",
          },
          updates
        ),
      }
    }
  }

  if (barId === "primary-weapon-bar") {
    return {
      "primary-weapon-bar": {
        ...currentBar,
        [slotId]: updatedSlot,
      },
    }
  } else {
    return {
      "backup-weapon-bar": {
        ...currentBar,
        [slotId]: updatedSlot,
      },
    }
  }
}

export function removeWeaponItem(
  equipment: WeaponBars,
  slotId: "main-hand" | "off-hand",
  barId: WeaponBar
): Pick<WeaponBars, "primary-weapon-bar"> | Pick<WeaponBars, "backup-weapon-bar"> {
  const currentBar = equipment[barId]
  const emptySlot: WeaponSlotItem = {
    itemType: "weapon",
    data: {
      type: "no-type",
      set: "no-set",
      trait: "no-trait",
      enchantment: "no-enchant",
      poison: "no-poison",
      quality: "no-quality",
    },
  }

  if (barId === "primary-weapon-bar") {
    return {
      "primary-weapon-bar": {
        ...currentBar,
        [slotId]: emptySlot,
      },
    }
  } else {
    return {
      "backup-weapon-bar": {
        ...currentBar,
        [slotId]: emptySlot,
      },
    }
  }
}
