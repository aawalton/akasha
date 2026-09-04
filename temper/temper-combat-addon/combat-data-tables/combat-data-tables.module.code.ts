import {
  getFormattedAbilityName,
  LIBCOMBAT_STAT_CRITICALRESISTANCE,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
  LIBCOMBAT_STAT_PHYSICALRESISTANCE,
  LIBCOMBAT_STAT_SPELLCRIT,
  LIBCOMBAT_STAT_SPELLCRITBONUS,
  LIBCOMBAT_STAT_SPELLPENETRATION,
  LIBCOMBAT_STAT_SPELLPOWER,
  LIBCOMBAT_STAT_SPELLRESISTANCE,
  LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE,
  LIBCOMBAT_STAT_WEAPONCRIT,
  LIBCOMBAT_STAT_WEAPONCRITBONUS,
  LIBCOMBAT_STAT_WEAPONPENETRATION,
  LIBCOMBAT_STAT_WEAPONPOWER,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  getDb,
  type PenetrationDebuffKey,
} from "@akasha/temper-combat-addon/combat-saved-variables"

export const STATTYPE_NORMAL = 0
export const STATTYPE_CRITICAL = 1
export const STATTYPE_CRITICALBONUS = 2
export const STATTYPE_PENETRATION = 3
export const STATTYPE_INCSPELL = 4
export const STATTYPE_INCWEAPON = 5

