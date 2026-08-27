/**
 * Temper Item Category Tree (Generated)
 *
 * ESO item category hierarchy used by the inventory classifier, sourced
 * from the universal pages table (page type: temper-item-category-tree).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ItemCategoryTree } from "../item-category-tree-types"

export const ITEM_CATEGORY_PRIORITY = [
  "currency",
  "companion",
  "knowledge",
  "tasks",
  "consumables",
  "equipment",
  "crafting",
  "furnishings",
  "miscellaneous",
] as const

export const ITEM_CATEGORY_TREE = {
  "currency": {
    id: "currency",
    name: "Currency",
    children: [
      {
        id: "currency-gold",
        name: "Gold",
      },
      {
        id: "currency-alliance-points",
        name: "Alliance Points",
      },
      {
        id: "currency-telvar-stones",
        name: "Tel Var Stones",
      },
      {
        id: "currency-writ-vouchers",
        name: "Writ Vouchers",
      },
    ],
  },
  "companion": {
    id: "companion",
    name: "Companion",
    filterTypes: [27],
    children: [
      {
        id: "companion-weapons",
        name: "Weapons",
        traitTypeRange: [34, 42] as const,
        children: [
          {
            id: "companion-one-handed",
            name: "One-Handed",
            equipTypes: [5],
            children: [
              {
                id: "companion-sword",
                name: "Sword",
                weaponTypes: [3],
              },
              {
                id: "companion-axe",
                name: "Axe",
                weaponTypes: [1],
              },
              {
                id: "companion-mace",
                name: "Mace",
                weaponTypes: [2],
              },
              {
                id: "companion-dagger",
                name: "Dagger",
                weaponTypes: [11],
              },
            ],
          },
          {
            id: "companion-two-handed",
            name: "Two-Handed",
            equipTypes: [6],
            weaponTypes: [4, 5, 6],
            children: [
              {
                id: "companion-greatsword",
                name: "Greatsword",
                weaponTypes: [4],
              },
              {
                id: "companion-battle-axe",
                name: "Battle Axe",
                weaponTypes: [5],
              },
              {
                id: "companion-maul",
                name: "Maul",
                weaponTypes: [6],
              },
            ],
          },
          {
            id: "companion-bow",
            name: "Bow",
            weaponTypes: [8],
          },
          {
            id: "companion-destruction-staff",
            name: "Destruction Staff",
            weaponTypes: [12, 13, 15],
            children: [
              {
                id: "companion-inferno-staff",
                name: "Inferno Staff",
                weaponTypes: [12],
              },
              {
                id: "companion-ice-staff",
                name: "Ice Staff",
                weaponTypes: [13],
              },
              {
                id: "companion-lightning-staff",
                name: "Lightning Staff",
                weaponTypes: [15],
              },
            ],
          },
          {
            id: "companion-restoration-staff",
            name: "Restoration Staff",
            weaponTypes: [9],
          },
        ],
      },
      {
        id: "companion-armor",
        name: "Armor",
        traitTypeRange: [43, 51] as const,
        children: [
          {
            id: "companion-shield",
            name: "Shield",
            equipTypes: [7],
          },
          {
            id: "companion-light",
            name: "Light Armor",
            armorTypes: [1],
            children: [
              {
                id: "companion-hat",
                name: "Hat",
                equipTypes: [1],
              },
              {
                id: "companion-robe",
                name: "Robe / Jerkin",
                equipTypes: [3],
              },
              {
                id: "companion-epaulets",
                name: "Epaulets",
                equipTypes: [4],
              },
              {
                id: "companion-gloves",
                name: "Gloves",
                equipTypes: [13],
              },
              {
                id: "companion-sash",
                name: "Sash",
                equipTypes: [8],
              },
              {
                id: "companion-breeches",
                name: "Breeches",
                equipTypes: [9],
              },
              {
                id: "companion-shoes",
                name: "Shoes",
                equipTypes: [10],
              },
            ],
          },
          {
            id: "companion-medium",
            name: "Medium Armor",
            armorTypes: [2],
            children: [
              {
                id: "companion-helmet",
                name: "Helmet",
                equipTypes: [1],
              },
              {
                id: "companion-jack",
                name: "Jack",
                equipTypes: [3],
              },
              {
                id: "companion-arm-cops",
                name: "Arm Cops",
                equipTypes: [4],
              },
              {
                id: "companion-bracers",
                name: "Bracers",
                equipTypes: [13],
              },
              {
                id: "companion-belt",
                name: "Belt",
                equipTypes: [8],
              },
              {
                id: "companion-guards",
                name: "Guards",
                equipTypes: [9],
              },
              {
                id: "companion-boots",
                name: "Boots",
                equipTypes: [10],
              },
            ],
          },
          {
            id: "companion-heavy",
            name: "Heavy Armor",
            armorTypes: [3],
            children: [
              {
                id: "companion-helm",
                name: "Helm",
                equipTypes: [1],
              },
              {
                id: "companion-cuirass",
                name: "Cuirass",
                equipTypes: [3],
              },
              {
                id: "companion-pauldrons",
                name: "Pauldrons",
                equipTypes: [4],
              },
              {
                id: "companion-gauntlets",
                name: "Gauntlets",
                equipTypes: [13],
              },
              {
                id: "companion-girdle",
                name: "Girdle",
                equipTypes: [8],
              },
              {
                id: "companion-greaves",
                name: "Greaves",
                equipTypes: [9],
              },
              {
                id: "companion-sabatons",
                name: "Sabatons",
                equipTypes: [10],
              },
            ],
          },
        ],
      },
      {
        id: "companion-jewelry",
        name: "Jewelry",
        traitTypeRange: [52, 60] as const,
        children: [
          {
            id: "companion-necklace",
            name: "Necklace",
            equipTypes: [2],
          },
          {
            id: "companion-ring",
            name: "Ring",
            equipTypes: [12],
          },
        ],
      },
    ],
  },
  "knowledge": {
    id: "knowledge",
    name: "Knowledge",
    children: [
      {
        id: "recipes",
        name: "Recipes",
        itemTypes: [29],
        children: [
          {
            id: "food-recipes",
            name: "Food Recipes",
            specializedItemTypes: [170],
          },
          {
            id: "drink-recipes",
            name: "Drink Recipes",
            specializedItemTypes: [171],
          },
          {
            id: "furnishing-recipes",
            name: "Furnishing Recipes",
            specializedItemTypes: [172, 173, 174, 175, 176, 177, 178],
            children: [
              {
                id: "recipe-diagram",
                name: "Diagrams (Blacksmithing)",
                specializedItemTypes: [172],
              },
              {
                id: "recipe-pattern",
                name: "Patterns (Clothing)",
                specializedItemTypes: [173],
              },
              {
                id: "recipe-blueprint",
                name: "Blueprints (Woodworking)",
                specializedItemTypes: [177],
              },
              {
                id: "recipe-formula",
                name: "Formulas (Alchemy)",
                specializedItemTypes: [175],
              },
              {
                id: "recipe-schematic",
                name: "Schematics (Enchanting)",
                specializedItemTypes: [174],
              },
              {
                id: "recipe-design",
                name: "Designs (Provisioning)",
                specializedItemTypes: [176],
              },
              {
                id: "recipe-sketch",
                name: "Sketches (Jewelry Crafting)",
                specializedItemTypes: [178],
              },
            ],
          },
        ],
      },
      {
        id: "style-motifs",
        name: "Style Motifs",
        itemTypes: [8],
        children: [
          {
            id: "motif-books",
            name: "Motif Books",
            specializedItemTypes: [60],
          },
          {
            id: "motif-chapters",
            name: "Motif Chapters",
            specializedItemTypes: [61],
          },
        ],
      },
      {
        id: "style-pages",
        name: "Style Pages",
        specializedItemTypes: [82],
      },
      {
        id: "knowledge-collectibles",
        name: "Collectibles",
        children: [
          {
            id: "recipe-fragments",
            name: "Recipe Fragments",
            specializedItemTypes: [104],
          },
          {
            id: "collectible-fragments",
            name: "Collectible Fragments",
            specializedItemTypes: [109],
          },
          {
            id: "runebox-fragments",
            name: "Runebox Fragments",
            specializedItemTypes: [108],
          },
          {
            id: "upgrade-fragments",
            name: "Upgrade Fragments",
            specializedItemTypes: [110],
          },
          {
            id: "tribute-clues",
            name: "Tribute Clues",
            specializedItemTypes: [113],
          },
        ],
      },
      {
        id: "scribing",
        name: "Scribing",
        children: [
          {
            id: "grimoires",
            name: "Grimoires",
            specializedItemTypes: [3200],
          },
          {
            id: "scripts",
            name: "Scripts",
            itemTypes: [73],
            children: [
              {
                id: "script-focus",
                name: "Focus",
                specializedItemTypes: [3250],
              },
              {
                id: "script-signature",
                name: "Signature",
                specializedItemTypes: [3251],
              },
              {
                id: "script-affix",
                name: "Affix",
                specializedItemTypes: [3252],
              },
            ],
          },
        ],
      },
    ],
  },
  "tasks": {
    id: "tasks",
    name: "Tasks",
    children: [
      {
        id: "survey-reports",
        name: "Survey Reports",
        specializedItemTypes: [101],
        children: [
          {
            id: "survey-blacksmithing",
            name: "Blacksmithing",
            itemNameContains: "Blacksmith",
          },
          {
            id: "survey-clothing",
            name: "Clothing",
            itemNameContains: "Clothier",
          },
          {
            id: "survey-woodworking",
            name: "Woodworking",
            itemNameContains: "Woodworker",
          },
          {
            id: "survey-jewelry",
            name: "Jewelry Crafting",
            itemNameContains: "Jewelry",
          },
          {
            id: "survey-enchanting",
            name: "Enchanting",
            itemNameContains: "Enchanter",
          },
          {
            id: "survey-alchemy",
            name: "Alchemy",
            itemNameContains: "Alchemist",
          },
          {
            id: "survey-provisioning",
            name: "Provisioning",
            itemNameContains: "Provisioner",
          },
        ],
      },
      {
        id: "holiday-writs",
        name: "Holiday Writs",
        specializedItemTypes: [2760],
      },
      {
        id: "master-writs",
        name: "Master Writs",
        itemTypes: [60],
      },
      {
        id: "treasure-maps",
        name: "Treasure Maps",
        specializedItemTypes: [100],
      },
      {
        id: "museum-pieces",
        name: "Museum Pieces",
        specializedItemTypes: [103],
      },
      {
        id: "quest-items",
        name: "Quest Items",
        filterTypes: [7, 26],
      },
    ],
  },
  "consumables": {
    id: "consumables",
    name: "Consumables",
    children: [
      {
        id: "food",
        name: "Food",
        itemTypes: [4],
        children: [
          {
            id: "food-meat",
            name: "Meat",
            specializedItemTypes: [1],
          },
          {
            id: "food-fruit",
            name: "Fruit",
            specializedItemTypes: [2],
          },
          {
            id: "food-vegetable",
            name: "Vegetable",
            specializedItemTypes: [3],
          },
          {
            id: "food-savoury",
            name: "Savoury",
            specializedItemTypes: [4],
          },
          {
            id: "food-ragout",
            name: "Ragout",
            specializedItemTypes: [5],
          },
          {
            id: "food-entremet",
            name: "Entremet",
            specializedItemTypes: [6],
          },
          {
            id: "food-gourmet",
            name: "Gourmet",
            specializedItemTypes: [7],
          },
          {
            id: "food-unique",
            name: "Unique",
            specializedItemTypes: [8],
          },
        ],
      },
      {
        id: "drink",
        name: "Drink",
        itemTypes: [12],
        children: [
          {
            id: "drink-alcoholic",
            name: "Alcoholic",
            specializedItemTypes: [20],
          },
          {
            id: "drink-tea",
            name: "Tea",
            specializedItemTypes: [21],
          },
          {
            id: "drink-tonic",
            name: "Tonic",
            specializedItemTypes: [22],
          },
          {
            id: "drink-liqueur",
            name: "Liqueur",
            specializedItemTypes: [23],
          },
          {
            id: "drink-tincture",
            name: "Tincture",
            specializedItemTypes: [24],
          },
          {
            id: "drink-cordial-tea",
            name: "Cordial Tea",
            specializedItemTypes: [25],
          },
          {
            id: "drink-distillate",
            name: "Distillate",
            specializedItemTypes: [26],
          },
          {
            id: "drink-unique",
            name: "Unique",
            specializedItemTypes: [27],
          },
        ],
      },
      {
        id: "potions",
        name: "Potions",
        itemTypes: [7],
      },
      {
        id: "poisons",
        name: "Poisons",
        itemTypes: [30],
      },
      {
        id: "glyphs",
        name: "Glyphs",
        itemTypes: [3, 20, 21, 26],
      },
      {
        id: "soul-gems",
        name: "Soul Gems",
        itemTypes: [19],
      },
      {
        id: "repair-kits",
        name: "Repair Kits",
        children: [
          {
            id: "equipment-repair-kits",
            name: "Equipment Repair Kits",
            filterTypes: [3],
            itemTypes: [9],
          },
          {
            id: "crown-repair-kits",
            name: "Crown Repair Kits",
            itemTypes: [55],
          },
          {
            id: "group-repair-kits",
            name: "Group Repair Kits",
            itemTypes: [71],
          },
        ],
      },
      {
        id: "lockpicks",
        name: "Lockpicks",
        itemTypes: [22],
      },
      {
        id: "crown-items",
        name: "Crown Items",
        itemTypes: [57],
      },
      {
        id: "scrolls",
        name: "Scrolls",
        specializedItemTypes: [105],
      },
      {
        id: "skill-scrolls",
        name: "Skill Scrolls",
        itemTypes: [76],
      },
    ],
  },
  "equipment": {
    id: "equipment",
    name: "Equipment",
    children: [
      {
        id: "weapons",
        name: "Weapons",
        filterTypes: [1],
        children: [
          {
            id: "one-handed",
            name: "One-Handed",
            equipTypes: [5],
            children: [
              {
                id: "sword",
                name: "Sword",
                weaponTypes: [3],
              },
              {
                id: "axe",
                name: "Axe",
                weaponTypes: [1],
              },
              {
                id: "mace",
                name: "Mace",
                weaponTypes: [2],
              },
              {
                id: "dagger",
                name: "Dagger",
                weaponTypes: [11],
              },
            ],
          },
          {
            id: "two-handed",
            name: "Two-Handed",
            equipTypes: [6],
            weaponTypes: [4, 5, 6],
            children: [
              {
                id: "greatsword",
                name: "Greatsword",
                weaponTypes: [4],
              },
              {
                id: "battle-axe",
                name: "Battle Axe",
                weaponTypes: [5],
              },
              {
                id: "maul",
                name: "Maul",
                weaponTypes: [6],
              },
            ],
          },
          {
            id: "bow",
            name: "Bow",
            weaponTypes: [8],
          },
          {
            id: "destruction-staff",
            name: "Destruction Staff",
            weaponTypes: [12, 13, 15],
            children: [
              {
                id: "inferno-staff",
                name: "Inferno Staff",
                weaponTypes: [12],
              },
              {
                id: "ice-staff",
                name: "Ice Staff",
                weaponTypes: [13],
              },
              {
                id: "lightning-staff",
                name: "Lightning Staff",
                weaponTypes: [15],
              },
            ],
          },
          {
            id: "restoration-staff",
            name: "Restoration Staff",
            weaponTypes: [9],
          },
        ],
      },
      {
        id: "armor",
        name: "Armor",
        filterTypes: [2],
        children: [
          {
            id: "shield",
            name: "Shield",
            weaponTypes: [14],
          },
          {
            id: "light-armor",
            name: "Light Armor",
            armorTypes: [1],
            children: [
              {
                id: "light-hat",
                name: "Hat",
                equipTypes: [1],
              },
              {
                id: "light-robe",
                name: "Robe / Jerkin",
                equipTypes: [3],
              },
              {
                id: "light-epaulets",
                name: "Epaulets",
                equipTypes: [4],
              },
              {
                id: "light-gloves",
                name: "Gloves",
                equipTypes: [13],
              },
              {
                id: "light-sash",
                name: "Sash",
                equipTypes: [8],
              },
              {
                id: "light-breeches",
                name: "Breeches",
                equipTypes: [9],
              },
              {
                id: "light-shoes",
                name: "Shoes",
                equipTypes: [10],
              },
            ],
          },
          {
            id: "medium-armor",
            name: "Medium Armor",
            armorTypes: [2],
            children: [
              {
                id: "medium-helmet",
                name: "Helmet",
                equipTypes: [1],
              },
              {
                id: "medium-jack",
                name: "Jack",
                equipTypes: [3],
              },
              {
                id: "medium-arm-cops",
                name: "Arm Cops",
                equipTypes: [4],
              },
              {
                id: "medium-bracers",
                name: "Bracers",
                equipTypes: [13],
              },
              {
                id: "medium-belt",
                name: "Belt",
                equipTypes: [8],
              },
              {
                id: "medium-guards",
                name: "Guards",
                equipTypes: [9],
              },
              {
                id: "medium-boots",
                name: "Boots",
                equipTypes: [10],
              },
            ],
          },
          {
            id: "heavy-armor",
            name: "Heavy Armor",
            armorTypes: [3],
            children: [
              {
                id: "heavy-helm",
                name: "Helm",
                equipTypes: [1],
              },
              {
                id: "heavy-cuirass",
                name: "Cuirass",
                equipTypes: [3],
              },
              {
                id: "heavy-pauldrons",
                name: "Pauldrons",
                equipTypes: [4],
              },
              {
                id: "heavy-gauntlets",
                name: "Gauntlets",
                equipTypes: [13],
              },
              {
                id: "heavy-girdle",
                name: "Girdle",
                equipTypes: [8],
              },
              {
                id: "heavy-greaves",
                name: "Greaves",
                equipTypes: [9],
              },
              {
                id: "heavy-sabatons",
                name: "Sabatons",
                equipTypes: [10],
              },
            ],
          },
        ],
      },
      {
        id: "jewelry",
        name: "Jewelry",
        filterTypes: [25],
        children: [
          {
            id: "necklace",
            name: "Necklace",
            equipTypes: [2],
          },
          {
            id: "ring",
            name: "Ring",
            equipTypes: [12],
          },
        ],
      },
    ],
  },
  "crafting": {
    id: "crafting",
    name: "Crafting",
    children: [
      {
        id: "blacksmithing",
        name: "Blacksmithing",
        children: [
          {
            id: "bs-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [13],
            itemTypes: [62],
          },
          {
            id: "bs-raw",
            name: "Raw Materials",
            itemTypes: [35],
          },
          {
            id: "bs-refined",
            name: "Refined Materials",
            specializedItemTypes: [1550],
          },
          {
            id: "bs-tempers",
            name: "Tempers",
            itemTypes: [41],
          },
        ],
      },
      {
        id: "clothing",
        name: "Clothing",
        children: [
          {
            id: "cl-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [14],
            itemTypes: [62],
          },
          {
            id: "cl-raw",
            name: "Raw Materials",
            itemTypes: [39],
          },
          {
            id: "cl-refined",
            name: "Refined Materials",
            itemTypes: [40],
          },
          {
            id: "cl-tannins",
            name: "Tannins",
            itemTypes: [43],
          },
        ],
      },
      {
        id: "woodworking",
        name: "Woodworking",
        children: [
          {
            id: "ww-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [15],
            itemTypes: [62],
          },
          {
            id: "ww-raw",
            name: "Raw Materials",
            itemTypes: [37],
          },
          {
            id: "ww-refined",
            name: "Refined Materials",
            itemTypes: [38],
          },
          {
            id: "ww-resins",
            name: "Resins",
            itemTypes: [42],
          },
        ],
      },
      {
        id: "jewelry-crafting",
        name: "Jewelry Crafting",
        children: [
          {
            id: "jc-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [24],
            itemTypes: [62],
          },
          {
            id: "jc-raw",
            name: "Raw Materials",
            itemTypes: [63],
          },
          {
            id: "jc-refined",
            name: "Refined Materials",
            itemTypes: [64],
          },
          {
            id: "jc-platings",
            name: "Platings",
            itemTypes: [65],
          },
          {
            id: "jc-raw-platings",
            name: "Raw Platings",
            itemTypes: [67],
          },
        ],
      },
      {
        id: "enchanting",
        name: "Enchanting",
        children: [
          {
            id: "en-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [17],
            itemTypes: [62],
          },
          {
            id: "potency-runestones",
            name: "Potency Runestones",
            itemTypes: [51],
          },
          {
            id: "essence-runestones",
            name: "Essence Runestones",
            itemTypes: [53],
          },
          {
            id: "aspect-runestones",
            name: "Aspect Runestones",
            itemTypes: [52],
          },
        ],
      },
      {
        id: "alchemy",
        name: "Alchemy",
        children: [
          {
            id: "al-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [16],
            itemTypes: [62],
          },
          {
            id: "reagents",
            name: "Reagents",
            itemTypes: [31],
            children: [
              {
                id: "reagent-herbs",
                name: "Herbs",
                specializedItemTypes: [150],
              },
              {
                id: "reagent-fungi",
                name: "Fungi",
                specializedItemTypes: [151],
              },
              {
                id: "reagent-animal-parts",
                name: "Animal Parts",
                specializedItemTypes: [152],
              },
            ],
          },
          {
            id: "potion-solvents",
            name: "Potion Solvents",
            itemTypes: [33],
          },
          {
            id: "poison-solvents",
            name: "Poison Solvents",
            itemTypes: [58],
          },
        ],
      },
      {
        id: "provisioning",
        name: "Provisioning",
        children: [
          {
            id: "pr-furn-mat",
            name: "Furnishing Materials",
            filterTypes: [18],
            itemTypes: [62],
          },
          {
            id: "ingredients",
            name: "Ingredients",
            itemTypes: [10, 11, 27, 28],
            children: [
              {
                id: "food-ingredients",
                name: "Food Ingredients",
                specializedItemTypes: [42, 40, 41],
              },
              {
                id: "drink-ingredients",
                name: "Drink Ingredients",
                specializedItemTypes: [44, 45, 46],
              },
              {
                id: "additives",
                name: "Additives",
                specializedItemTypes: [43, 47],
              },
              {
                id: "rare-ingredients",
                name: "Rare Ingredients",
                specializedItemTypes: [48],
              },
            ],
          },
          {
            id: "fishing",
            name: "Fishing",
            children: [
              {
                id: "lures",
                name: "Lures",
                itemTypes: [16],
              },
              {
                id: "fish",
                name: "Fish",
                itemTypes: [54],
              },
            ],
          },
        ],
      },
      {
        id: "style-materials",
        name: "Style Materials",
        filterTypes: [19],
      },
      {
        id: "trait-items",
        name: "Trait Items",
        filterTypes: [20],
        children: [
          {
            id: "armor-traits",
            name: "Armor Traits",
            itemTypes: [45],
          },
          {
            id: "weapon-traits",
            name: "Weapon Traits",
            itemTypes: [46],
          },
          {
            id: "jewelry-traits",
            name: "Jewelry Traits",
            itemTypes: [66],
          },
          {
            id: "raw-traits",
            name: "Raw Traits",
            itemTypes: [68],
          },
        ],
      },
      {
        id: "scribing-ink",
        name: "Scribing Ink",
        itemTypes: [74],
      },
      {
        id: "general-crafting",
        name: "General Crafting",
        filterTypes: [4],
      },
    ],
  },
  "furnishings": {
    id: "furnishings",
    name: "Furnishings",
    filterTypes: [21],
    children: [
      {
        id: "furn-suite",
        name: "Suite",
        furnitureCategoryIds: [1],
        children: [
          {
            id: "furn-bathing-goods",
            name: "Bathing Goods",
            furnitureSubcategoryIds: [175],
          },
          {
            id: "furn-bedding",
            name: "Bedding",
            furnitureSubcategoryIds: [45],
          },
          {
            id: "furn-dividers",
            name: "Dividers",
            furnitureSubcategoryIds: [46],
          },
          {
            id: "furn-dressers",
            name: "Dressers",
            furnitureSubcategoryIds: [145],
          },
          {
            id: "furn-mirrors",
            name: "Mirrors",
            furnitureSubcategoryIds: [49],
          },
          {
            id: "furn-nightstands",
            name: "Nightstands",
            furnitureSubcategoryIds: [144],
          },
          {
            id: "furn-pillows",
            name: "Pillows",
            furnitureSubcategoryIds: [50],
          },
          {
            id: "furn-trunks",
            name: "Trunks",
            furnitureSubcategoryIds: [48],
          },
          {
            id: "furn-wardrobes",
            name: "Wardrobes",
            furnitureSubcategoryIds: [47],
          },
        ],
      },
      {
        id: "furn-parlor",
        name: "Parlor",
        furnitureCategoryIds: [2],
        children: [
          {
            id: "furn-banners",
            name: "Banners",
            furnitureSubcategoryIds: [57],
          },
          {
            id: "furn-instruments",
            name: "Instruments",
            furnitureSubcategoryIds: [54],
          },
          {
            id: "furn-knick-knacks",
            name: "Knick-Knacks",
            furnitureSubcategoryIds: [55],
          },
          {
            id: "furn-rugs-carpets",
            name: "Rugs and Carpets",
            furnitureSubcategoryIds: [52],
          },
          {
            id: "furn-sofas-couches",
            name: "Sofas and Couches",
            furnitureSubcategoryIds: [132],
          },
          {
            id: "furn-tapestries",
            name: "Tapestries",
            furnitureSubcategoryIds: [51],
          },
          {
            id: "furn-tea-tables",
            name: "Tea Tables",
            furnitureSubcategoryIds: [58],
          },
          {
            id: "furn-vases",
            name: "Vases",
            furnitureSubcategoryIds: [56],
          },
        ],
      },
      {
        id: "furn-library",
        name: "Library",
        furnitureCategoryIds: [3],
        children: [
          {
            id: "furn-desks",
            name: "Desks",
            furnitureSubcategoryIds: [60],
          },
          {
            id: "furn-literature",
            name: "Literature",
            furnitureSubcategoryIds: [61],
          },
          {
            id: "furn-maps",
            name: "Maps",
            furnitureSubcategoryIds: [63],
          },
          {
            id: "furn-shelves",
            name: "Shelves",
            furnitureSubcategoryIds: [59],
          },
          {
            id: "furn-supplies",
            name: "Supplies",
            furnitureSubcategoryIds: [62],
          },
        ],
      },
      {
        id: "furn-dining",
        name: "Dining",
        furnitureCategoryIds: [4],
        children: [
          {
            id: "furn-benches",
            name: "Benches",
            furnitureSubcategoryIds: [133],
          },
          {
            id: "furn-chairs",
            name: "Chairs",
            furnitureSubcategoryIds: [131],
          },
          {
            id: "furn-counters",
            name: "Counters",
            furnitureSubcategoryIds: [66],
          },
          {
            id: "furn-tables",
            name: "Tables",
            furnitureSubcategoryIds: [65],
          },
        ],
      },
      {
        id: "furn-courtyard",
        name: "Courtyard",
        furnitureCategoryIds: [5],
        children: [
          {
            id: "furn-fountains",
            name: "Fountains",
            furnitureSubcategoryIds: [73],
          },
          {
            id: "furn-posts-pillars",
            name: "Posts and Pillars",
            furnitureSubcategoryIds: [68],
          },
          {
            id: "furn-statues",
            name: "Statues",
            furnitureSubcategoryIds: [69],
          },
          {
            id: "furn-vehicles",
            name: "Vehicles",
            furnitureSubcategoryIds: [70],
          },
          {
            id: "furn-wells",
            name: "Wells",
            furnitureSubcategoryIds: [71],
          },
          {
            id: "furn-yard-ornaments",
            name: "Yard Ornaments",
            furnitureSubcategoryIds: [98],
          },
        ],
      },
      {
        id: "furn-undercroft",
        name: "Undercroft",
        furnitureCategoryIds: [6],
        children: [
          {
            id: "furn-basins",
            name: "Basins",
            furnitureSubcategoryIds: [136],
          },
          {
            id: "furn-grave-goods",
            name: "Grave Goods",
            furnitureSubcategoryIds: [75],
          },
          {
            id: "furn-incense",
            name: "Incense",
            furnitureSubcategoryIds: [104],
          },
          {
            id: "furn-remains",
            name: "Remains",
            furnitureSubcategoryIds: [74],
          },
          {
            id: "furn-sacred-pieces",
            name: "Sacred Pieces",
            furnitureSubcategoryIds: [106],
          },
          {
            id: "furn-soul-gems",
            name: "Soul Gems",
            furnitureSubcategoryIds: [198],
          },
          {
            id: "furn-symbolic-decor",
            name: "Symbolic Decor",
            furnitureSubcategoryIds: [105],
          },
          {
            id: "furn-torture",
            name: "Torture",
            furnitureSubcategoryIds: [76],
          },
          {
            id: "furn-urns",
            name: "Urns",
            furnitureSubcategoryIds: [77],
          },
        ],
      },
      {
        id: "furn-hearth",
        name: "Hearth",
        furnitureCategoryIds: [7],
        children: [
          {
            id: "furn-baskets-bags",
            name: "Baskets and Bags",
            furnitureSubcategoryIds: [86],
          },
          {
            id: "furn-breads-desserts",
            name: "Breads and Desserts",
            furnitureSubcategoryIds: [155],
          },
          {
            id: "furn-cabinetry",
            name: "Cabinetry",
            furnitureSubcategoryIds: [82],
          },
          {
            id: "furn-cookware",
            name: "Cookware",
            furnitureSubcategoryIds: [150],
          },
          {
            id: "furn-dishes",
            name: "Dishes",
            furnitureSubcategoryIds: [80],
          },
          {
            id: "furn-drinkware",
            name: "Drinkware",
            furnitureSubcategoryIds: [143],
          },
          {
            id: "furn-game",
            name: "Game",
            furnitureSubcategoryIds: [85],
          },
          {
            id: "furn-laundry",
            name: "Laundry",
            furnitureSubcategoryIds: [152],
          },
          {
            id: "furn-meals",
            name: "Meals",
            furnitureSubcategoryIds: [84],
          },
          {
            id: "furn-meats-cheeses",
            name: "Meats and Cheeses",
            furnitureSubcategoryIds: [154],
          },
          {
            id: "furn-pottery",
            name: "Pottery",
            furnitureSubcategoryIds: [79],
          },
          {
            id: "furn-produce",
            name: "Produce",
            furnitureSubcategoryIds: [153],
          },
          {
            id: "furn-stockroom",
            name: "Stockroom",
            furnitureSubcategoryIds: [83],
          },
          {
            id: "furn-utensils",
            name: "Utensils",
            furnitureSubcategoryIds: [81],
          },
        ],
      },
      {
        id: "furn-gallery",
        name: "Gallery",
        furnitureCategoryIds: [8],
        children: [
          {
            id: "furn-art",
            name: "Art",
            furnitureSubcategoryIds: [91],
          },
          {
            id: "furn-display",
            name: "Display",
            furnitureSubcategoryIds: [90],
          },
          {
            id: "furn-eso-plus",
            name: "ESO Plus",
            furnitureSubcategoryIds: [183],
          },
          {
            id: "furn-honors-awards",
            name: "Honors and Awards",
            furnitureSubcategoryIds: [147],
          },
          {
            id: "furn-mounted-decor",
            name: "Mounted Decor",
            furnitureSubcategoryIds: [88],
          },
          {
            id: "furn-paintings",
            name: "Paintings",
            furnitureSubcategoryIds: [53],
          },
          {
            id: "furn-thrones",
            name: "Thrones",
            furnitureSubcategoryIds: [92],
          },
          {
            id: "furn-undaunted-busts",
            name: "Undaunted Busts",
            furnitureSubcategoryIds: [89],
          },
          {
            id: "furn-undaunted-trophies",
            name: "Undaunted Trophies",
            furnitureSubcategoryIds: [156],
          },
        ],
      },
      {
        id: "furn-workshop",
        name: "Workshop",
        furnitureCategoryIds: [9],
        children: [
          {
            id: "furn-cargo",
            name: "Cargo",
            furnitureSubcategoryIds: [94],
          },
          {
            id: "furn-machinery",
            name: "Machinery",
            furnitureSubcategoryIds: [169],
          },
          {
            id: "furn-materials",
            name: "Materials",
            furnitureSubcategoryIds: [96],
          },
          {
            id: "furn-pipes-mechanisms",
            name: "Pipes and Mechanisms",
            furnitureSubcategoryIds: [158],
          },
          {
            id: "furn-stools",
            name: "Stools",
            furnitureSubcategoryIds: [134],
          },
          {
            id: "furn-tools",
            name: "Tools",
            furnitureSubcategoryIds: [95],
          },
        ],
      },
      {
        id: "furn-lighting",
        name: "Lighting",
        furnitureCategoryIds: [10],
        children: [
          {
            id: "furn-braziers",
            name: "Braziers",
            furnitureSubcategoryIds: [123],
          },
          {
            id: "furn-candles",
            name: "Candles",
            furnitureSubcategoryIds: [128],
          },
          {
            id: "furn-chandeliers",
            name: "Chandeliers",
            furnitureSubcategoryIds: [124],
          },
          {
            id: "furn-enchanted-lights",
            name: "Enchanted Lights",
            furnitureSubcategoryIds: [125],
          },
          {
            id: "furn-fires",
            name: "Fires",
            furnitureSubcategoryIds: [126],
          },
          {
            id: "furn-lamps",
            name: "Lamps",
            furnitureSubcategoryIds: [119],
          },
          {
            id: "furn-lanterns",
            name: "Lanterns",
            furnitureSubcategoryIds: [120],
          },
          {
            id: "furn-lightposts",
            name: "Lightposts",
            furnitureSubcategoryIds: [121],
          },
          {
            id: "furn-sconces",
            name: "Sconces",
            furnitureSubcategoryIds: [122],
          },
        ],
      },
      {
        id: "furn-conservatory",
        name: "Conservatory",
        furnitureCategoryIds: [11],
        children: [
          {
            id: "furn-aquatic",
            name: "Aquatic",
            furnitureSubcategoryIds: [129],
          },
          {
            id: "furn-boulders",
            name: "Boulders and Large Rocks",
            furnitureSubcategoryIds: [151],
          },
          {
            id: "furn-crystals",
            name: "Crystals",
            furnitureSubcategoryIds: [160],
          },
          {
            id: "furn-dead-wood",
            name: "Dead Wood",
            furnitureSubcategoryIds: [164],
          },
          {
            id: "furn-ferns",
            name: "Ferns",
            furnitureSubcategoryIds: [148],
          },
          {
            id: "furn-flowers",
            name: "Flowers",
            furnitureSubcategoryIds: [110],
          },
          {
            id: "furn-giant-trees",
            name: "Giant Trees",
            furnitureSubcategoryIds: [149],
          },
          {
            id: "furn-hedges",
            name: "Hedges",
            furnitureSubcategoryIds: [141],
          },
          {
            id: "furn-ice-snow",
            name: "Ice and Snow",
            furnitureSubcategoryIds: [170],
          },
          {
            id: "furn-mushrooms",
            name: "Mushrooms",
            furnitureSubcategoryIds: [142],
          },
          {
            id: "furn-plants",
            name: "Plants",
            furnitureSubcategoryIds: [108],
          },
          {
            id: "furn-saplings",
            name: "Saplings",
            furnitureSubcategoryIds: [140],
          },
          {
            id: "furn-shrubs",
            name: "Shrubs",
            furnitureSubcategoryIds: [109],
          },
          {
            id: "furn-stones-pebbles",
            name: "Stones and Pebbles",
            furnitureSubcategoryIds: [135],
          },
          {
            id: "furn-trees",
            name: "Trees",
            furnitureSubcategoryIds: [107],
          },
          {
            id: "furn-vines",
            name: "Vines",
            furnitureSubcategoryIds: [111],
          },
        ],
      },
      {
        id: "furn-structures",
        name: "Structures",
        furnitureCategoryIds: [12],
        children: [
          {
            id: "furn-blocks",
            name: "Blocks",
            furnitureSubcategoryIds: [114],
          },
          {
            id: "furn-building-components",
            name: "Building Components",
            furnitureSubcategoryIds: [116],
          },
          {
            id: "furn-buildings",
            name: "Buildings",
            furnitureSubcategoryIds: [184],
          },
          {
            id: "furn-doorways",
            name: "Doorways",
            furnitureSubcategoryIds: [162],
          },
          {
            id: "furn-planks",
            name: "Planks",
            furnitureSubcategoryIds: [115],
          },
          {
            id: "furn-platforms",
            name: "Platforms",
            furnitureSubcategoryIds: [137],
          },
          {
            id: "furn-racks",
            name: "Racks",
            furnitureSubcategoryIds: [112],
          },
          {
            id: "furn-tents",
            name: "Tents",
            furnitureSubcategoryIds: [113],
          },
          {
            id: "furn-walls-fences",
            name: "Walls and Fences",
            furnitureSubcategoryIds: [163],
          },
        ],
      },
      {
        id: "furn-miscellaneous",
        name: "Miscellaneous",
        furnitureCategoryIds: [13, 14],
        children: [
          {
            id: "furn-creatures",
            name: "Creatures",
            furnitureSubcategoryIds: [161],
          },
          {
            id: "furn-environment",
            name: "Environment",
            furnitureSubcategoryIds: [166],
          },
          {
            id: "furn-general",
            name: "General",
            furnitureSubcategoryIds: [167],
          },
        ],
      },
      {
        id: "furn-mounts",
        name: "Mounts",
        furnitureCategoryIds: [15],
        children: [
          {
            id: "furn-bears",
            name: "Bears",
            furnitureSubcategoryIds: [196],
          },
          {
            id: "furn-big-cats",
            name: "Big Cats",
            furnitureSubcategoryIds: [29],
          },
          {
            id: "furn-brekkas",
            name: "Brekkas",
            furnitureSubcategoryIds: [209],
          },
          {
            id: "furn-camels",
            name: "Camels",
            furnitureSubcategoryIds: [178],
          },
          {
            id: "furn-deer",
            name: "Deer",
            furnitureSubcategoryIds: [192],
          },
          {
            id: "furn-durzogs",
            name: "Durzogs",
            furnitureSubcategoryIds: [207],
          },
          {
            id: "furn-dwemer-spiders",
            name: "Dwemer Spiders",
            furnitureSubcategoryIds: [193],
          },
          {
            id: "furn-elephants",
            name: "Elephants",
            furnitureSubcategoryIds: [203],
          },
          {
            id: "furn-guar-kagoutis",
            name: "Guar & Kagoutis",
            furnitureSubcategoryIds: [177],
          },
          {
            id: "furn-horses",
            name: "Horses",
            furnitureSubcategoryIds: [23],
          },
          {
            id: "furn-indriks",
            name: "Indriks",
            furnitureSubcategoryIds: [210],
          },
          {
            id: "furn-multi-rider",
            name: "Multi-Rider",
            furnitureSubcategoryIds: [190],
          },
          {
            id: "furn-nix-oxen",
            name: "Nix-Oxen",
            furnitureSubcategoryIds: [176],
          },
          {
            id: "furn-ornaugs",
            name: "Ornaugs",
            furnitureSubcategoryIds: [201],
          },
          {
            id: "furn-quasigriffs",
            name: "Quasigriffs",
            furnitureSubcategoryIds: [212],
          },
          {
            id: "furn-rams",
            name: "Rams",
            furnitureSubcategoryIds: [211],
          },
          {
            id: "furn-senche-raht",
            name: "Senche-Raht",
            furnitureSubcategoryIds: [194],
          },
          {
            id: "furn-special-mounts",
            name: "Special",
            furnitureSubcategoryIds: [205],
          },
          {
            id: "furn-tharrikers",
            name: "Tharrikers",
            furnitureSubcategoryIds: [215],
          },
          {
            id: "furn-toys",
            name: "Toys",
            furnitureSubcategoryIds: [195],
          },
          {
            id: "furn-ursauks",
            name: "Ursauks",
            furnitureSubcategoryIds: [214],
          },
          {
            id: "furn-vvardvarks",
            name: "Vvardvarks",
            furnitureSubcategoryIds: [208],
          },
          {
            id: "furn-welwas",
            name: "Welwas",
            furnitureSubcategoryIds: [213],
          },
          {
            id: "furn-wolves",
            name: "Wolves",
            furnitureSubcategoryIds: [191],
          },
        ],
      },
      {
        id: "furn-services",
        name: "Services",
        furnitureCategoryIds: [24, 25],
        children: [
          {
            id: "furn-armory-assistants",
            name: "Armory Assistants",
            furnitureSubcategoryIds: [199],
          },
          {
            id: "furn-banking-assistants",
            name: "Banking Assistants",
            furnitureSubcategoryIds: [30],
          },
          {
            id: "furn-crafting-stations",
            name: "Crafting Stations",
            furnitureSubcategoryIds: [103],
          },
          {
            id: "furn-deconstruction-assistants",
            name: "Deconstruction Assistants",
            furnitureSubcategoryIds: [200],
          },
          {
            id: "furn-houseguests",
            name: "Houseguests",
            furnitureSubcategoryIds: [188],
          },
          {
            id: "furn-lunar-champion",
            name: "Lunar Champion Tablets",
            furnitureSubcategoryIds: [185],
          },
          {
            id: "furn-merchant-assistants",
            name: "Merchant Assistants",
            furnitureSubcategoryIds: [31],
          },
          {
            id: "furn-mundus-stones",
            name: "Mundus Stones",
            furnitureSubcategoryIds: [159],
          },
          {
            id: "furn-music-boxes",
            name: "Music Boxes",
            furnitureSubcategoryIds: [181],
          },
          {
            id: "furn-recovery",
            name: "Recovery",
            furnitureSubcategoryIds: [197],
          },
          {
            id: "furn-special-services",
            name: "Special",
            furnitureSubcategoryIds: [186],
          },
          {
            id: "furn-storage",
            name: "Storage",
            furnitureSubcategoryIds: [171],
          },
          {
            id: "furn-time-of-day",
            name: "Time of Day Control",
            furnitureSubcategoryIds: [202],
          },
          {
            id: "furn-training-dummies",
            name: "Training Dummies",
            furnitureSubcategoryIds: [97],
          },
          {
            id: "furn-traps",
            name: "Traps",
            furnitureSubcategoryIds: [182],
          },
          {
            id: "furn-vampire-utility",
            name: "Vampire Utility",
            furnitureSubcategoryIds: [189],
          },
          {
            id: "furn-weather-control",
            name: "Weather Control",
            furnitureSubcategoryIds: [206],
          },
        ],
      },
      {
        id: "furn-pets",
        name: "Non-Combat Pets",
        furnitureCategoryIds: [32],
        children: [
          {
            id: "furn-creepy-crawlies",
            name: "Creepy Crawlies",
            furnitureSubcategoryIds: [40],
          },
          {
            id: "furn-daedric",
            name: "Daedric",
            furnitureSubcategoryIds: [37],
          },
          {
            id: "furn-domestic",
            name: "Domestic",
            furnitureSubcategoryIds: [180],
          },
          {
            id: "furn-exotic",
            name: "Exotic",
            furnitureSubcategoryIds: [179],
          },
          {
            id: "furn-flying-pets",
            name: "Flying Pets",
            furnitureSubcategoryIds: [41],
          },
          {
            id: "furn-inventory-pets",
            name: "Inventory",
            furnitureSubcategoryIds: [187],
          },
        ],
      },
      {
        id: "furn-placed",
        name: "Placed",
      },
    ],
  },
  "miscellaneous": {
    id: "miscellaneous",
    name: "Miscellaneous",
    children: [
      {
        id: "alliance-war",
        name: "Alliance War",
        children: [
          {
            id: "siege-equipment",
            name: "Siege Equipment",
            itemTypes: [6],
            children: [
              {
                id: "siege-trebuchet",
                name: "Trebuchet",
                specializedItemTypes: [400],
              },
              {
                id: "siege-ram",
                name: "Battering Ram",
                specializedItemTypes: [402],
              },
              {
                id: "siege-catapult",
                name: "Catapult",
                specializedItemTypes: [404],
              },
              {
                id: "siege-oil",
                name: "Boiling Oil",
                specializedItemTypes: [407],
              },
              {
                id: "siege-ballista",
                name: "Ballista",
                specializedItemTypes: [401],
              },
              {
                id: "siege-monster",
                name: "Monster",
                specializedItemTypes: [406],
              },
              {
                id: "siege-graveyard",
                name: "Graveyard",
                specializedItemTypes: [405],
              },
              {
                id: "siege-universal",
                name: "Universal",
                specializedItemTypes: [403],
              },
              {
                id: "siege-lancer",
                name: "Lancer",
                specializedItemTypes: [409],
              },
            ],
          },
          {
            id: "ava-repair-kits",
            name: "Repair Kits",
            itemTypes: [47],
          },
          {
            id: "recall-stones",
            name: "Recall Stones",
            itemTypes: [69],
          },
        ],
      },
      {
        id: "appearance",
        name: "Appearance",
        children: [
          {
            id: "costumes",
            name: "Costumes",
            itemTypes: [13],
          },
          {
            id: "disguises",
            name: "Disguises",
            itemTypes: [14],
          },
          {
            id: "tabards",
            name: "Tabards",
            itemTypes: [15],
          },
          {
            id: "dye-stamps",
            name: "Dye Stamps",
            itemTypes: [59],
          },
          {
            id: "mounts",
            name: "Mounts",
            itemTypes: [50],
          },
        ],
      },
      {
        id: "containers",
        name: "Containers",
        children: [
          {
            id: "container-standard",
            name: "Standard",
            specializedItemTypes: [850],
          },
          {
            id: "container-currency",
            name: "Currency",
            specializedItemTypes: [875],
          },
          {
            id: "container-event",
            name: "Event",
            specializedItemTypes: [851],
          },
          {
            id: "container-stackable",
            name: "Stackable",
            specializedItemTypes: [890],
          },
          {
            id: "container-style-page",
            name: "Style Page",
            specializedItemTypes: [852],
          },
          {
            id: "container-unopened",
            name: "Unopened",
            itemTypes: [75],
          },
          {
            id: "container-currency-type",
            name: "Currency Container",
            itemTypes: [70],
          },
          {
            id: "container-other",
            name: "Other",
            itemTypes: [18],
          },
        ],
      },
      {
        id: "tools",
        name: "Tools",
        itemTypes: [9],
      },
      {
        id: "treasures",
        name: "Treasures",
        children: [
          {
            id: "monster-trophies",
            name: "Monster Trophies",
            specializedItemTypes: [81],
          },
          {
            id: "rare-fish",
            name: "Rare Fish",
            specializedItemTypes: [80],
          },
          {
            id: "treasure",
            name: "Treasure",
            itemTypes: [56],
          },
          {
            id: "trash",
            name: "Trash",
            itemTypes: [48],
          },
        ],
      },
      {
        id: "trophies",
        name: "Trophies",
        itemTypes: [5],
        children: [
          {
            id: "trophy-keys",
            name: "Keys",
            specializedItemTypes: [107],
          },
          {
            id: "trophy-key-fragments",
            name: "Key Fragments",
            specializedItemTypes: [102],
          },
          {
            id: "trophy-toys",
            name: "Toys",
            specializedItemTypes: [111],
          },
          {
            id: "trophy-dungeon-buffs",
            name: "Dungeon Buff Ingredients",
            specializedItemTypes: [112],
          },
          {
            id: "trophy-material-upgraders",
            name: "Material Upgraders",
            specializedItemTypes: [106],
          },
        ],
      },
      {
        id: "collectibles",
        name: "Collectibles",
        filterTypes: [12],
      },
      {
        id: "junk",
        name: "Junk",
        filterTypes: [9],
      },
      {
        id: "other",
        name: "Other",
      },
    ],
  },
} as const satisfies ItemCategoryTree
