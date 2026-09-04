import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  DESTRO_STAFF_TYPES,
  DIVINE_SLOTS,
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_PERFORMANCE,
  PLAYER_ACTIVATED_TIME,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_INFO, LOG_LEVEL_WARNING, log } from "@akasha/temper-combat-addon/combat-lib-log"
import {
  DATA,
  LAST_BOSS_HEALTH_VALUE,
  setLastBossHealthValue,
} from "@akasha/temper-combat-addon/combat-lib-state"
import type { StatusEffectBonusData } from "@akasha/temper-combat-addon/combat-lib-types"

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
  for (const key of DIVINE_SLOTS) {
    const [trait, desc] = GetItemLinkTraitInfo(GetItemLink(BAG_WORN, key, LINK_STYLE_DEFAULT))

    if (trait === ITEM_TRAIT_TYPE_ARMOR_DIVINES) {
      const bonus = parseDescriptionBonus(desc) ?? 0
      totalBonus = bonus + totalBonus
    }
  }

  const zosDesc = GetAbilityEffectDescription(effectSlot)
  const zosBonus = parseDescriptionBonus(zosDesc) ?? 0

  const calcBonus = zo_floor(11 * (1 + totalBonus / 100))

  DATA.critBonusMundus = calcBonus - zosBonus

  log(
    "other",
    LOG_LEVEL_INFO,
    "Shadow Mundus Offset: %d%% (calc %d%% - ZOS %d%%)",
    DATA.critBonusMundus,
    calcBonus,
    zosBonus
  )
  return undefined
}

let PARSE_HERALD_FAIL = false

function checkForHeraldAbility(): Record<number, number> {
  const bonusData: Record<number, number> = { [0]: 0, [1]: 0 }
  const [skillType, lineIndex, skillIndex] = GetSpecificSkillAbilityKeysByAbilityId(184873)
  const abilityId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
  const description = GetAbilityDescription(abilityId, undefined, "player")
  const [, startindex] = string.find(description, "cffffff[un ]*%d+%p?%d*[%%|][r|]")
  const bonus = parseDescriptionBonus(description, startindex)

  if (bonus === undefined && PARSE_HERALD_FAIL === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    PARSE_HERALD_FAIL = true
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

let PARSE_CHARGED_FAIL = false

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

        if (bonus === undefined && PARSE_CHARGED_FAIL === false) {
          log(
            "main",
            LOG_LEVEL_WARNING,
            "Failed to parse description for SE bonus: %s",
            description
          )
          PARSE_CHARGED_FAIL = true
        }

        chargedBonus = chargedBonus + (bonus ?? 0)
      }
    }

    charged[hotbarCategory] = chargedBonus
  }
  return charged
}

let PARSE_HEARTLAND_FAIL = false

function checkHeartlandSet(): number {
  const [, , , numEquipped] = GetItemSetInfo(583)
  if (numEquipped < 3) {
    return 0
  }
  const [, description] = GetItemSetBonusInfo(583, 4)
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && PARSE_HEARTLAND_FAIL === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    PARSE_HEARTLAND_FAIL = true
  }
  return (bonus ?? 0) / 100
}

let PARSE_DESTRO_FAIL = false

function checkDestroPassive(): Record<number, number> {
  const bonusData: Record<number, number> = { [0]: 0, [1]: 0 }
  const [skillType, lineIndex, skillIndex] = GetSpecificSkillAbilityKeysByAbilityId(45512)
  const abilityId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
  const description = GetAbilityDescription(abilityId, undefined, "player")
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && PARSE_DESTRO_FAIL === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    PARSE_DESTRO_FAIL = true
  }

  const weaponTypeMain = GetItemWeaponType(BAG_WORN, EQUIP_SLOT_MAIN_HAND)
  if (DESTRO_STAFF_TYPES[weaponTypeMain] === true) {
    bonusData[0] = bonus ?? 0
  }
  const weaponTypeBackup = GetItemWeaponType(BAG_WORN, EQUIP_SLOT_BACKUP_MAIN)
  if (DESTRO_STAFF_TYPES[weaponTypeBackup] === true) {
    bonusData[1] = bonus ?? 0
  }
  return bonusData
}

