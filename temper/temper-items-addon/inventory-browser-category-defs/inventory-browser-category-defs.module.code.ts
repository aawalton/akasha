import type {
  CategoryDef,
  SubfilterDef,
} from "../inventory-browser-types/inventory-browser-types.module.code.ts"

const NO_TYPES: number[] = []

function consumableAll(): number[] {
  return [
    ITEMTYPE_CONTAINER,
    ITEMTYPE_CONTAINER_CURRENCY,
    ITEMTYPE_CONTAINER_STACKABLE,
    ITEMTYPE_FOOD,
    ITEMTYPE_DRINK,
    ITEMTYPE_POTION,
    ITEMTYPE_POISON,
    ITEMTYPE_RECIPE,
    ITEMTYPE_RACIAL_STYLE_MOTIF,
    ITEMTYPE_MASTER_WRIT,
    ITEMTYPE_AVA_REPAIR,
    ITEMTYPE_GROUP_REPAIR,
    ITEMTYPE_TOOL,
    ITEMTYPE_CROWN_REPAIR,
    ITEMTYPE_CROWN_ITEM,
    ITEMTYPE_DYE_STAMP,
    ITEMTYPE_RECALL_STONE,
  ]
}

function materialsAll(): number[] {
  return [
    ITEMTYPE_ARMOR_TRAIT,
    ITEMTYPE_BLACKSMITHING_BOOSTER,
    ITEMTYPE_BLACKSMITHING_MATERIAL,
    ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
    ITEMTYPE_CLOTHIER_BOOSTER,
    ITEMTYPE_CLOTHIER_MATERIAL,
    ITEMTYPE_CLOTHIER_RAW_MATERIAL,
    ITEMTYPE_ENCHANTING_RUNE_ASPECT,
    ITEMTYPE_ENCHANTING_RUNE_ESSENCE,
    ITEMTYPE_FISH,
    ITEMTYPE_FLAVORING,
    ITEMTYPE_FURNISHING_MATERIAL,
    ITEMTYPE_INGREDIENT,
    ITEMTYPE_JEWELRYCRAFTING_BOOSTER,
    ITEMTYPE_JEWELRYCRAFTING_MATERIAL,
    ITEMTYPE_JEWELRYCRAFTING_RAW_BOOSTER,
    ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
    ITEMTYPE_JEWELRY_RAW_TRAIT,
    ITEMTYPE_JEWELRY_TRAIT,
    ITEMTYPE_POISON_BASE,
    ITEMTYPE_POTION_BASE,
    ITEMTYPE_RAW_MATERIAL,
    ITEMTYPE_REAGENT,
    ITEMTYPE_SPICE,
    ITEMTYPE_STYLE_MATERIAL,
    ITEMTYPE_WEAPON_TRAIT,
    ITEMTYPE_WOODWORKING_BOOSTER,
    ITEMTYPE_WOODWORKING_MATERIAL,
    ITEMTYPE_WOODWORKING_RAW_MATERIAL,
  ]
}

function miscAll(): number[] {
  return [
    ITEMTYPE_GLYPH_ARMOR,
    ITEMTYPE_GLYPH_JEWELRY,
    ITEMTYPE_GLYPH_WEAPON,
    ITEMTYPE_SOUL_GEM,
    ITEMTYPE_SIEGE,
    ITEMTYPE_LURE,
    ITEMTYPE_TOOL,
    ITEMTYPE_TRASH,
    ITEMTYPE_TROPHY,
    ITEMTYPE_COLLECTIBLE,
    ITEMTYPE_FISH,
    ITEMTYPE_TREASURE,
    ITEMTYPE_LOCKPICK,
    ITEMTYPE_SCRIBING_INK,
    ITEMTYPE_CRAFTED_ABILITY,
    ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
    ITEMTYPE_TABARD,
    ITEMTYPE_DISGUISE,
    ITEMTYPE_COSTUME,
  ]
}

function bodyEquipSlots(): number[] {
  return [
    EQUIP_TYPE_HEAD,
    EQUIP_TYPE_SHOULDERS,
    EQUIP_TYPE_CHEST,
    EQUIP_TYPE_HAND,
    EQUIP_TYPE_LEGS,
    EQUIP_TYPE_FEET,
    EQUIP_TYPE_WAIST,
  ]
}

