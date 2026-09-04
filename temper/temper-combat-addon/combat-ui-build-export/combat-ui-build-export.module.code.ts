import { LIBCOMBAT_CPTYPE_UNSLOTTED } from "@akasha/temper-combat-addon/combat-lib-constants"
import { getFightData } from "@akasha/temper-combat-addon/combat-ui-state"

function discoverSkillLines(this: void): number[] {
  const classLines: Record<number, boolean | undefined> = {}
  const abilityMap = SKILLS_DATA_MANAGER.abilityIdToProgressionDataMap ?? {}

  const fightData = getFightData()
  const skillBars = fightData?.charData?.skillBars

  if (skillBars != null) {
    for (let i = 1; i <= 2; i++) {
      const barData: Record<number, number> = skillBars[i] ?? {}
      for (let slot = 1; ; slot++) {
        const abilityId = barData[slot]
        if (abilityId == null) {
          break
        }
        const lineData = abilityMap[abilityId]?.skillData?.skillLineData
        if (lineData != null && lineData.skillTypeData.skillType === SKILL_TYPE_CLASS) {
          classLines[lineData.id] = true
        }
      }
    }
  }

  const classLinesOut: number[] = []

  for (const [lineId] of pairs(classLines)) {
    table.insert(classLinesOut, lineId)
  }

  return classLinesOut
}

function getBaseAbilityId(this: void, abilityId: number | undefined): number {
  const resolvedId = abilityId ?? 0
  const abilityMap = SKILLS_DATA_MANAGER.abilityIdToProgressionDataMap ?? {}
  const skillData = abilityMap[resolvedId]
  if (skillData != null) {
    return skillData.abilityId
  }
  return 0
}

function getSkillsString(this: void): string {
  const bars: string[] = []

  const fightData = getFightData()
  const charData = fightData?.charData
  const skillBars = charData?.skillBars

  if (charData != null && skillBars != null) {
    const scribedSkills = charData.scribedSkills ?? {}

    for (let i = 1; i <= 2; i++) {
      const skills: (string | number)[] = []
      const barData = skillBars[i] ?? {}

      for (let slotId = 3; slotId <= 8; slotId++) {
        const abilityId = barData[slotId]

        const scribedSkill = abilityId != null ? scribedSkills[abilityId] : undefined
        if (abilityId != null && scribedSkill != null) {
          const scribeData: (string | number)[] = [abilityId]
          for (let j = 1; j <= 3; j++) {
            const script = scribedSkill[j - 1]
            if (script != null) {
              table.insert(scribeData, script)
            }
          }

          table.insert(skills, table.concat(scribeData, ":"))
        } else {
          table.insert(skills, getBaseAbilityId(abilityId))
        }
      }
      table.insert(bars, table.concat(skills, ","))
    }
  }

  return table.concat(bars, ";")
}

function getCPString(this: void): LuaMultiReturn<[string | undefined, string | undefined]> {
  const slotted: (string | number)[] = []
  const stars: string[] = []

  const fightData = getFightData()
  if (fightData == null || fightData.CP == null) {
    return $multi(undefined, undefined)
  }

  const cpData = fightData.CP
  for (let disciplineId = 1; ; disciplineId++) {
    const data = cpData[disciplineId]
    if (data == null) {
      break
    }

    const slottedStars = data.slotted
    let iStart = 1

    for (const [id] of pairs(slottedStars)) {
      table.insert(slotted, id)
      iStart = iStart + 1
    }

    for (let i = iStart; i <= 4; i++) {
      table.insert(slotted, 0)
    }

    for (const [id, starData] of pairs(data.stars)) {
      const [points, starType] = starData
      if (starType !== LIBCOMBAT_CPTYPE_UNSLOTTED) {
        table.insert(stars, ZO_CachedStrFormat("<<1>>:<<2>>", id, points))
      }
    }
  }

  const slottedStr = table.concat(slotted, ",")
  const starsStr = table.concat(stars, ",")

  return $multi(slottedStr, starsStr)
}

const EXPORT_EQUIP_SLOTS: number[] = [
  EQUIP_SLOT_MAIN_HAND,
  EQUIP_SLOT_OFF_HAND,
  EQUIP_SLOT_BACKUP_MAIN,
  EQUIP_SLOT_BACKUP_OFF,
  EQUIP_SLOT_HEAD,
  EQUIP_SLOT_SHOULDERS,
  EQUIP_SLOT_CHEST,
  EQUIP_SLOT_HAND,
  EQUIP_SLOT_WAIST,
  EQUIP_SLOT_LEGS,
  EQUIP_SLOT_FEET,
  EQUIP_SLOT_NECK,
  EQUIP_SLOT_RING1,
  EQUIP_SLOT_RING2,
]

function appendPoisonStr(this: void, gear: string[], itemLink: string): undefined {
  const itemId = GetItemLinkItemId(itemLink)
  const [, , craftEffectsRaw] = string.find(itemLink, "|H%d:item:.*:(%d+)|h|h")
  const craftEffects = tonumber(craftEffectsRaw)

  if (craftEffects !== undefined && craftEffects > 0) {
    table.insert(
      gear,
      ZO_CachedStrFormat("<<1>>:<<2>>:<<3>>", EQUIP_SLOT_POISON, itemId, craftEffects)
    )
  } else {
    table.insert(gear, ZO_CachedStrFormat("<<1>>:<<2>>", EQUIP_SLOT_POISON, itemId))
  }
  return undefined
}