function checkCPBonus(): number {
  const martial = 1.5 * GetNumPointsSpentOnChampionSkill(18)
  const magic = 1.5 * GetNumPointsSpentOnChampionSkill(17)

  return (martial + magic) / 2
}

let PARSE_WEALD_FAIL = false

function checkWealdSet(): number {
  const [, , , numEquipped] = GetItemSetInfo(757)
  if (numEquipped < 3) {
    return 0
  }
  const [, description] = GetItemSetBonusInfo(757, 4)
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && PARSE_WEALD_FAIL === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    PARSE_WEALD_FAIL = true
  }
  return bonus ?? 0
}

let PARSE_FOCUSED_EFFORTS_FAIL = false

function getFocusedEffortsBonus(): number {
  const stacks = GetNumStacksForEndlessDungeonBuff(200904, false)
  if (stacks <= 0) {
    return 0
  }
  const description = GetAbilityDescription(200904, undefined, "player")
  const bonus = parseDescriptionBonus(description)

  if (bonus === undefined && PARSE_FOCUSED_EFFORTS_FAIL === false) {
    log("main", LOG_LEVEL_WARNING, "Failed to parse description for SE bonus: %s", description)
    PARSE_FOCUSED_EFFORTS_FAIL = true
  }
  return bonus ?? 0
}

export function initStatusEffectBonuses(): undefined {
  const seBonus: StatusEffectBonusData = {
    arcanistBonus: checkForHeraldAbility(),
    charged: getChargedBonus(),
    heartlandBonus: checkHeartlandSet(),
    wealdBonus: checkWealdSet(),
    destro: checkDestroPassive(),
    CP: checkCPBonus(),
    focusedEfforts: getFocusedEffortsBonus(),
  }
  DATA.statusEffectBonus = seBonus
  return undefined
}

const TAG_TO_BOSS_ID: Record<string, number> = {}
for (let i = 1; i <= 12; i++) {
  TAG_TO_BOSS_ID[ZO_CachedStrFormat("boss<<1>>", i)] = i
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
  if (bossHealthValue === LAST_BOSS_HEALTH_VALUE) {
    return undefined
  }

  setLastBossHealthValue(bossHealthValue)
  const bossId = TAG_TO_BOSS_ID[unitTag]
  fireCombatEvent(LIBCOMBAT_EVENT_BOSSHP, timems, bossId, powerValue, powerMax)
  return undefined
}

let FRAME_INDEX = 1
const FRAME_DATA: Record<number, number> = {}
let currentsecond: number | undefined

function computeFrameDataSize(): number {
  const minFrameTime = tonumber(GetCVar("MinFrameTime.2"))
  if (minFrameTime === undefined) {
    error("lib-combat: MinFrameTime.2 cvar is not numeric")
  }
  return math.floor((1 / minFrameTime + 40) / 20) * 20
}

let FRAME_DATA_INITIALIZED = false

function ensureFrameData(): undefined {
  if (FRAME_DATA_INITIALIZED) {
    return undefined
  }
  FRAME_DATA_INITIALIZED = true
  const size = computeFrameDataSize()
  for (let i = 1; i <= size; i++) {
    FRAME_DATA[i] = 0
  }
  return undefined
}

function onFrameUpdate(this: void): undefined {
  const newDelta = GetFrameDeltaTimeSeconds()
  const now = GetTimeStamp()

  FRAME_DATA[FRAME_INDEX] = newDelta

  if (now === currentsecond) {
    FRAME_INDEX = FRAME_INDEX + 1
  } else {
    const timems = GetGameTimeMilliseconds()
    let sum = 0
    let min = 100
    let max = 0

    for (let k = 1; k <= FRAME_INDEX; k++) {
      const v = FRAME_DATA[k]
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
      FRAME_INDEX / sum,
      1 / max,
      1 / min,
      GetLatency()
    )
    FRAME_INDEX = 1
    currentsecond = now
  }
  return undefined
}

function enableLogging(this: void): undefined {
  ensureFrameData()
  FRAME_INDEX = 1
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
