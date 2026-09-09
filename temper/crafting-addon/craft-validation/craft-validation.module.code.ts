import * as Characters from "../craft-characters/craft-characters.module.code.ts"
import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"
import { needAppend } from "../craft-research-tracking/craft-research-tracking.module.code.ts"
import { RUNE } from "../craft-rune/craft-rune.module.code.ts"
import { splitLink, stripLink } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: missing data table entry")

export function getTrait(
  link: string | undefined
): LuaMultiReturn<[craft: number, line: number, trait: number] | [craft: false]> {
  if (link === undefined) {
    return $multi(false)
  }
  const actorCategory = GetItemLinkActorCategory(link)
  if (actorCategory !== 0) {
    return $multi(false)
  }
  let [trait] = GetItemLinkTraitInfo(link)
  const eq = GetItemLinkEquipType(link)
  let craft: number | undefined
  if (!isValidEquip(eq) || !isValidTrait(trait)) {
    return $multi(false)
  }
  const at = GetItemLinkArmorType(link)
  const wt = GetItemLinkWeaponType(link)
  let line: number | undefined
  if (trait === ITEM_TRAIT_TYPE_ARMOR_NIRNHONED) {
    trait = 19
    if (at === ARMORTYPE_NONE) {
      trait = 19
    }
  }
  if (trait === ITEM_TRAIT_TYPE_WEAPON_NIRNHONED) {
    trait = 9
    if (wt === WEAPONTYPE_NONE) {
      trait = 19
    }
  }
  if (wt === WEAPONTYPE_AXE) {
    craft = 1
    line = 1
  } else if (wt === WEAPONTYPE_HAMMER) {
    craft = 1
    line = 2
  } else if (wt === WEAPONTYPE_SWORD) {
    craft = 1
    line = 3
  } else if (wt === WEAPONTYPE_TWO_HANDED_AXE) {
    craft = 1
    line = 4
  } else if (wt === WEAPONTYPE_TWO_HANDED_HAMMER) {
    craft = 1
    line = 5
  } else if (wt === WEAPONTYPE_TWO_HANDED_SWORD) {
    craft = 1
    line = 6
  } else if (wt === WEAPONTYPE_DAGGER) {
    craft = 1
    line = 7
  } else if (wt === WEAPONTYPE_BOW) {
    craft = 6
    line = 1
  } else if (wt === WEAPONTYPE_FIRE_STAFF) {
    craft = 6
    line = 2
  } else if (wt === WEAPONTYPE_FROST_STAFF) {
    craft = 6
    line = 3
  } else if (wt === WEAPONTYPE_LIGHTNING_STAFF) {
    craft = 6
    line = 4
  } else if (wt === WEAPONTYPE_HEALING_STAFF) {
    craft = 6
    line = 5
  } else if (wt === WEAPONTYPE_SHIELD) {
    craft = 6
    line = 6
    trait = trait - 10
  } else if (eq === EQUIP_TYPE_CHEST) {
    line = 1
  } else if (eq === EQUIP_TYPE_FEET) {
    line = 2
  } else if (eq === EQUIP_TYPE_HAND) {
    line = 3
  } else if (eq === EQUIP_TYPE_HEAD) {
    line = 4
  } else if (eq === EQUIP_TYPE_LEGS) {
    line = 5
  } else if (eq === EQUIP_TYPE_SHOULDERS) {
    line = 6
  } else if (eq === EQUIP_TYPE_WAIST) {
    line = 7
  }
  if (eq === EQUIP_TYPE_RING || eq === EQUIP_TYPE_NECK) {
    craft = 7
    line = eq === EQUIP_TYPE_RING ? 1 : 2
    if (trait === ITEM_TRAIT_TYPE_JEWELRY_ARCANE) {
      trait = 1
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_HEALTHY) {
      trait = 2
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_ROBUST) {
      trait = 3
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_TRIUNE) {
      trait = 4
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_INFUSED) {
      trait = 5
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE) {
      trait = 6
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_SWIFT) {
      trait = 7
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_HARMONY) {
      trait = 8
    } else if (trait === ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY) {
      trait = 9
    }
  } else {
    if (at === ARMORTYPE_HEAVY) {
      craft = 1
      line = defined(line) + 7
      trait = trait - 10
    }
    if (at === ARMORTYPE_MEDIUM) {
      craft = 2
      line = defined(line) + 7
      trait = trait - 10
    }
    if (at === ARMORTYPE_LIGHT) {
      craft = 2
      trait = trait - 10
    }
  }
  if (craft !== undefined && line !== undefined && trait !== undefined) {
    if (craft < 1 || line < 1 || trait < 1) {
      return $multi(false)
    } else {
      return $multi(craft, line, trait)
    }
  } else {
    return $multi(false)
  }
}

