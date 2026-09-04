export const ITEM_CATEGORY_TREE_ENTRIES_02 = {
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
} as const
