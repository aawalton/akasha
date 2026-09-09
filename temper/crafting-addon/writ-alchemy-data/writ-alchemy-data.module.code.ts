import { add as logAdd } from "../writ-log/writ-log.module.code.ts"

export interface Effect {
  effect_id: number
  name: string
  negates: Effect | undefined
  reagents: Record<string, Reagent | undefined>
}

export interface Reagent {
  name: string
  effects: Record<string, Effect | undefined>
  mat?: import("../writ-types/writ-types.module.code.ts").MatRow | undefined
}

export type ReagentThree = [Reagent, Reagent, Reagent]

const EFFECTS: Record<string | number, Effect | undefined> = {}
const REAGENTS: Record<string, Reagent | undefined> = {}

export function effectById(effectId: number): Effect | undefined {
  return EFFECTS[effectId]
}

export function newEffect(effectId: number, name: string, negates?: Effect): Effect {
  const o: Effect = {
    effect_id: effectId,
    name,
    negates: undefined,
    reagents: {},
  }

  EFFECTS[name] = o
  EFFECTS[effectId] = o

  if (negates !== undefined) {
    o.negates = negates
    negates.negates = o
  }

  return o
}

export function newReagent(name: string, effectList: Effect[]): Reagent {
  const o: Reagent = {
    name,
    effects: {},
  }

  REAGENTS[name] = o

  for (const effect of effectList) {
    o.effects[effect.name] = effect
    effect.reagents[o.name] = o
  }

  return o
}

export function possible(
  effect: Effect,
  reagent1: Reagent,
  reagent2: Reagent,
  reagent3: Reagent
): number | false {
  let ct = 0
  if (effect.reagents[reagent1.name] !== undefined) {
    ct = ct + 1
  }
  if (effect.reagents[reagent2.name] !== undefined) {
    ct = ct + 1
  }
  if (effect.reagents[reagent3.name] !== undefined) {
    ct = ct + 1
  }
  if (ct < 2) {
    return false
  }

  const negateName = effect.negates?.name
  if (negateName === undefined) {
    return ct
  }
  if (
    reagent1.effects[negateName] !== undefined ||
    reagent2.effects[negateName] !== undefined ||
    reagent3.effects[negateName] !== undefined
  ) {
    return false
  }

  return ct
}

export function winner(
  effect1: Effect,
  effect2: Effect,
  effect3: Effect,
  reagent1: Reagent,
  reagent2: Reagent,
  reagent3: Reagent
): boolean {
  if (reagent1 === reagent2 || reagent2 === reagent3 || reagent3 === reagent1) {
    return false
  }

  if (
    possible(effect1, reagent1, reagent2, reagent3) !== false &&
    possible(effect2, reagent1, reagent2, reagent3) !== false &&
    possible(effect3, reagent1, reagent2, reagent3) !== false
  ) {
    return true
  }
  return false
}

export function nameLessThan(a: Reagent | undefined, b: Reagent | undefined): boolean {
  if (a !== undefined && b !== undefined) {
    return a.name < b.name
  }
  if (b !== undefined) {
    return true
  }
  if (a !== undefined) {
    return false
  }
  return false
}