export function isValidEquip(equip: number): boolean {
  if (
    equip === EQUIP_TYPE_CHEST ||
    equip === EQUIP_TYPE_FEET ||
    equip === EQUIP_TYPE_HAND ||
    equip === EQUIP_TYPE_HEAD ||
    equip === EQUIP_TYPE_LEGS ||
    equip === EQUIP_TYPE_MAIN_HAND ||
    equip === EQUIP_TYPE_OFF_HAND ||
    equip === EQUIP_TYPE_ONE_HAND ||
    equip === EQUIP_TYPE_TWO_HAND ||
    equip === EQUIP_TYPE_SHOULDERS ||
    equip === EQUIP_TYPE_WAIST ||
    equip === EQUIP_TYPE_RING ||
    equip === EQUIP_TYPE_NECK
  ) {
    return true
  } else {
    return false
  }
}

export function isValidTrait(trait: number): boolean {
  if (
    trait !== ITEM_TRAIT_TYPE_NONE &&
    trait !== ITEM_TRAIT_TYPE_ARMOR_INTRICATE &&
    trait !== ITEM_TRAIT_TYPE_ARMOR_ORNATE &&
    trait !== ITEM_TRAIT_TYPE_WEAPON_INTRICATE &&
    trait !== ITEM_TRAIT_TYPE_WEAPON_ORNATE &&
    trait !== ITEM_TRAIT_TYPE_JEWELRY_INTRICATE &&
    trait !== ITEM_TRAIT_TYPE_JEWELRY_ORNATE
  ) {
    return true
  } else {
    return false
  }
}

export function getItemQuantity(
  link: string,
  storage?: string | false
): Array<[string, number]> | false {
  if (storage === undefined || storage === false) {
    storage = false
  }
  const qty: Array<[string, number]> = []
  const stripedLink = stripLink(link)
  const slotStorage = STATE.Account.storage[stripedLink]
  if (slotStorage !== undefined) {
    for (const [location, stock] of pairs(slotStorage)) {
      if (storage === false || storage === location) {
        qty.push([location, stock])
      }
    }
    return qty
  }
  return false
}

export function isResearchable(link: string, current?: boolean): Array<[string, boolean]> | false {
  if (!current) {
    current = false
  }
  const needed: Array<[string, boolean]> = []
  const [craft, line, trait] = getTrait(link)
  if (craft !== false && line !== undefined && trait !== undefined) {
    for (const [, char] of ipairs(Characters.getCharacters())) {
      if (current === false || (char === STATE.CurrentPlayer && current === true)) {
        needed.push([char, !Knowledge.isResearchKnown(char, craft, line, trait)])
      }
    }
    return needed
  }
  return false
}

export function isLearnable(link: string, current?: boolean): Array<[string, boolean]> {
  if (!current) {
    current = false
  }
  const needed: Array<[string, boolean]> = []
  for (const [, char] of ipairs(Characters.getCharacters())) {
    if (current === false || (char === STATE.CurrentPlayer && current === true)) {
      needed.push([char, !Knowledge.isItemKnownByLink(char, link)])
    }
  }
  return needed
}

