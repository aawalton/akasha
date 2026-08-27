import { Cook } from "../data/cook"
import { Furnisher } from "../data/furnisher"
import { Lang } from "../lang"
import { state } from "../state"
import * as Inventory from "./inventory"
import * as ItemMark from "./item-mark"
import * as Knowledge from "./knowledge"
import * as Research from "./research"
import * as Utilities from "./utilities"

export interface CraftSkillEntry {
  level: number
  rank: number
  maxsim: number
  unknown?: number
}

export function UpdatePlayer(deactivation?: boolean): undefined {
  const account = state.Account
  deactivation = deactivation ?? false
  const GetBonus = (bonus: number, craft: number): CraftSkillEntry => {
    const [skillType, skillId] = GetCraftingSkillLineIndices(craft)
    const [, rank] = GetSkillLineInfo(skillType, skillId)
    return {
      level: GetNonCombatBonus(bonus) ?? 1,
      rank: rank,
      maxsim: GetMaxSimultaneousSmithingResearch(craft) ?? 1,
    }
  }
  if (!deactivation) {
    account.crafting.skill[state.CurrentPlayer] = [
      GetBonus(NON_COMBAT_BONUS_BLACKSMITHING_LEVEL, 1),
      GetBonus(NON_COMBAT_BONUS_CLOTHIER_LEVEL, 2),
      GetBonus(NON_COMBAT_BONUS_ENCHANTING_LEVEL, 3),
      GetBonus(NON_COMBAT_BONUS_ALCHEMY_LEVEL, 4),
      GetBonus(NON_COMBAT_BONUS_PROVISIONING_LEVEL, 5),
      GetBonus(NON_COMBAT_BONUS_WOODWORKING_LEVEL, 6),
      GetBonus(NON_COMBAT_BONUS_JEWELRYCRAFTING_LEVEL, 7),
    ]
  }
  const [rideSpace, rideMaxSpace, rideStamina, rideMaxStamina, rideSpeed, rideMaxSpeed] =
    GetRidingStats()
  let rideTime = 0
  let rideComplete = false
  if (
    !(rideSpace === rideMaxSpace && rideStamina === rideMaxStamina && rideSpeed === rideMaxSpeed)
  ) {
    const [trainMs] = GetTimeUntilCanBeTrained()
    rideTime = trainMs / 1000
    if (rideTime > 1) {
      rideTime = rideTime + GetTimeStamp()
    }
  } else {
    rideComplete = true
  }
  let level = GetUnitLevel("player")
  const levelcp = GetUnitChampionPoints("player")
  if (levelcp > 0) {
    level = 0
  }

  const [skyShards] = Utilities.GetSkyShards(true)
  account.player[state.CurrentPlayer] = {
    race: GetUnitRaceId("player"),
    class: GetUnitClassId("player"),
    level: level,
    faction: GetUnitAlliance("player"),
    mount: {
      space: `${rideSpace}/${rideMaxSpace}`,
      stamina: `${rideStamina}/${rideMaxStamina}`,
      speed: `${rideSpeed}/${rideMaxSpeed}`,
      complete: rideComplete,
      time: rideTime,
    },
    skillPoints: `${GetAvailableSkillPoints()}/${Utilities.GetTotalSpentSkillPoints() + GetAvailableSkillPoints()}`,
    skyShards: skyShards,
  }
}

export interface NameSortable {
  name: string
}
export function asort(a: NameSortable, b: NameSortable): boolean {
  return string.lower(a.name) < string.lower(b.name)
}
export interface LevelSortable extends NameSortable {
  numlevel: number
}
export function tsort(a: LevelSortable, b: LevelSortable): boolean {
  if (a.numlevel === b.numlevel) {
    return asort(a, b)
  }
  return a.numlevel > b.numlevel
}
export interface TraitSortable extends NameSortable {
  traits: number
}
export function traitsort(a: TraitSortable, b: TraitSortable): boolean {
  if (a.traits === b.traits) {
    return asort(a, b)
  }
  return a.traits < b.traits
}

export interface MotifSortable {
  motif: number
}
export function msort(a: MotifSortable, b: MotifSortable): boolean {
  return a.motif < b.motif
}

