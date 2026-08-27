import { fireCombatEvent } from "./callbacks"
import {
  DestroStaffTypes,
  DivineSlots,
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_PERFORMANCE,
  PLAYER_ACTIVATED_TIME,
} from "./constants"
import { LOG_LEVEL_INFO, LOG_LEVEL_WARNING, log } from "./log"
import { data, lastBossHealthValue, setLastBossHealthValue } from "./state"
import type { StatusEffectBonusData } from "./types"

export function getSlottedAbilityId(
  actionSlotIndex: number,
  hotbarCategory?: number
): LuaMultiReturn<[number, number | undefined]> {
  const category = hotbarCategory ?? GetActiveHotbarCategory()
  const actionType = GetSlotType(actionSlotIndex, category)
  const abilityId = GetSlotBoundId(actionSlotIndex, category)

  if (actionType === ACTION_TYPE_CRAFTED_ABILITY) {
    return $multi(GetAbilityIdForCraftedAbilityId(abilityId), abilityId)
  }

  return $multi(abilityId, undefined)
}

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

function parseDescriptionBonus(description: string, startIndex?: number): number | undefined {
  const [wholePartCapture, decimalPartCapture] = string.match(
    description,
    "cffffff[un ]*(%d+)%p?(%d*)[%%|][r|]",
    startIndex
  )
  const wholePart = parseLuaCapture(wholePartCapture)
  const decimalPart = parseLuaCapture(decimalPartCapture)
  if (wholePart === undefined) {
    return undefined
  }
  const bonusString = table.concat([wholePart, decimalPart ?? ""], ".")
  return tonumber(bonusString)
}

export function getShadowBonus(effectSlot: number): undefined {
  let totalBonus = 0
  for (const key of DivineSlots) {
    const [trait, desc] = GetItemLinkTraitInfo(GetItemLink(BAG_WORN, key, LINK_STYLE_DEFAULT))

    if (trait === ITEM_TRAIT_TYPE_ARMOR_DIVINES) {
      const bonus = parseDescriptionBonus(desc) ?? 0
      totalBonus = bonus + totalBonus
    }
  }

  const ZOSDesc = GetAbilityEffectDescription(effectSlot)
  const ZOSBonus = parseDescriptionBonus(ZOSDesc) ?? 0

  const calcBonus = zo_floor(11 * (1 + totalBonus / 100))

  data.critBonusMundus = calcBonus - ZOSBonus

  log(
    "other",
    LOG_LEVEL_INFO,
    "Shadow Mundus Offset: %d%% (calc %d%% - ZOS %d%%)",
    data.critBonusMundus,
    calcBonus,
    ZOSBonus
  )
  return undefined
}

let parseHeraldFail = false

function checkForHeraldAbility(): Record<number, number> {
  const bonusData: Record<number, number> = { [0]: 0, [1]: 0 }
  const [skillType, lineIndex, skillIndex] = GetSpecificSkillAbilityKeysByAbilityId(184873)
  const abilityId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
  const description = GetAbilityDescription(abilityId, undefined, "player")
  const [, startindex] = string.find(description, "cffffff[un ]*%d+%p?%d*[%%|][r|]")
  const bonus = parseDescriptionBonus(description, startindex)

  if (bonus === undefined && parseHeraldFail === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    parseHeraldFail = true
  }

  for (let hotbarCategory = 0; hotbarCategory <= 1; hotbarCategory++) {
    for (let slot = 3; slot <= 8; slot++) {
      const [slottedAbilityId] = getSlottedAbilityId(slot, hotbarCategory)
      const [slottedSkillType, lineIndex2] =
        GetSpecificSkillAbilityKeysByAbilityId(slottedAbilityId)
      if (
        slottedSkillType === SKILL_TYPE_CLASS &&
        lineIndex === lineIndex2 &&
        slottedAbilityId !== 0
      ) {
        bonusData[hotbarCategory] = bonus ?? 0
        break
      }
    }
  }
  return bonusData
}