export function toReagentThreeList(
  effect1: Effect,
  effect2: Effect,
  effect3: Effect
): ReagentThree[] {
  const pool1: Record<string, Reagent | undefined> = {}
  for (const [, reagent] of pairs(effect1.reagents)) {
    if (reagent !== undefined) {
      pool1[reagent.name] = reagent
    }
  }

  const pool23: Record<string, Reagent | undefined> = {}
  for (const reagentSet of [effect1.reagents, effect2.reagents, effect3.reagents]) {
    for (const [, reagent] of pairs(reagentSet)) {
      if (reagent !== undefined) {
        pool23[reagent.name] = reagent
      }
    }
  }

  const r3list: ReagentThree[] = []
  const seen: Record<string, boolean | undefined> = {}
  for (const [, reagent1] of pairs(pool1)) {
    if (reagent1 === undefined) {
      continue
    }
    for (const [i, reagent2] of pairs(pool23)) {
      if (reagent2 === undefined) {
        continue
      }
      for (const [j, reagent3] of pairs(pool23)) {
        if (reagent3 === undefined) {
          continue
        }
        if (i < j) {
          const rnames = [reagent1.name, reagent2.name, reagent3.name]
          table.sort(rnames)
          const rkey = rnames[0] + "+" + rnames[1] + "+" + rnames[2]
          if (seen[rkey] !== true) {
            seen[rkey] = true
            if (winner(effect1, effect2, effect3, reagent1, reagent2, reagent3)) {
              const r3: ReagentThree = [reagent1, reagent2, reagent3]
              table.sort(r3, nameLessThan)
              logAdd("r3list:" + r3[0].name + "  " + r3[1].name + "  " + r3[2].name)
              r3list[r3list.length] = r3
            }
          }
        }
      }
    }
  }
  return r3list
}

const BREACH = newEffect(8, "Breach")
const COWARDICE = newEffect(12, "Cowardice")
const DEFILE = newEffect(30, "Defile")
const DETECTION = newEffect(21, "Detection")
const ENERVATION = newEffect(18, "Enervation")
const ENTRAPMENT = newEffect(20, "Entrapment")
const FRACTURE = newEffect(10, "Fracture")
const GRADUAL_RAVAGE_HEALTH = newEffect(28, "Gradual Ravage Health")
const HINDRANCE = newEffect(24, "Hindrance")
const INCREASE_ARMOR = newEffect(9, "Increase Armor", FRACTURE)
const INCREASE_SPELL_POWER = newEffect(11, "Increase Spell Power", COWARDICE)
const INCREASE_SPELL_RESIST = newEffect(7, "Increase Spell Resist", BREACH)
const INCREASE_WEAPON_POWER = newEffect(13, "Increase Weapon Power")
const INVISIBLE = newEffect(22, "Invisible", DETECTION)
const LINGERING_HEALTH = newEffect(27, "Lingering Health", GRADUAL_RAVAGE_HEALTH)
const MAIM = newEffect(14, "Maim", INCREASE_WEAPON_POWER)
const PROTECTION = newEffect(25, "Protection")
const RAVAGE_HEALTH = newEffect(2, "Ravage Health")
const RAVAGE_MAGICKA = newEffect(4, "Ravage Magicka")
const RAVAGE_STAMINA = newEffect(6, "Ravage Stamina")
const RESTORE_HEALTH = newEffect(1, "Restore Health", RAVAGE_HEALTH)
const RESTORE_MAGICKA = newEffect(3, "Restore Magicka", RAVAGE_MAGICKA)
const RESTORE_STAMINA = newEffect(5, "Restore Stamina", RAVAGE_STAMINA)
const SPEED = newEffect(23, "Speed", HINDRANCE)
const SPELL_CRITICAL = newEffect(15, "Spell Critical")
const UNCERTAINTY = newEffect(16, "Uncertainty", SPELL_CRITICAL)
const UNSTOPPABLE = newEffect(19, "Unstoppable", ENTRAPMENT)
const VITALITY = newEffect(29, "Vitality", DEFILE)
const VULNERABILITY = newEffect(26, "Vulnerability", PROTECTION)
const WEAPON_CRITICAL = newEffect(17, "Weapon Critical", ENERVATION)

