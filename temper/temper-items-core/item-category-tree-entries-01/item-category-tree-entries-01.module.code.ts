export const ITEM_CATEGORY_TREE_ENTRIES_01 = {
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
} as const