export function UpdateAccountVars(): undefined {
  const account = state.Account
  Knowledge.RebuildAll()
  Research.UpdateResearch()

  if (account.style.tracking[state.CurrentPlayer] !== true) {
    account.style.tracking[state.CurrentPlayer] = false
  }
  if (account.cook.tracking[state.CurrentPlayer] !== true) {
    account.cook.tracking[state.CurrentPlayer] = false
  }
  if (account.furnisher.tracking[state.CurrentPlayer] !== true) {
    account.furnisher.tracking[state.CurrentPlayer] = false
  }
  if (account.trait.tracking[state.CurrentPlayer] !== true) {
    account.trait.tracking[state.CurrentPlayer] = false
  }

  if (!istable(account.crafting.studies[state.CurrentPlayer])) {
    account.crafting.studies[state.CurrentPlayer] = {}
  }
}

export function UpdateRecipeKnowledge(): undefined {
  Cook.recipe = {}
  Furnisher.recipe = {}
  let cookIndex = 0
  for (const [, id] of ipairs(Cook.recipelist)) {
    const link = string.format("|H1:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", id)
    let stat = 0
    const known = IsItemLinkRecipeKnown(link)
    const reslink = GetItemLinkRecipeResultItemLink(link, LINK_STYLE_DEFAULT)
    const quality = GetItemLinkQuality(reslink)
    const [itype] = GetItemLinkItemType(reslink)
    const [, , text] = GetItemLinkOnUseAbilityInfo(reslink)
    const levelNum = GetItemLinkRequiredLevel(reslink)
    const levelcp = GetItemLinkRequiredChampionPoints(reslink)
    const numlevel = levelNum + levelcp
    let level: number | string = levelNum
    if (levelcp > 0) {
      level = `${state.ChampionPointsTexture}${levelcp}`
    }
    const statcheck = (statName: string): boolean => {
      const [pos] = string.find(text, statName)
      return pos !== undefined
    }
    let fm = statcheck(state.MagickaName)
    let fs = statcheck(state.StaminaName)
    let fh = statcheck(state.HealthName)

    const alternativeResourceNames = state.Loc.alternativeResourceNames
    if (alternativeResourceNames !== undefined) {
      if (!fh) {
        for (const [, alternativeName] of pairs(
          alternativeResourceNames[SI_ATTRIBUTES1] ??
            error("TemperCrafting: missing alternative health resource names")
        )) {
          if (statcheck(alternativeName)) {
            fh = true
          }
        }
      }

      if (!fm) {
        for (const [, alternativeName] of pairs(
          alternativeResourceNames[SI_ATTRIBUTES2] ??
            error("TemperCrafting: missing alternative magicka resource names")
        )) {
          if (statcheck(alternativeName)) {
            fm = true
          }
        }
      }

      if (!fs) {
        for (const [, alternativeName] of pairs(
          alternativeResourceNames[SI_ATTRIBUTES3] ??
            error("TemperCrafting: missing alternative stamina resource names")
        )) {
          if (statcheck(alternativeName)) {
            fs = true
          }
        }
      }
    }

    if (fm && fh && fs) {
      stat = 7
    } else if (fs && fh) {
      stat = 5
    } else if (fm && fh) {
      stat = 4
    } else if (fm && fs) {
      stat = 6
    } else if (fm) {
      stat = 2
    } else if (fh) {
      stat = 1
    } else if (fs) {
      stat = 3
    } else {
      stat = 8
    }
    if (itype === ITEMTYPE_DRINK) {
      stat = stat + 7
    }
    if (id > 70000) {
      stat = itype === ITEMTYPE_FOOD ? 16 : 15
    }
    cookIndex = cookIndex + 1
    Cook.recipe[cookIndex] = {
      name: zo_strformat("<<C:1>>", GetItemLinkName(reslink)),
      stat: stat,
      quality: quality,
      level: level,
      numlevel: numlevel,
      link: link,
      result: reslink,
      known: known,
      id: id,
    }
  }

  let furnisherIndex = 0
  for (const [, id] of ipairs(Furnisher.recipelist)) {
    const link = string.format("|H1:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", id)
    const [, spectype] = GetItemLinkItemType(link)
    const known = IsItemLinkRecipeKnown(link)
    const reslink = GetItemLinkRecipeResultItemLink(link, LINK_STYLE_DEFAULT)
    const quality = GetItemLinkQuality(reslink)
    const levelNum = GetItemLinkRequiredLevel(reslink)
    const levelcp = GetItemLinkRequiredChampionPoints(reslink)
    const numlevel = levelNum + levelcp
    let level: number | string = levelNum
    if (levelcp > 0) {
      level = `${state.ChampionPointsTexture}${levelcp}`
    }
    const stat = spectype - 171
    if (GetItemLinkName(reslink) !== "") {
      furnisherIndex = furnisherIndex + 1
      Furnisher.recipe[furnisherIndex] = {
        name: zo_strformat("<<C:1>>", GetItemLinkName(reslink)),
        stat: stat,
        quality: quality,
        level: level,
        numlevel: numlevel,
        link: link,
        result: reslink,
        known: known,
        id: id,
      }
    }
  }
  table.sort(Cook.recipe, tsort)
  table.sort(Furnisher.recipe, asort)
  UpdateIngredientTracking()
}

