import { championPoints } from "@akasha/temper-champion-points/champion-point-source"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { getSubcategory } from "@akasha/utils-narrow/get-subcategory"
import type { CharacterState } from "../build-types/build-types.module.code.ts"

export const createNewCharacter = (): CharacterState => ({
  id: buildId(""),
  name: "New Build",
  description: "",

  character: {
    name: "",
    roles: [],
    class: "no-class",
    race: "no-race",
    alliance: "no-alliance",
    skillLineIds: ["no-skill-line", "no-skill-line", "no-skill-line"],
    attributes: { magicka: 0, health: 0, stamina: 0 },
    curseState: "no-curse",
    vampireStage: "stage-0",
    mundusStone: "no-mundus",
  },
  equipment: {
    armor: {
      head: {
        itemType: "armor",
        data: {
          type: "head",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      shoulders: {
        itemType: "armor",
        data: {
          type: "shoulders",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      chest: {
        itemType: "armor",
        data: {
          type: "chest",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      hands: {
        itemType: "armor",
        data: {
          type: "hands",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      waist: {
        itemType: "armor",
        data: {
          type: "waist",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      legs: {
        itemType: "armor",
        data: {
          type: "legs",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      feet: {
        itemType: "armor",
        data: {
          type: "feet",
          weight: "no-weight",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
    },
    jewelry: {
      necklace: {
        itemType: "jewelry",
        data: {
          type: "necklace",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      "ring-1": {
        itemType: "jewelry",
        data: {
          type: "ring",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
      "ring-2": {
        itemType: "jewelry",
        data: {
          type: "ring",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          quality: "no-quality",
        },
      },
    },
    ["primary-weapon-bar"]: {
      ["main-hand"]: {
        itemType: "weapon",
        data: {
          type: "no-type",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          poison: "no-poison",
          quality: "no-quality",
        },
      },
      ["off-hand"]: {
        itemType: "weapon",
        data: {
          type: "no-type",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          poison: "no-poison",
          quality: "no-quality",
        },
      },
    },
    ["backup-weapon-bar"]: {
      ["main-hand"]: {
        itemType: "weapon",
        data: {
          type: "no-type",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          poison: "no-poison",
          quality: "no-quality",
        },
      },
      ["off-hand"]: {
        itemType: "weapon",
        data: {
          type: "no-type",
          set: "no-set",
          trait: "no-trait",
          enchantment: "no-enchant",
          poison: "no-poison",
          quality: "no-quality",
        },
      },
    },
  },
  skills: {
    ["primary-skill-bar"]: {
      "active-1": "no-skill",
      "active-2": "no-skill",
      "active-3": "no-skill",
      "active-4": "no-skill",
      "active-5": "no-skill",
      ultimate: "no-skill",
    },
    ["backup-skill-bar"]: {
      "active-1": "no-skill",
      "active-2": "no-skill",
      "active-3": "no-skill",
      "active-4": "no-skill",
      "active-5": "no-skill",
      ultimate: "no-skill",
    },
  },
  passives: [],
  scribing: [],
  championPoints: {
    warfare: {
      passive: [...getSubcategory(championPoints, "warfare-passives").ids],
      slotted: ["no-warfare-star", "no-warfare-star", "no-warfare-star", "no-warfare-star"],
    },
    fitness: {
      passive: [...getSubcategory(championPoints, "fitness-passives").ids],
      slotted: ["no-fitness-star", "no-fitness-star", "no-fitness-star", "no-fitness-star"],
    },
    craft: {
      passive: [...getSubcategory(championPoints, "craft-passives").ids],
      slotted: ["no-craft-star", "no-craft-star", "no-craft-star", "no-craft-star"],
    },
  },
  consumables: {
    foodOrDrink: "no-food-or-drink",
    potion: "no-potion",
    potion2: "no-potion",
  },
  target: {
    armor: "dungeon",
    health: 1,
    targetCount: 1,
  },
  account: {
    esoPlus: "no-eso-plus",
  },
})

export const createEmptyCharacter = (): CharacterState => {
  return {
    id: buildId(""),
    name: "",
    description: "",

    character: {
      name: "",
      roles: [],
      class: "no-class",
      race: "no-race",
      alliance: "no-alliance",
      skillLineIds: [],
      attributes: { magicka: 0, health: 0, stamina: 0 },
      curseState: "no-curse",
      vampireStage: "stage-0",
      mundusStone: "no-mundus",
    },
    equipment: {
      armor: {
        head: {
          itemType: "armor",
          data: {
            type: "head",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        shoulders: {
          itemType: "armor",
          data: {
            type: "shoulders",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        chest: {
          itemType: "armor",
          data: {
            type: "chest",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        hands: {
          itemType: "armor",
          data: {
            type: "hands",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        waist: {
          itemType: "armor",
          data: {
            type: "waist",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        legs: {
          itemType: "armor",
          data: {
            type: "legs",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        feet: {
          itemType: "armor",
          data: {
            type: "feet",
            weight: "no-weight",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
      },
      jewelry: {
        necklace: {
          itemType: "jewelry",
          data: {
            type: "necklace",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        "ring-1": {
          itemType: "jewelry",
          data: {
            type: "ring",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
        "ring-2": {
          itemType: "jewelry",
          data: {
            type: "ring",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            quality: "no-quality",
          },
        },
      },
      ["primary-weapon-bar"]: {
        ["main-hand"]: {
          itemType: "weapon",
          data: {
            type: "no-type",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            poison: "no-poison",
            quality: "no-quality",
          },
        },
        ["off-hand"]: {
          itemType: "weapon",
          data: {
            type: "no-type",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            poison: "no-poison",
            quality: "no-quality",
          },
        },
      },
      ["backup-weapon-bar"]: {
        ["main-hand"]: {
          itemType: "weapon",
          data: {
            type: "no-type",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            poison: "no-poison",
            quality: "no-quality",
          },
        },
        ["off-hand"]: {
          itemType: "weapon",
          data: {
            type: "no-type",
            set: "no-set",
            trait: "no-trait",
            enchantment: "no-enchant",
            poison: "no-poison",
            quality: "no-quality",
          },
        },
      },
    },
    skills: {
      ["primary-skill-bar"]: {
        "active-1": "no-skill",
        "active-2": "no-skill",
        "active-3": "no-skill",
        "active-4": "no-skill",
        "active-5": "no-skill",
        ultimate: "no-skill",
      },
      ["backup-skill-bar"]: {
        "active-1": "no-skill",
        "active-2": "no-skill",
        "active-3": "no-skill",
        "active-4": "no-skill",
        "active-5": "no-skill",
        ultimate: "no-skill",
      },
    },
    passives: [],
    scribing: [],
    championPoints: {
      warfare: {
        passive: [],
        slotted: ["no-warfare-star", "no-warfare-star", "no-warfare-star", "no-warfare-star"],
      },
      fitness: {
        passive: [],
        slotted: ["no-fitness-star", "no-fitness-star", "no-fitness-star", "no-fitness-star"],
      },
      craft: {
        passive: [],
        slotted: ["no-craft-star", "no-craft-star", "no-craft-star", "no-craft-star"],
      },
    },
    consumables: { foodOrDrink: "no-food-or-drink", potion: "no-potion", potion2: "no-potion" },
    target: {
      armor: "dungeon",
      health: 1,
      targetCount: 1,
    },
    account: {
      esoPlus: "no-eso-plus",
    },
  }
}