function armorWeight(armorType: number): number[] {
  const out = [armorType]
  const slots = bodyEquipSlots()
  for (let i = 0; i < slots.length; i = i + 1) {
    const slot = slots[i]
    if (slot !== undefined) out.push(slot)
  }
  return out
}

const WEAPON_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Weapons", buildTypes: () => NO_TYPES },
  {
    label: "One-Handed",
    category: "Weapons",
    buildTypes: () => [WEAPONTYPE_AXE, WEAPONTYPE_HAMMER, WEAPONTYPE_SWORD, WEAPONTYPE_DAGGER],
  },
  {
    label: "Two-Handed",
    category: "Weapons",
    buildTypes: () => [
      WEAPONTYPE_TWO_HANDED_AXE,
      WEAPONTYPE_TWO_HANDED_HAMMER,
      WEAPONTYPE_TWO_HANDED_SWORD,
    ],
  },
  { label: "Bow", category: "Weapons", buildTypes: () => [WEAPONTYPE_BOW] },
  {
    label: "Destruction Staff",
    category: "Weapons",
    buildTypes: () => [WEAPONTYPE_FIRE_STAFF, WEAPONTYPE_FROST_STAFF, WEAPONTYPE_LIGHTNING_STAFF],
  },
  { label: "Healing Staff", category: "Weapons", buildTypes: () => [WEAPONTYPE_HEALING_STAFF] },
]

const ARMOR_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Armor", buildTypes: () => NO_TYPES },
  { label: "Heavy", category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_HEAVY) },
  { label: "Medium", category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_MEDIUM) },
  { label: "Light", category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_LIGHT) },
  { label: "Clothing", category: "Armor", buildTypes: () => armorWeight(ARMORTYPE_NONE) },
  { label: "Shield", category: "Weapons", buildTypes: () => [WEAPONTYPE_SHIELD] },
]

const JEWELRY_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Jewelry", buildTypes: () => [EQUIP_TYPE_RING, EQUIP_TYPE_NECK] },
  { label: "Necklace", category: "Jewelry", buildTypes: () => [EQUIP_TYPE_NECK] },
  { label: "Ring", category: "Jewelry", buildTypes: () => [EQUIP_TYPE_RING] },
]

const CONSUMABLE_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Consumable", buildTypes: consumableAll },
  {
    label: "Food",
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_FOOD,
      SPECIALIZED_ITEMTYPE_FOOD_ENTREMET,
      SPECIALIZED_ITEMTYPE_FOOD_FRUIT,
      SPECIALIZED_ITEMTYPE_FOOD_GOURMET,
      SPECIALIZED_ITEMTYPE_FOOD_MEAT,
      SPECIALIZED_ITEMTYPE_FOOD_RAGOUT,
      SPECIALIZED_ITEMTYPE_FOOD_SAVOURY,
      SPECIALIZED_ITEMTYPE_FOOD_UNIQUE,
      SPECIALIZED_ITEMTYPE_FOOD_VEGETABLE,
    ],
  },
  {
    label: "Drink",
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_DRINK,
      SPECIALIZED_ITEMTYPE_DRINK_ALCOHOLIC,
      SPECIALIZED_ITEMTYPE_DRINK_CORDIAL_TEA,
      SPECIALIZED_ITEMTYPE_DRINK_DISTILLATE,
      SPECIALIZED_ITEMTYPE_DRINK_LIQUEUR,
      SPECIALIZED_ITEMTYPE_DRINK_TEA,
      SPECIALIZED_ITEMTYPE_DRINK_TINCTURE,
      SPECIALIZED_ITEMTYPE_DRINK_TONIC,
      SPECIALIZED_ITEMTYPE_DRINK_UNIQUE,
    ],
  },
  {
    label: "Recipe",
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_RECIPE,
      SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK,
      SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD,
    ],
  },
  { label: "Potion", category: "Consumable", buildTypes: () => [ITEMTYPE_POTION] },
  { label: "Poison", category: "Consumable", buildTypes: () => [ITEMTYPE_POISON] },
  { label: "Motif", category: "Consumable", buildTypes: () => [ITEMTYPE_RACIAL_STYLE_MOTIF] },
  { label: "Master Writ", category: "Consumable", buildTypes: () => [ITEMTYPE_MASTER_WRIT] },
  {
    label: "Container",
    category: "Consumable",
    buildTypes: () => [
      ITEMTYPE_CONTAINER,
      ITEMTYPE_CONTAINER_CURRENCY,
      ITEMTYPE_CONTAINER_STACKABLE,
    ],
  },
  {
    label: "Repair",
    category: "Consumable",
    buildTypes: () => [
      ITEMTYPE_TOOL,
      ITEMTYPE_AVA_REPAIR,
      ITEMTYPE_CROWN_REPAIR,
      ITEMTYPE_GROUP_REPAIR,
    ],
  },
  { label: "Crown Item", category: "Consumable", buildTypes: () => [ITEMTYPE_CROWN_ITEM] },
  {
    label: "Misc",
    category: "Consumable",
    buildTypes: () => [ITEMTYPE_DYE_STAMP, ITEMTYPE_RECALL_STONE],
  },
]

