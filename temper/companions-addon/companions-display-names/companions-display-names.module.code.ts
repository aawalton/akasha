import "@akasha/temper-eso-types/eso-enums-07"
import "@akasha/temper-eso-types/eso-enums-08"
import "@akasha/temper-eso-types/eso-enums-11"
export const ARMOR_WEIGHT_NAMES: Record<number, string> = {
  [ARMORTYPE_NONE]: "None",
  [ARMORTYPE_LIGHT]: "Light",
  [ARMORTYPE_MEDIUM]: "Medium",
  [ARMORTYPE_HEAVY]: "Heavy",
}

export const WEAPON_TYPE_NAMES: Record<number, string> = {
  [WEAPONTYPE_NONE]: "None",
  [WEAPONTYPE_SWORD]: "Sword",
  [WEAPONTYPE_AXE]: "Axe",
  [WEAPONTYPE_HAMMER]: "Mace",
  [WEAPONTYPE_DAGGER]: "Dagger",
  [WEAPONTYPE_TWO_HANDED_SWORD]: "Greatsword",
  [WEAPONTYPE_TWO_HANDED_AXE]: "Battleaxe",
  [WEAPONTYPE_TWO_HANDED_HAMMER]: "Maul",
  [WEAPONTYPE_BOW]: "Bow",
  [WEAPONTYPE_FIRE_STAFF]: "Inferno Staff",
  [WEAPONTYPE_FROST_STAFF]: "Ice Staff",
  [WEAPONTYPE_LIGHTNING_STAFF]: "Lightning Staff",
  [WEAPONTYPE_HEALING_STAFF]: "Restoration Staff",
  [WEAPONTYPE_SHIELD]: "Shield",
}

export const TRAIT_NAMES: Record<number, string> = {
  [ITEM_TRAIT_TYPE_NONE]: "No Trait",
  [ITEM_TRAIT_TYPE_ARMOR_AGGRESSIVE]: "Aggressive",
  [ITEM_TRAIT_TYPE_ARMOR_AUGMENTED]: "Augmented",
  [ITEM_TRAIT_TYPE_ARMOR_BOLSTERED]: "Bolstered",
  [ITEM_TRAIT_TYPE_ARMOR_FOCUSED]: "Focused",
  [ITEM_TRAIT_TYPE_ARMOR_PROLIFIC]: "Prolific",
  [ITEM_TRAIT_TYPE_ARMOR_QUICKENED]: "Quickened",
  [ITEM_TRAIT_TYPE_ARMOR_SHATTERING]: "Shattering",
  [ITEM_TRAIT_TYPE_ARMOR_SOOTHING]: "Soothing",
  [ITEM_TRAIT_TYPE_ARMOR_VIGOROUS]: "Vigorous",
  [ITEM_TRAIT_TYPE_JEWELRY_AGGRESSIVE]: "Aggressive",
  [ITEM_TRAIT_TYPE_JEWELRY_AUGMENTED]: "Augmented",
  [ITEM_TRAIT_TYPE_JEWELRY_BOLSTERED]: "Bolstered",
  [ITEM_TRAIT_TYPE_JEWELRY_FOCUSED]: "Focused",
  [ITEM_TRAIT_TYPE_JEWELRY_PROLIFIC]: "Prolific",
  [ITEM_TRAIT_TYPE_JEWELRY_QUICKENED]: "Quickened",
  [ITEM_TRAIT_TYPE_JEWELRY_SHATTERING]: "Shattering",
  [ITEM_TRAIT_TYPE_JEWELRY_SOOTHING]: "Soothing",
  [ITEM_TRAIT_TYPE_JEWELRY_VIGOROUS]: "Vigorous",
  [ITEM_TRAIT_TYPE_WEAPON_AGGRESSIVE]: "Aggressive",
  [ITEM_TRAIT_TYPE_WEAPON_AUGMENTED]: "Augmented",
  [ITEM_TRAIT_TYPE_WEAPON_BOLSTERED]: "Bolstered",
  [ITEM_TRAIT_TYPE_WEAPON_FOCUSED]: "Focused",
  [ITEM_TRAIT_TYPE_WEAPON_PROLIFIC]: "Prolific",
  [ITEM_TRAIT_TYPE_WEAPON_QUICKENED]: "Quickened",
  [ITEM_TRAIT_TYPE_WEAPON_SHATTERING]: "Shattering",
  [ITEM_TRAIT_TYPE_WEAPON_SOOTHING]: "Soothing",
  [ITEM_TRAIT_TYPE_WEAPON_VIGOROUS]: "Vigorous",
}

export const QUALITY_NAMES: Record<number, string> = {
  [ITEM_DISPLAY_QUALITY_TRASH]: "Trash",
  [ITEM_DISPLAY_QUALITY_NORMAL]: "Normal",
  [ITEM_DISPLAY_QUALITY_MAGIC]: "Fine",
  [ITEM_DISPLAY_QUALITY_ARCANE]: "Superior",
  [ITEM_DISPLAY_QUALITY_ARTIFACT]: "Epic",
  [ITEM_DISPLAY_QUALITY_LEGENDARY]: "Legendary",
}

export const QUALITY_COLORS: Record<number, [number, number, number]> = {
  [ITEM_DISPLAY_QUALITY_TRASH]: [0.5, 0.5, 0.5],
  [ITEM_DISPLAY_QUALITY_NORMAL]: [1, 1, 1],
  [ITEM_DISPLAY_QUALITY_MAGIC]: [0.12, 0.76, 0.12],
  [ITEM_DISPLAY_QUALITY_ARCANE]: [0.24, 0.49, 0.92],
  [ITEM_DISPLAY_QUALITY_ARTIFACT]: [0.65, 0.28, 0.86],
  [ITEM_DISPLAY_QUALITY_LEGENDARY]: [0.98, 0.86, 0.24],
}

export const SLOT_NAMES: Record<number, string> = {
  [EQUIP_SLOT_HEAD]: "Head",
  [EQUIP_SLOT_SHOULDERS]: "Shoulders",
  [EQUIP_SLOT_CHEST]: "Chest",
  [EQUIP_SLOT_HAND]: "Hands",
  [EQUIP_SLOT_WAIST]: "Waist",
  [EQUIP_SLOT_LEGS]: "Legs",
  [EQUIP_SLOT_FEET]: "Feet",
  [EQUIP_SLOT_NECK]: "Necklace",
  [EQUIP_SLOT_RING1]: "Ring 1",
  [EQUIP_SLOT_RING2]: "Ring 2",
  [EQUIP_SLOT_MAIN_HAND]: "Main Hand",
  [EQUIP_SLOT_OFF_HAND]: "Off Hand",
}