export function UpdateIngredientTracking(): undefined {
  for (const [k] of pairs(Cook.ingredient)) {
    delete Cook.ingredient[k]
  }
  for (const [recid] of pairs(state.Account.cook.ingredients)) {
    const reslink = string.format("|H1:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", recid)
    const numIngredients = GetItemLinkRecipeNumIngredients(reslink)
    for (let num = 1; num <= numIngredients; num++) {
      const [name] = GetItemLinkRecipeIngredientInfo(reslink, num)
      for (const [, ingid] of ipairs(Cook.ingredientlist)) {
        if (
          GetItemLinkName(`|H1:item:${ingid}:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h`) === name
        ) {
          Cook.ingredient[ingid] = true
          break
        }
      }
    }
  }
}

export function UpdateInventory(): undefined {
  const inv = [
    ZO_PlayerInventoryList,
    ZO_PlayerBankBackpack,
    ZO_GuildBankBackpack,
    ZO_HouseBankBackpack,
    ZO_SmithingTopLevelDeconstructionPanelInventoryBackpack,
    ZO_SmithingTopLevelImprovementPanelInventoryBackpack,
    ZO_UniversalDeconstructionTopLevel_KeyboardPanelInventoryBackpack,
  ]
  for (const list of inv) {
    const dataType = list.dataTypes?.[1]
    const puffer = dataType?.setupCallback
    if (dataType !== undefined && puffer !== undefined) {
      dataType.setupCallback = (control, slot) => {
        puffer(control, slot)
        ItemMark.SetItemMark(control, 1)
      }
    }
  }
  const lootDataType = ZO_LootAlphaContainerList.dataTypes?.[1]
  const puffer1 = lootDataType?.setupCallback
  if (lootDataType !== undefined && puffer1 !== undefined) {
    lootDataType.setupCallback = (control, slot) => {
      puffer1(control, slot)
      ItemMark.SetItemMark(control, 2)
    }
  }
}

export function UpdateGuildStore(): undefined {
  if (!IsInGamepadPreferredMode()) {
    const dataType = TRADING_HOUSE.searchResultsList.dataTypes?.[1]
    const puffer = dataType?.setupCallback
    if (dataType !== undefined && puffer !== undefined) {
      dataType.setupCallback = (control, slot) => {
        puffer(control, slot)
        ItemMark.SetItemMark(control, 3)
      }
    }
  }
}

export function RepairStored(): undefined {
  const bagData = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_WORN,
    BAG_BACKPACK,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK
  )
  const account = state.Account
  const itemQueue: { craft: number; line: number; trait: number }[] = []
  for (const [craft, craftStored] of pairs(account.crafting.stored)) {
    for (const [line, lineStored] of pairs(craftStored)) {
      for (const [trait, tdata] of pairs(lineStored)) {
        if (typeof tdata.id === "string") {
          if (tdata.owner === state.CurrentPlayer || tdata.owner === Lang.en.bank) {
            const [bag, slot] = Inventory.ScanUidBag(tdata.id, bagData)
            if (bag === false || Inventory.IsLocked(bag, slot)) {
              lineStored[trait] = {}
              itemQueue.push({ craft: craft, line: line, trait: trait })
            }
          }
        }
      }
    }
  }
  Research.AddResearchItems(itemQueue, bagData)
  ReloadUI("ingame")
}