const MATERIALS_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Materials", buildTypes: materialsAll },
  {
    label: "Blacksmithing",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_BLACKSMITHING_RAW_MATERIAL,
      ITEMTYPE_BLACKSMITHING_MATERIAL,
      ITEMTYPE_BLACKSMITHING_BOOSTER,
    ],
  },
  {
    label: "Clothing",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_CLOTHIER_RAW_MATERIAL,
      ITEMTYPE_CLOTHIER_MATERIAL,
      ITEMTYPE_CLOTHIER_BOOSTER,
    ],
  },
  {
    label: "Woodworking",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_WOODWORKING_RAW_MATERIAL,
      ITEMTYPE_WOODWORKING_MATERIAL,
      ITEMTYPE_WOODWORKING_BOOSTER,
    ],
  },
  {
    label: "Jewelry",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_JEWELRYCRAFTING_RAW_MATERIAL,
      ITEMTYPE_JEWELRYCRAFTING_MATERIAL,
      ITEMTYPE_JEWELRYCRAFTING_BOOSTER,
    ],
  },
  {
    label: "Alchemy",
    category: "Materials",
    buildTypes: () => [ITEMTYPE_REAGENT, ITEMTYPE_POTION_BASE, ITEMTYPE_POISON_BASE],
  },
  {
    label: "Enchanting",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_ENCHANTING_RUNE_ASPECT,
      ITEMTYPE_ENCHANTING_RUNE_ESSENCE,
      ITEMTYPE_ENCHANTING_RUNE_POTENCY,
    ],
  },
  {
    label: "Provisioning",
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_INGREDIENT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_ALCOHOL,
      SPECIALIZED_ITEMTYPE_INGREDIENT_DRINK_ADDITIVE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_FOOD_ADDITIVE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_FRUIT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_MEAT,
      SPECIALIZED_ITEMTYPE_INGREDIENT_RARE,
      SPECIALIZED_ITEMTYPE_INGREDIENT_TEA,
      SPECIALIZED_ITEMTYPE_INGREDIENT_TONIC,
      SPECIALIZED_ITEMTYPE_INGREDIENT_VEGETABLE,
    ],
  },
  { label: "Style", category: "Materials", buildTypes: () => [ITEMTYPE_STYLE_MATERIAL] },
  {
    label: "Traits",
    category: "Materials",
    buildTypes: () => [
      ITEMTYPE_WEAPON_TRAIT,
      ITEMTYPE_ARMOR_TRAIT,
      ITEMTYPE_JEWELRY_TRAIT,
      ITEMTYPE_JEWELRY_RAW_TRAIT,
    ],
  },
  { label: "Furnishing", category: "Materials", buildTypes: () => [ITEMTYPE_FURNISHING_MATERIAL] },
]

const COMPANION_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Companion", buildTypes: () => NO_TYPES },
  {
    label: "Weapons",
    category: "Companion",
    buildTypes: () => [
      ITEMTYPE_WEAPON,
      WEAPONTYPE_AXE,
      WEAPONTYPE_HAMMER,
      WEAPONTYPE_SWORD,
      WEAPONTYPE_DAGGER,
      WEAPONTYPE_TWO_HANDED_AXE,
      WEAPONTYPE_TWO_HANDED_HAMMER,
      WEAPONTYPE_TWO_HANDED_SWORD,
      WEAPONTYPE_BOW,
      WEAPONTYPE_FIRE_STAFF,
      WEAPONTYPE_FROST_STAFF,
      WEAPONTYPE_LIGHTNING_STAFF,
      WEAPONTYPE_HEALING_STAFF,
    ],
  },
  {
    label: "Armor",
    category: "Companion",
    buildTypes: () => armorWeight(ITEMTYPE_ARMOR),
  },
  {
    label: "Jewelry",
    category: "Companion",
    buildTypes: () => [ITEMTYPE_ARMOR, EQUIP_TYPE_RING, EQUIP_TYPE_NECK],
  },
  {
    label: "Shield",
    category: "Companion",
    buildTypes: () => [ITEMTYPE_WEAPON, WEAPONTYPE_SHIELD],
  },
]