export const STAT_LIST_TABLE: Record<"Spell" | "Weapon", Record<number, number>> = {
  Spell: {
    [LIBCOMBAT_STAT_MAXMAGICKA]: STATTYPE_NORMAL,
    [LIBCOMBAT_STAT_SPELLPOWER]: STATTYPE_NORMAL,
    [LIBCOMBAT_STAT_SPELLCRIT]: STATTYPE_CRITICAL,
    [LIBCOMBAT_STAT_SPELLCRITBONUS]: STATTYPE_CRITICALBONUS,
    [LIBCOMBAT_STAT_SPELLPENETRATION]: STATTYPE_PENETRATION,
    [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: STATTYPE_NORMAL,
  },
  Weapon: {
    [LIBCOMBAT_STAT_MAXSTAMINA]: STATTYPE_NORMAL,
    [LIBCOMBAT_STAT_WEAPONPOWER]: STATTYPE_NORMAL,
    [LIBCOMBAT_STAT_WEAPONCRIT]: STATTYPE_CRITICAL,
    [LIBCOMBAT_STAT_WEAPONCRITBONUS]: STATTYPE_CRITICALBONUS,
    [LIBCOMBAT_STAT_WEAPONPENETRATION]: STATTYPE_PENETRATION,
    [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: STATTYPE_NORMAL,
  },
}

export const INCOMING_STAT_LIST: Record<number, number> = {
  [LIBCOMBAT_STAT_MAXHEALTH]: STATTYPE_NORMAL,
  [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: STATTYPE_INCWEAPON,
  [LIBCOMBAT_STAT_SPELLRESISTANCE]: STATTYPE_INCSPELL,
  [LIBCOMBAT_STAT_CRITICALRESISTANCE]: STATTYPE_CRITICALBONUS,
}

export const IS_MAGICKA_ABILITY: Record<number, boolean> = {
  [DAMAGE_TYPE_MAGIC]: true,
  [DAMAGE_TYPE_FIRE]: true,
  [DAMAGE_TYPE_COLD]: true,
  [DAMAGE_TYPE_SHOCK]: true,
  [DAMAGE_TYPE_PHYSICAL]: false,
  [DAMAGE_TYPE_POISON]: false,
  [DAMAGE_TYPE_DISEASE]: false,
  [DAMAGE_TYPE_BLEED]: false,
}

const WRATH_OF_NATURE_PEN = 660

let statDebuffsCache: Record<string, Record<number, number>> | undefined

export function getStatDebuffs(): Record<string, Record<number, number>> {
  if (statDebuffsCache !== undefined) {
    return statDebuffsCache
  }
  statDebuffsCache = {
    [getFormattedAbilityName(61743)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 5948,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 5948,
    },
    [getFormattedAbilityName(61742)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 2974,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 2974,
    },
    [getFormattedAbilityName(120007)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 2108,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 2108,
    },
    [getFormattedAbilityName(17906)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 2108,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 2108,
    },
    [getFormattedAbilityName(143808)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 1000,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 1000,
    },
    [getFormattedAbilityName(120018)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 6000,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 6000,
    },
    [getFormattedAbilityName(76667)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 6000,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 6000,
    },
    [getFormattedAbilityName(159288)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 3541,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 3541,
    },
    [getFormattedAbilityName(187742)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 2200,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 2200,
    },

    [getFormattedAbilityName(178118)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(18084)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(95136)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(95134)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(178123)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(21929)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(178127)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },
    [getFormattedAbilityName(148801)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: WRATH_OF_NATURE_PEN,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: WRATH_OF_NATURE_PEN,
    },

    [getFormattedAbilityName(79087)]: { [LIBCOMBAT_STAT_SPELLPENETRATION]: 1320 },
    [getFormattedAbilityName(79090)]: { [LIBCOMBAT_STAT_WEAPONPENETRATION]: 1320 },

    [getFormattedAbilityName(80866)]: {
      [LIBCOMBAT_STAT_SPELLPENETRATION]: 2640,
      [LIBCOMBAT_STAT_WEAPONPENETRATION]: 2640,
    },

    [getFormattedAbilityName(142610)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 5,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 5,
    },
    [getFormattedAbilityName(142653)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 5,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 5,
    },
    [getFormattedAbilityName(142652)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 5,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 5,
    },
    [getFormattedAbilityName(181606)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 15,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 15,
    },

    [getFormattedAbilityName(145975)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 10,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 10,
    },
    [getFormattedAbilityName(145977)]: {
      [LIBCOMBAT_STAT_SPELLCRITBONUS]: 20,
      [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 20,
    },

    [getFormattedAbilityName(113382)]: { [LIBCOMBAT_STAT_SPELLPOWER]: 460 },

    [getFormattedAbilityName(217353)]: { [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: 100 },
  }
  return statDebuffsCache
}

export const OVERRIDE_VALUES: Record<number, number> = {
  [120018]: 6000,
  [120007]: 2108,
}

export const IGNORED_ABILITY_TIMING: Record<number, boolean> = {
  [132141]: true,
  [134160]: true,
  [135841]: true,
}

export const CHANGING_ABILITIES: Record<number, number> = {
  [61902]: 61907,
  [61919]: 61930,
  [61927]: 61932,
  [117749]: 117773,
  [117690]: 117693,
  [46324]: 114716,
}

const CHANGING_PAIRS: Array<[number, number]> = []
for (const [k, v] of pairs(CHANGING_ABILITIES)) {
  CHANGING_PAIRS[CHANGING_PAIRS.length] = [k, v]
}
for (const pair of CHANGING_PAIRS) {
  CHANGING_ABILITIES[pair[1]] = pair[0]
}

export const ABILITY_DELAY: Record<number, number> = {
  [63044]: 100,
  [63029]: 100,
  [63046]: 100,
}

export const TRIAL_DUMMY_BUFFS: Record<number, boolean> = {
  [61743]: true,
  [61742]: true,
  [79717]: true,
  [120007]: true,
  [145975]: true,
  [106754]: true,
  [120011]: true,
  [120018]: true,
  [181606]: true,
  [88401]: true,
}

export const VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS: Record<PenetrationDebuffKey, number> = {
  crusherValue: 17906,
  alkoshValue: 76667,
  tremorscaleValue: 80866,
}

export const STATUS_EFFECT_IDS: Record<number, boolean> = {
  [178118]: true,
  [18084]: true,
  [95136]: true,
  [95134]: true,
  [178123]: true,
  [21929]: true,
  [178127]: true,
  [148801]: true,
}

export function setPenetrationDebuffValue(
  debuffKey: PenetrationDebuffKey,
  value?: number
): undefined {
  const db = getDb()
  const abilityId = VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS[debuffKey]

  let newValue = value
  if (newValue == null) {
    newValue = db[debuffKey]
  } else {
    db[debuffKey] = newValue
  }

  const abilityName = getFormattedAbilityName(abilityId)

  const statDebuff = getStatDebuffs()[abilityName]
  if (statDebuff === undefined) {
    error("tunable penetration debuff missing from StatDebuffs")
  }

  statDebuff[LIBCOMBAT_STAT_SPELLPENETRATION] = newValue
  statDebuff[LIBCOMBAT_STAT_WEAPONPENETRATION] = newValue
  return undefined
}

export const DAMAGE_RESULT_CATEGORY: Record<number, string> = {
  [ACTION_RESULT_DAMAGE]: "Normal",
  [ACTION_RESULT_DOT_TICK]: "Normal",
  [ACTION_RESULT_CRITICAL_DAMAGE]: "Critical",
  [ACTION_RESULT_DOT_TICK_CRITICAL]: "Critical",
  [ACTION_RESULT_BLOCKED_DAMAGE]: "Blocked",
  [ACTION_RESULT_DAMAGE_SHIELDED]: "Shielded",
}

export const HEAL_RESULT_CATEGORY: Record<number, string> = {
  [ACTION_RESULT_HEAL]: "Normal",
  [ACTION_RESULT_HOT_TICK]: "Normal",
  [ACTION_RESULT_CRITICAL_HEAL]: "Critical",
  [ACTION_RESULT_HOT_TICK_CRITICAL]: "Critical",
  [ACTION_RESULT_DAMAGE_SHIELDED]: "Normal",
}
