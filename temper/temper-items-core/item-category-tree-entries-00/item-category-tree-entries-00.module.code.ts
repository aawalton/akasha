export const ITEM_CATEGORY_TREE_ENTRIES_00 = {
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
} as const