let parseChargedFail = false

function getChargedBonus(): Record<number, number> {
  const charged: Record<number, number> = {}
  for (let hotbarCategory = 0; hotbarCategory <= 1; hotbarCategory++) {
    const slotMainHand =
      hotbarCategory === HOTBAR_CATEGORY_PRIMARY ? EQUIP_SLOT_MAIN_HAND : EQUIP_SLOT_BACKUP_MAIN
    const slotOffHand =
      hotbarCategory === HOTBAR_CATEGORY_PRIMARY ? EQUIP_SLOT_OFF_HAND : EQUIP_SLOT_BACKUP_OFF

    let chargedBonus = 0

    for (const itemLink of [
      GetItemLink(BAG_WORN, slotMainHand, LINK_STYLE_DEFAULT),
      GetItemLink(BAG_WORN, slotOffHand, LINK_STYLE_DEFAULT),
    ]) {
      const [trait, description] = GetItemLinkTraitInfo(itemLink)
      if (trait === ITEM_TRAIT_TYPE_WEAPON_CHARGED) {
        const bonus = parseDescriptionBonus(description)

        if (bonus === undefined && parseChargedFail === false) {
          log(
            "main",
            LOG_LEVEL_WARNING,
            "Failed to parse description for SE bonus: %s",
            description
          )
          parseChargedFail = true
        }

        chargedBonus = chargedBonus + (bonus ?? 0)
      }
    }

    charged[hotbarCategory] = chargedBonus
  }
  return charged
}

let parseHeartlandFail = false

function checkHeartlandSet(): number {
  const [, , , numEquipped] = GetItemSetInfo(583)
  if (numEquipped < 3) {
    return 0
  }
  const [, description] = GetItemSetBonusInfo(583, 4)
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && parseHeartlandFail === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    parseHeartlandFail = true
  }
  return (bonus ?? 0) / 100
}

let parseDestroFail = false

function checkDestroPassive(): Record<number, number> {
  const bonusData: Record<number, number> = { [0]: 0, [1]: 0 }
  const [skillType, lineIndex, skillIndex] = GetSpecificSkillAbilityKeysByAbilityId(45512)
  const abilityId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
  const description = GetAbilityDescription(abilityId, undefined, "player")
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && parseDestroFail === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    parseDestroFail = true
  }

  const weaponTypeMain = GetItemWeaponType(BAG_WORN, EQUIP_SLOT_MAIN_HAND)
  if (DestroStaffTypes[weaponTypeMain] === true) {
    bonusData[0] = bonus ?? 0
  }
  const weaponTypeBackup = GetItemWeaponType(BAG_WORN, EQUIP_SLOT_BACKUP_MAIN)
  if (DestroStaffTypes[weaponTypeBackup] === true) {
    bonusData[1] = bonus ?? 0
  }
  return bonusData
}

function checkCPBonus(): number {
  const martial = 1.5 * GetNumPointsSpentOnChampionSkill(18)
  const magic = 1.5 * GetNumPointsSpentOnChampionSkill(17)

  return (martial + magic) / 2
}

let parseWealdFail = false

function checkWealdSet(): number {
  const [, , , numEquipped] = GetItemSetInfo(757)
  if (numEquipped < 3) {
    return 0
  }
  const [, description] = GetItemSetBonusInfo(757, 4)
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && parseWealdFail === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    parseWealdFail = true
  }
  return bonus ?? 0
}

let parseFocusedEffortsFail = false

function getFocusedEffortsBonus(): number {
  const stacks = GetNumStacksForEndlessDungeonBuff(200904, false)
  if (stacks <= 0) {
    return 0
  }
  const description = GetAbilityDescription(200904, undefined, "player")
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && parseFocusedEffortsFail === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    parseFocusedEffortsFail = true
  }
  return bonus ?? 0
}