newReagent("Blessed Thistle", [RESTORE_STAMINA, INCREASE_WEAPON_POWER, RAVAGE_HEALTH, SPEED])
newReagent("Blue Entoloma", [RAVAGE_MAGICKA, COWARDICE, RESTORE_HEALTH, INVISIBLE])
newReagent("Bugloss", [INCREASE_SPELL_RESIST, COWARDICE, RESTORE_HEALTH, RESTORE_MAGICKA])
newReagent("Columbine", [RESTORE_HEALTH, RESTORE_STAMINA, RESTORE_MAGICKA, UNSTOPPABLE])
newReagent("Corn Flower", [RESTORE_MAGICKA, RAVAGE_HEALTH, INCREASE_SPELL_POWER, DETECTION])
newReagent("Dragonthorn", [INCREASE_WEAPON_POWER, FRACTURE, RESTORE_STAMINA, WEAPON_CRITICAL])
newReagent("Emetic Russula", [RAVAGE_HEALTH, RAVAGE_STAMINA, RAVAGE_MAGICKA, ENTRAPMENT])
newReagent("Imp Stool", [MAIM, INCREASE_ARMOR, RAVAGE_STAMINA, ENERVATION])
newReagent("Lady's Smock", [INCREASE_SPELL_POWER, BREACH, RESTORE_MAGICKA, SPELL_CRITICAL])
newReagent("Luminous Russula", [RAVAGE_STAMINA, RESTORE_HEALTH, MAIM, HINDRANCE])
newReagent("Mountain flower", [INCREASE_ARMOR, MAIM, RESTORE_HEALTH, RESTORE_STAMINA])
newReagent("Namira's Rot", [SPELL_CRITICAL, INVISIBLE, SPEED, UNSTOPPABLE])
newReagent("Nirnroot", [RAVAGE_HEALTH, ENERVATION, UNCERTAINTY, INVISIBLE])
newReagent("Stinkhorn", [FRACTURE, INCREASE_WEAPON_POWER, RAVAGE_HEALTH, RAVAGE_STAMINA])
newReagent("Violet Coprinus", [BREACH, INCREASE_SPELL_POWER, RAVAGE_HEALTH, RAVAGE_MAGICKA])
newReagent("Water Hyacinth", [RESTORE_HEALTH, WEAPON_CRITICAL, SPELL_CRITICAL, ENTRAPMENT])
newReagent("White Cap", [COWARDICE, INCREASE_SPELL_RESIST, RAVAGE_MAGICKA, DETECTION])
newReagent("Wormwood", [WEAPON_CRITICAL, DETECTION, HINDRANCE, UNSTOPPABLE])
newReagent("Beetle Scuttle", [BREACH, PROTECTION, INCREASE_ARMOR, VITALITY])
newReagent("Butterfly Wing", [RESTORE_HEALTH, LINGERING_HEALTH, UNCERTAINTY, VITALITY])
newReagent("Fleshfly Larva", [RAVAGE_STAMINA, GRADUAL_RAVAGE_HEALTH, VULNERABILITY, VITALITY])
newReagent("Mudcrab Chitin", [INCREASE_SPELL_RESIST, PROTECTION, INCREASE_ARMOR, DEFILE])
newReagent("Nightshade", [RAVAGE_HEALTH, GRADUAL_RAVAGE_HEALTH, PROTECTION, DEFILE])
newReagent("Scrib Jelly", [RAVAGE_MAGICKA, VULNERABILITY, SPEED, LINGERING_HEALTH])
newReagent("Spider Egg", [HINDRANCE, LINGERING_HEALTH, INVISIBLE, DEFILE])
newReagent("Torchbug Thorax", [FRACTURE, DETECTION, ENERVATION, VITALITY])

export interface AlchemyNamespace {
  Effects: Record<string | number, Effect | undefined>
  Reagents: Record<string, Reagent | undefined>
  Winner: (
    this: void,
    effect1: Effect,
    effect2: Effect,
    effect3: Effect,
    reagent1: Reagent,
    reagent2: Reagent,
    reagent3: Reagent
  ) => boolean
  NameLessThan: (this: void, a: Reagent | undefined, b: Reagent | undefined) => boolean
  ToReagentThreeList: (
    this: void,
    effect1: Effect,
    effect2: Effect,
    effect3: Effect
  ) => ReagentThree[]
  Parser?: { class: string }
}

const ALCHEMY_NAMESPACE: AlchemyNamespace = {
  Effects: EFFECTS,
  Reagents: REAGENTS,
  Winner: winner,
  NameLessThan: nameLessThan,
  ToReagentThreeList: toReagentThreeList,
}

TemperWrit.Alchemy = ALCHEMY_NAMESPACE