export function isItemNeeded(
  craft: number | false | undefined,
  line: number | false | undefined,
  trait: number | false | undefined,
  id: string | false | undefined,
  link: string
): LuaMultiReturn<[need: string, unneed: string, researching: string] | []> {
  if (
    craft === undefined ||
    craft === false ||
    line === undefined ||
    line === false ||
    trait === undefined ||
    trait === false
  ) {
    return $multi()
  }
  if (craft < 1 || line < 1 || trait < 1) {
    return $multi()
  }
  const [isSet] = GetItemLinkSetInfo(link, false)
  let mark = true
  const need: string[] = []
  const unneed: string[] = []
  const storedId =
    defined(defined(defined(STATE.Account.crafting.stored[craft])[line])[trait]).id ?? 0
  if (!STATE.Account.options.marksetitems && isSet) {
    mark = false
  }
  STATE.SELF = false
  if (
    mark &&
    (STATE.Account.options.markduplicates === true ||
      storedId === id ||
      ((id === undefined || id === false) && storedId === 0))
  ) {
    for (const [, char] of ipairs(Characters.getCharacters())) {
      if (
        STATE.Account.trait.tracking[char] === true ||
        STATE.Account.crafting.studies[char]?.[craft]?.[line]?.[trait] === true
      ) {
        if (!Knowledge.isResearchKnown(char, craft, line, trait)) {
          if (char === STATE.CurrentPlayer) {
            STATE.SELF = true
          }
          need.push(`|cFF1010${char}|r`)
        } else {
          unneed.push(`|c00FF00${char}|r`)
        }
      }
    }
  }
  return needAppend(need, unneed)
}

export function isStyleNeeded(
  link: string
): LuaMultiReturn<[need: string, unneed: string, researching: string]> {
  STATE.SELF = false
  const need: string[] = []
  const unneed: string[] = []
  const id = splitLink(link, 3)
  if (id !== false && id !== undefined) {
    for (const [, char] of ipairs(Characters.getCharacters())) {
      if (STATE.Account.style.tracking[char] === true) {
        if (!Knowledge.isItemKnownByLink(char, link)) {
          if (char === STATE.CurrentPlayer) {
            STATE.SELF = true
          }
          need.push(`|cFF1010${char}|r`)
        } else {
          unneed.push(`|c00FF00${char}|r`)
        }
      }
    }
  }
  return needAppend(need, unneed)
}

export function isRecipeNeeded(
  link: string
): LuaMultiReturn<[need: string, unneed: string, researching: string]> {
  STATE.SELF = false
  const id = splitLink(link, 3)
  const need: string[] = []
  const unneed: string[] = []
  if (id !== false && id !== undefined) {
    for (const [, char] of ipairs(Characters.getCharacters())) {
      if (STATE.Account.cook.tracking[char] === true) {
        if (!Knowledge.isItemKnownByLink(char, link)) {
          if (char === STATE.CurrentPlayer) {
            STATE.SELF = true
          }
          need.push(`|cFF1010${char}|r`)
        } else {
          unneed.push(`|c00FF00${char}|r`)
        }
      }
    }
  }
  return needAppend(need, unneed)
}

export function isBlueprintNeeded(
  link: string
): LuaMultiReturn<[need: string, unneed: string, researching: string]> {
  STATE.SELF = false
  const id = splitLink(link, 3)
  const need: string[] = []
  const unneed: string[] = []
  if (id !== false && id !== undefined) {
    for (const [, char] of ipairs(Characters.getCharacters())) {
      if (STATE.Account.furnisher.tracking[char] === true) {
        if (!Knowledge.isItemKnownByLink(char, link)) {
          if (char === STATE.CurrentPlayer) {
            STATE.SELF = true
          }
          need.push(`|cFF1010${char}|r`)
        } else {
          unneed.push(`|c00FF00${char}|r`)
        }
      }
    }
  }
  return needAppend(need, unneed)
}

export function isBait(link: string | undefined): string {
  if (link === undefined) {
    return ""
  }
  const id = splitLink(link, 3)
  const bait: Record<number, number> = {
    [42877]: 1,
    [42871]: 2,
    [42873]: 2,
    [42872]: 3,
    [42874]: 3,
    [42870]: 4,
    [42876]: 4,
    [42875]: 5,
    [42869]: 5,
  }
  if (id !== false && id !== undefined) {
    const baitNames = STATE.Loc.TT[20]
    return `\n${baitNames[defined(bait[id]) - 1]}`
  }
  return ""
}

export function isPotency(link: string | undefined): string | undefined {
  if (link === undefined) {
    return ""
  }
  if (STATE.Account.options.userune === true) {
    const id = splitLink(link, 3)
    const potencyRunes = defined(RUNE.rune[ITEMTYPE_ENCHANTING_RUNE_POTENCY])
    for (const [, add] of pairs(potencyRunes)) {
      if (typeof add !== "number") {
        for (const [level, rune] of pairs(add)) {
          if (rune === id) {
            return `${STATE.Loc.level} ${defined(RUNE.level[level])}`
          }
        }
      }
    }
    return ""
  }
}