export function initStatusEffectBonuses(): undefined {
  const SEBonus: StatusEffectBonusData = {
    arcanistBonus: checkForHeraldAbility(),
    charged: getChargedBonus(),
    heartlandBonus: checkHeartlandSet(),
    wealdBonus: checkWealdSet(),
    destro: checkDestroPassive(),
    CP: checkCPBonus(),
    focusedEfforts: getFocusedEffortsBonus(),
  }
  data.statusEffectBonus = SEBonus
  return undefined
}

const tagToBossId: Record<string, number> = {}
for (let i = 1; i <= 12; i++) {
  tagToBossId[ZO_CachedStrFormat("boss<<1>>", i)] = i
}

export function onBossHealthChanged(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  _powerType: number,
  powerValue: number,
  powerMax: number
): undefined {
  const timems = GetGameTimeMilliseconds()
  const bossHealthValue = zo_round((powerValue / powerMax) * 100)
  if (bossHealthValue === lastBossHealthValue) {
    return undefined
  }

  setLastBossHealthValue(bossHealthValue)
  const bossId = tagToBossId[unitTag]
  fireCombatEvent(LIBCOMBAT_EVENT_BOSSHP, timems, bossId, powerValue, powerMax)
  return undefined
}

let frameIndex = 1
const frameData: Record<number, number> = {}
let currentsecond: number | undefined

function computeFrameDataSize(): number {
  const minFrameTime = tonumber(GetCVar("MinFrameTime.2"))
  if (minFrameTime === undefined) {
    error("lib-combat: MinFrameTime.2 cvar is not numeric")
  }
  return math.floor((1 / minFrameTime + 40) / 20) * 20
}

let frameDataInitialized = false

function ensureFrameData(): undefined {
  if (frameDataInitialized) {
    return undefined
  }
  frameDataInitialized = true
  const size = computeFrameDataSize()
  for (let i = 1; i <= size; i++) {
    frameData[i] = 0
  }
  return undefined
}

function onFrameUpdate(this: void): undefined {
  const newDelta = GetFrameDeltaTimeSeconds()
  const now = GetTimeStamp()

  frameData[frameIndex] = newDelta

  if (now === currentsecond) {
    frameIndex = frameIndex + 1
  } else {
    const timems = GetGameTimeMilliseconds()
    let sum = 0
    let min = 100
    let max = 0

    for (let k = 1; k <= frameIndex; k++) {
      const v = frameData[k]
      if (v === undefined) {
        error("lib-combat: frame data missing")
      }
      sum = sum + v
      min = math.min(v, min)
      max = math.max(v, max)
    }

    fireCombatEvent(
      LIBCOMBAT_EVENT_PERFORMANCE,
      timems,
      frameIndex / sum,
      1 / max,
      1 / min,
      GetLatency()
    )
    frameIndex = 1
    currentsecond = now
  }
  return undefined
}

function enableLogging(this: void): undefined {
  ensureFrameData()
  frameIndex = 1
  currentsecond = GetTimeStamp()

  EVENT_MANAGER.RegisterForUpdate(`${LIB_EVENT_NAMESPACE}_Frames`, 0, onFrameUpdate)
  EVENT_MANAGER.UnregisterForUpdate(`${LIB_EVENT_NAMESPACE}_Frames_Enable`)
  return undefined
}

export function onPlayerActivated2(this: void, _eventCode: number, _initial: boolean): undefined {
  EVENT_MANAGER.RegisterForUpdate(
    `${LIB_EVENT_NAMESPACE}_Frames_Enable`,
    PLAYER_ACTIVATED_TIME,
    enableLogging
  )
  return undefined
}

export function onPlayerDeactivated(this: void, _eventCode: number): undefined {
  EVENT_MANAGER.UnregisterForUpdate(`${LIB_EVENT_NAMESPACE}_Frames`)
  return undefined
}
