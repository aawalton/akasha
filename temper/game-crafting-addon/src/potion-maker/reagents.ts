import { traitEffect } from "./constants"
import { buildReagentsById } from "./reagent-data"
import { getAccountSettings } from "./saved-variables"
import { PotMaker } from "./state"

function initVar(this: void, _lang?: string): undefined {
  const allTraitNames = PotMaker.language.traitNames
  function tn(this: void, key: string): string {
    const value = allTraitNames[key]
    if (value === undefined) {
      throw new Error("TemperPotions: missing trait name for " + key)
    }
    return value
  }
  const traitNames = tn
  const reagentsById = buildReagentsById(traitNames)

  PotMaker.allReagents = {}
  const allReagents = PotMaker.allReagents
  for (const itemId in reagentsById) {
    const reagent = reagentsById[itemId]
    if (reagent === undefined) {
      continue
    }
    reagent.itemLink =
      "|H1:item:" + tostring(reagent.itemId) + ":0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"
    for (let i = 1; i <= 4; i++) {
      const [known, traitName] = GetItemLinkReagentTraitInfo(reagent.itemLink, i)
      if (known) {
        const localizedTrait = ZO_CachedStrFormat("<<1>>", traitName)
        reagent.traits[localizedTrait] = known
      }
    }
    allReagents[reagent.itemId] = reagent
  }

  PotMaker.badTraitMatches = {
    [traitNames("Ravage Health")]: true,
    [traitNames("Ravage Magicka")]: true,
    [traitNames("Ravage Stamina")]: true,
    [traitNames("Lower Weapon Power")]: true,
    [traitNames("Lower Spell Power")]: true,
    [traitNames("Lower Weapon Crit")]: true,
    [traitNames("Lower Spell Crit")]: true,
    [traitNames("Lower Armor")]: true,
    [traitNames("Lower Spell Resist")]: true,
    [traitNames("Stun")]: true,
    [traitNames("Reduce Speed")]: true,
    [traitNames("Creeping Ravage Health")]: true,
    [traitNames("Defile")]: true,
    [traitNames("Vulnerability")]: true,
    [traitNames("Timidity")]: true,
  }

  PotMaker.oppositeTraits = {
    [traitNames("Restore Health")]: traitNames("Ravage Health"),
    [traitNames("Ravage Health")]: traitNames("Restore Health"),
    [traitNames("Restore Magicka")]: traitNames("Ravage Magicka"),
    [traitNames("Ravage Magicka")]: traitNames("Restore Magicka"),
    [traitNames("Restore Stamina")]: traitNames("Ravage Stamina"),
    [traitNames("Ravage Stamina")]: traitNames("Restore Stamina"),
    [traitNames("Increase Weapon Power")]: traitNames("Lower Weapon Power"),
    [traitNames("Lower Weapon Power")]: traitNames("Increase Weapon Power"),
    [traitNames("Increase Spell Power")]: traitNames("Lower Spell Power"),
    [traitNames("Lower Spell Power")]: traitNames("Increase Spell Power"),
    [traitNames("Weapon Crit")]: traitNames("Lower Weapon Crit"),
    [traitNames("Lower Weapon Crit")]: traitNames("Weapon Crit"),
    [traitNames("Spell Crit")]: traitNames("Lower Spell Crit"),
    [traitNames("Lower Spell Crit")]: traitNames("Spell Crit"),
    [traitNames("Increase Armor")]: traitNames("Lower Armor"),
    [traitNames("Lower Armor")]: traitNames("Increase Armor"),
    [traitNames("Increase Spell Resist")]: traitNames("Lower Spell Resist"),
    [traitNames("Lower Spell Resist")]: traitNames("Increase Spell Resist"),
    [traitNames("Unstoppable")]: traitNames("Stun"),
    [traitNames("Stun")]: traitNames("Unstoppable"),
    [traitNames("Speed")]: traitNames("Reduce Speed"),
    [traitNames("Reduce Speed")]: traitNames("Speed"),
    [traitNames("Invisible")]: traitNames("Detection"),
    [traitNames("Detection")]: traitNames("Invisible"),
    [traitNames("Vitality")]: traitNames("Defile"),
    [traitNames("Sustained Restore Health")]: traitNames("Creeping Ravage Health"),
    [traitNames("Protection")]: traitNames("Vulnerability"),
    [traitNames("Creeping Ravage Health")]: traitNames("Sustained Restore Health"),
    [traitNames("Defile")]: traitNames("Vitality"),
    [traitNames("Vulnerability")]: traitNames("Protection"),
    [traitNames("Heroism")]: traitNames("Timidity"),
    [traitNames("Timidity")]: traitNames("Heroism"),
  }

  const reagents: number[] = []
  for (const itemId in allReagents) {
    const entry = allReagents[itemId]
    if (entry !== undefined) {
      reagents[reagents.length] = entry.itemId
    }
  }
  const count = reagents.length
  for (let i = 1; i <= count; i++) {
    const others: number[] = []
    const itemId = reagents[i - 1]
    const self = itemId === undefined ? undefined : allReagents[itemId]
    if (itemId === undefined || self === undefined) {
      continue
    }
    for (let t = 1; t <= count; t++) {
      if (i !== t) {
        const otherItemId = reagents[t - 1]
        const other = otherItemId === undefined ? undefined : allReagents[otherItemId]
        if (otherItemId === undefined || other === undefined) {
          continue
        }
        let found = false
        for (const trait in self.traits) {
          if (other.traits[trait] !== undefined) {
            found = true
            break
          }
        }
        if (found) {
          others[others.length] = otherItemId
        }
      }
    }
    self.matching = others
  }

  PotMaker.traitColor = {
    [traitEffect.Bad]: ZO_ColorDef.New("FFFF7F50"),
    [traitEffect.VeryBad]: ZO_ColorDef.New("FFFF0000"),
    [traitEffect.Good]: ZO_ColorDef.New("FFCBFF8C"),
    [traitEffect.VeryGood]: ZO_ColorDef.New("FF00FF00"),
  }
}

function IsProtected(this: void, bagId: number, slotIndex: number): boolean {
  if (getAccountSettings().useItemSaver) {
    if (FCOIS) {
      if (FCOIsMarked !== undefined) {
        return FCOIsMarked(GetItemInstanceId(bagId, slotIndex), -1)
      }
      if (FCOIS.IsAlchemyDestroyLocked) {
        return FCOIS.IsAlchemyDestroyLocked(bagId, slotIndex)
      }
    }

    if (ItemSaver_IsItemSaved !== undefined) {
      const [itemSaved] = ItemSaver_IsItemSaved(bagId, slotIndex)
      if (itemSaved === true) {
        return true
      }
    }
  }
  if (FilterIt) {
    const uniqueId = GetItemUniqueId(bagId, slotIndex)
    const itemFilterId =
      uniqueId === undefined
        ? undefined
        : FilterIt.AccountSavedVariables.FilteredItems[Id64ToString(uniqueId)]
    if (itemFilterId !== undefined && itemFilterId !== FILTERIT_ALCHEMY) {
      return true
    }
  }
  return false
}

PotMaker.initVar = initVar
PotMaker.IsProtected = IsProtected