const MISC_SUBFILTERS: readonly SubfilterDef[] = [
  { label: "All", category: "Misc", buildTypes: miscAll },
  {
    label: "Appearance",
    category: "Appearance",
    buildTypes: () => [
      SPECIALIZED_ITEMTYPE_DISGUISE,
      SPECIALIZED_ITEMTYPE_COSTUME,
      SPECIALIZED_ITEMTYPE_TABARD,
    ],
  },
  {
    label: "Glyphs",
    category: "Misc",
    buildTypes: () => [ITEMTYPE_GLYPH_ARMOR, ITEMTYPE_GLYPH_JEWELRY, ITEMTYPE_GLYPH_WEAPON],
  },
  { label: "Soul Gem", category: "Misc", buildTypes: () => [ITEMTYPE_SOUL_GEM] },
  { label: "Siege", category: "Misc", buildTypes: () => [ITEMTYPE_SIEGE] },
  { label: "Tools", category: "Misc", buildTypes: () => [ITEMTYPE_TOOL, ITEMTYPE_LOCKPICK] },
  {
    label: "Trophy",
    category: "Specialized",
    buildTypes: () => [
      ITEMTYPE_TROPHY,
      SPECIALIZED_ITEMTYPE_FURNISHING_ATTUNABLE_STATION,
      SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_KEY,
      SPECIALIZED_ITEMTYPE_TROPHY_KEY_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_MUSEUM_PIECE,
      SPECIALIZED_ITEMTYPE_TROPHY_RECIPE_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT,
      SPECIALIZED_ITEMTYPE_TROPHY_SCROLL,
      SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT,
      SPECIALIZED_ITEMTYPE_TROPHY_TOY,
      SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP,
    ],
  },
  { label: "Bait", category: "Misc", buildTypes: () => [ITEMTYPE_LURE] },
  { label: "Stolen", category: "Stolen", buildTypes: () => NO_TYPES },
  { label: "Junk", category: "Junk", buildTypes: () => [ITEMTYPE_TRASH] },
  {
    label: "Scribing",
    category: "Misc",
    buildTypes: () => [
      ITEMTYPE_SCRIBING_INK,
      ITEMTYPE_CRAFTED_ABILITY,
      ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
    ],
  },
  {
    label: "Collectibles",
    category: "MiscSubfilter",
    buildTypes: () => [
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_MONSTER_TROPHY,
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_RARE_FISH,
      SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE,
      SPECIALIZED_ITEMTYPE_FISH,
      SPECIALIZED_ITEMTYPE_TREASURE,
    ],
  },
]

export const BROWSER_CATEGORIES: readonly CategoryDef[] = [
  { label: "All", category: "All", buildTypes: () => NO_TYPES, subfilters: [] },
  {
    label: "Weapons",
    category: "Weapons",
    buildTypes: () => NO_TYPES,
    subfilters: WEAPON_SUBFILTERS,
  },
  { label: "Armor", category: "Armor", buildTypes: () => NO_TYPES, subfilters: ARMOR_SUBFILTERS },
  {
    label: "Jewelry",
    category: "Jewelry",
    buildTypes: () => NO_TYPES,
    subfilters: JEWELRY_SUBFILTERS,
  },
  {
    label: "Consumables",
    category: "Consumable",
    buildTypes: consumableAll,
    subfilters: CONSUMABLE_SUBFILTERS,
  },
  {
    label: "Materials",
    category: "Materials",
    buildTypes: materialsAll,
    subfilters: MATERIALS_SUBFILTERS,
  },
  { label: "Furnishings", category: "Furnishing", buildTypes: () => NO_TYPES, subfilters: [] },
  {
    label: "Companion",
    category: "Companion",
    buildTypes: () => NO_TYPES,
    subfilters: COMPANION_SUBFILTERS,
  },
  { label: "Miscellaneous", category: "Misc", buildTypes: miscAll, subfilters: MISC_SUBFILTERS },
]