function getGearStr(this: void): string {
  const fightData = getFightData()
  const gearData = fightData?.charData?.equip

  if (gearData == null) {
    return ""
  }

  const gear: string[] = []

  for (const slotId of EXPORT_EQUIP_SLOTS) {
    const itemLink = gearData[slotId] ?? ""

    if (itemLink !== "") {
      const [itemType] = GetItemLinkItemType(itemLink)
      let equipType: string | number = ""
      if (itemType === ITEMTYPE_ARMOR) {
        equipType = GetItemLinkArmorType(itemLink)
      } else if (itemType === ITEMTYPE_WEAPON) {
        equipType = GetItemLinkWeaponType(itemLink)
      }

      const [, , , , , setId] = GetItemLinkSetInfo(itemLink, false)
      const [traitId] = GetItemLinkTraitInfo(itemLink)
      const glyphId = GetItemLinkFinalEnchantId(itemLink)

      const itemStr = table.concat([slotId, equipType, setId, traitId, glyphId], ":")
      table.insert(gear, itemStr)
    }
  }

  const poison1 = gearData[EQUIP_SLOT_POISON] ?? ""
  if (poison1 !== "") {
    appendPoisonStr(gear, poison1)
  }

  const poison2 = gearData[EQUIP_SLOT_BACKUP_POISON] ?? ""
  if (poison2 !== "") {
    appendPoisonStr(gear, poison2)
  }

  return table.concat(gear, ",")
}

function getCommaSeparatedListFromKeys(this: void, t: Record<number, unknown>): string {
  const list: (string | number)[] = []
  for (const [key] of pairs(t)) {
    table.insert(list, key)
  }

  return table.concat(list, ",")
}

function getPotionString(this: void, t: Record<string, number>): string {
  const potions: (string | number)[] = []
  for (const [itemLink] of pairs(t)) {
    const itemId = GetItemLinkItemId(itemLink)
    const [, , craftEffectsRaw] = string.find(itemLink, "|H%d:item:.*:(%d+)|h|h")
    const craftEffects = tonumber(craftEffectsRaw)

    if (craftEffects !== undefined && craftEffects > 0) {
      table.insert(potions, ZO_CachedStrFormat("<<1>>:<<2>>", itemId, craftEffects))
    } else {
      table.insert(potions, itemId)
    }
  }

  return table.concat(potions, ",")
}

const SUPPORTED_LANG: Record<string, boolean | undefined> = {
  en: true,
  de: true,
  fr: true,
  ru: true,
  es: true,
}

function getLanguage(this: void): string {
  const lang = GetCVar("language.2")
  return SUPPORTED_LANG[lang] === true ? lang : "en"
}

export function exportBuild(this: void): undefined {
  const fightData = getFightData()
  if (fightData == null || fightData.calculated == null) {
    return undefined
  }

  const charData = fightData.charData
  const classId: string | number = charData?.classId ?? ""
  const raceId: string | number = charData?.raceId ?? ""
  const roleId: string | number = charData?.roleId ?? GetSelectedLFGRole() ?? ""

  const apHealth = charData?.APHealth ?? 0
  const apMagicka = charData?.APMagicka ?? 0
  const apStam = charData?.APStam ?? 0
  const attributes = table.concat([apStam, apMagicka, apHealth], ":")

  const curse = charData?.Curse ?? 0
  const skillLinesRecord = charData?.SkillLines
  let skillLineTable: number[]
  if (skillLinesRecord == null) {
    skillLineTable = discoverSkillLines()
  } else {
    skillLineTable = []
    for (let i = 1; ; i++) {
      const lineId = skillLinesRecord[i]
      if (lineId == null) {
        break
      }
      skillLineTable[i - 1] = lineId
    }
  }
  const skillLines = table.concat(skillLineTable, ",")
  const skills = getSkillsString()
  const passives = table.concat(charData?.passiveSkills ?? [], ",")

  const [slottedCP, passiveCP] = getCPString()

  const gear = getGearStr()

  const buildInfo = fightData.calculated.buildInfo

  const mundus = getCommaSeparatedListFromKeys(buildInfo.mundus)
  const foods = getCommaSeparatedListFromKeys(buildInfo.drinkFood)
  const potions = getPotionString(buildInfo.potions)

  const [slottedCPStr] = assert(slottedCP, "fight has no CP data for build export")
  const [passiveCPStr] = assert(passiveCP, "fight has no CP data for build export")
  const buildData: (string | number)[] = [
    classId,
    raceId,
    roleId,
    attributes,
    curse,
    mundus,
    skillLines,
    skills,
    passives,
    slottedCPStr,
    passiveCPStr,
    gear,
    foods,
    potions,
    "",
  ]

  const buildDataStr = string.format(
    "https://eso-hub.com/%s/build-editor?addondata=%s",
    getLanguage(),
    table.concat(buildData, ";")
  )
  RequestOpenUnsafeURL(buildDataStr)
  return undefined
}
