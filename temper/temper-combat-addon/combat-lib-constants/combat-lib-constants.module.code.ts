export const LIB_EVENT_NAMESPACE = "TemperCombatLibCombat"

export const LIB_DEBUG: boolean = false

let libCombatLineSizeCache: number | undefined

export function getLibCombatLineSize(): number {
  if (libCombatLineSizeCache === undefined) {
    libCombatLineSizeCache =
      Math.ceil(
        (GuiRoot.GetWidth() / (tonumber(GetCVar("WindowedWidth")) ?? GuiRoot.GetWidth())) * 1000
      ) / 1000
  }
  return libCombatLineSizeCache
}

export const ABILITY_RESOURCE_CACHE_SIZE = 20

export const COMBAT_TIMEOUT = 800

export const ACTIVE_TIME_ON_HEALS = true

export const ABILITY_ID_ZEN = 126597
export const ABILITY_ID_FORCE_OF_NATURE = 174250

export const MAX_UNIT_CACHE_EVENTS = 60
export const DEATH_RECAP_TIME_PERIOD = 10000
export const PLAYER_ACTIVATED_TIME = 10000

export const maxSkillDelay = GetDisplayName() === "@Chronix1753" ? 10000 : 2000

export const LIBCOMBAT_EVENT_MIN = 0
export const LIBCOMBAT_EVENT_UNITS = 0
export const LIBCOMBAT_EVENT_FIGHTRECAP = 1
export const LIBCOMBAT_EVENT_FIGHTSUMMARY = 2
export const LIBCOMBAT_EVENT_GROUPRECAP = 3
export const LIBCOMBAT_EVENT_DAMAGE_OUT = 4
export const LIBCOMBAT_EVENT_DAMAGE_IN = 5
export const LIBCOMBAT_EVENT_DAMAGE_SELF = 6
export const LIBCOMBAT_EVENT_HEAL_OUT = 7
export const LIBCOMBAT_EVENT_HEAL_IN = 8
export const LIBCOMBAT_EVENT_HEAL_SELF = 9
export const LIBCOMBAT_EVENT_EFFECTS_IN = 10
export const LIBCOMBAT_EVENT_EFFECTS_OUT = 11
export const LIBCOMBAT_EVENT_GROUPEFFECTS_IN = 12
export const LIBCOMBAT_EVENT_GROUPEFFECTS_OUT = 13
export const LIBCOMBAT_EVENT_PLAYERSTATS = 14
export const LIBCOMBAT_EVENT_RESOURCES = 15
export const LIBCOMBAT_EVENT_MESSAGES = 16
export const LIBCOMBAT_EVENT_DEATH = 17
export const LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED = 18
export const LIBCOMBAT_EVENT_SKILL_TIMINGS = 19
export const LIBCOMBAT_EVENT_BOSSHP = 20
export const LIBCOMBAT_EVENT_PERFORMANCE = 21
export const LIBCOMBAT_EVENT_DEATHRECAP = 22
export const LIBCOMBAT_EVENT_QUICKSLOT = 23
export const LIBCOMBAT_EVENT_SYNERGY = 24
export const LIBCOMBAT_EVENT_MAX = 24

export const LIBCOMBAT_STATE_DEAD = 1
export const LIBCOMBAT_STATE_ALIVE = 2
export const LIBCOMBAT_STATE_RESURRECTING = 3
export const LIBCOMBAT_STATE_RESURRECTED = 4

export const LIBCOMBAT_MESSAGE_COMBATSTART = 1
export const LIBCOMBAT_MESSAGE_COMBATEND = 2
export const LIBCOMBAT_MESSAGE_WEAPONSWAP = 3

export const LIBCOMBAT_SKILLSTATUS_INSTANT = 1
export const LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION = 2
export const LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL = 3
export const LIBCOMBAT_SKILLSTATUS_SUCCESS = 4
export const LIBCOMBAT_SKILLSTATUS_REGISTERED = 5
export const LIBCOMBAT_SKILLSTATUS_QUEUE = 6

export const LIBCOMBAT_STAT_MAXMAGICKA = 1
export const LIBCOMBAT_STAT_SPELLPOWER = 2
export const LIBCOMBAT_STAT_SPELLCRIT = 3
export const LIBCOMBAT_STAT_SPELLCRITBONUS = 4
export const LIBCOMBAT_STAT_SPELLPENETRATION = 5
export const LIBCOMBAT_STAT_MAXSTAMINA = 11
export const LIBCOMBAT_STAT_WEAPONPOWER = 12
export const LIBCOMBAT_STAT_WEAPONCRIT = 13
export const LIBCOMBAT_STAT_WEAPONCRITBONUS = 14
export const LIBCOMBAT_STAT_WEAPONPENETRATION = 15
export const LIBCOMBAT_STAT_MAXHEALTH = 21
export const LIBCOMBAT_STAT_PHYSICALRESISTANCE = 22
export const LIBCOMBAT_STAT_SPELLRESISTANCE = 23
export const LIBCOMBAT_STAT_CRITICALRESISTANCE = 24
export const LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE = 25

export const LIBCOMBAT_CPTYPE_PASSIVE = 0
export const LIBCOMBAT_CPTYPE_UNSLOTTED = 1
export const LIBCOMBAT_CPTYPE_SLOTTED = 2

export const BAD_ABILITY: Record<number, boolean> = {
  [51487]: true,
  [20546]: true,
  [69168]: true,
  [52515]: true,
  [41189]: true,
  [63601]: true,
}

export const SPECIAL_BUFFS: number[] = [
  21230, 21578, 71067, 71058, 71019, 71069, 71072, 49236, 57170, 75726, 75746, 61870, 71107, 122729,
]

export const SPECIAL_DEBUFFS: number[] = [178118, 95136, 95134, 178123, 178127, 148801]

export const SOURCE_BUGGED_BUFFS: number[] = [88401]

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

export const FOOD_BUFF_ID_TO_ITEM_LINKS: Record<number, string> = {
  [61218]: "|H0:item:68253:311:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61255]: "|H0:item:68247:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61257]: "|H0:item:68243:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61259]: "|H0:item:43142:139:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61260]: "|H0:item:43154:139:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61261]: "|H0:item:68239:309:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61294]: "|H0:item:68250:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61322]: "|H0:item:68257:309:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61325]: "|H0:item:68260:309:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61328]: "|H0:item:68263:309:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61335]: "|H0:item:68266:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61340]: "|H0:item:68268:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61345]: "|H0:item:68271:310:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [61350]: "|H0:item:68276:311:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [68411]: "|H0:item:64711:123:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [68416]: "|H0:item:64712:123:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [71057]: "|H0:item:71057:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [72822]: "|H0:item:71058:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [72824]: "|H0:item:71059:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [84720]: "|H0:item:87695:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [84731]: "|H0:item:87697:5:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [84709]: "|H0:item:87691:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [86673]: "|H0:item:112425:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [89955]: "|H0:item:120762:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [89957]: "|H0:item:120763:5:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h ",
  [89971]: "|H0:item:120764:5:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [100498]: "|H0:item:133556:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [107748]: "|H0:item:139016:5:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [107789]: "|H0:item:139018:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [127596]: "|H0:item:153629:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
  [147687]: "|H0:item:171323:124:10:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
}

export function getFoodDrinkItemLinkFromAbilityId(abilityId: number): string | undefined {
  return FOOD_BUFF_ID_TO_ITEM_LINKS[abilityId]
}

export const MUNDUS_STONES: Record<number, boolean> = {
  [13975]: true,
  [13980]: true,
  [13943]: true,
  [13978]: true,
  [13976]: true,
  [13981]: true,
  [13982]: true,
  [13979]: true,
  [13940]: true,
  [13985]: true,
  [13977]: true,
  [13984]: true,
  [13974]: true,
}

export const DIVINE_SLOTS: number[] = [
  EQUIP_SLOT_HEAD,
  EQUIP_SLOT_SHOULDERS,
  EQUIP_SLOT_CHEST,
  EQUIP_SLOT_HAND,
  EQUIP_SLOT_WAIST,
  EQUIP_SLOT_LEGS,
  EQUIP_SLOT_FEET,
]

export const DESTRO_STAFF_TYPES: Record<number, boolean> = {
  [WEAPONTYPE_FIRE_STAFF]: true,
  [WEAPONTYPE_FROST_STAFF]: true,
  [WEAPONTYPE_LIGHTNING_STAFF]: true,
}

const STRING_BASEREG = "Base Regeneration"
const STRING_DEBUFF = "Debuff"
const STRING_BUFF = "Buff"

let customAbilityNameCache: Record<number, string> | undefined

export function getCustomAbilityNames(): Record<number, string> {
  if (customAbilityNameCache === undefined) {
    const customAbilityFormat = GetString(SI_ABILITY_NAME) + " (<<2>>)"

    customAbilityNameCache = {
      [-1]: "Unknown",
      [-2]: "Unknown",
      [0]: STRING_BASEREG,

      [75753]: zo_strformat(SI_ABILITY_NAME, GetAbilityName(75753)),
      [17906]: zo_strformat(SI_ABILITY_NAME, GetAbilityName(17906)),
      [62988]: zo_strformat(SI_ABILITY_NAME, GetAbilityName(62988)),

      [81274]: "(C) " + zo_strformat(SI_ABILITY_NAME, GetAbilityName(81274)),
      [81275]: "(C) " + zo_strformat(SI_ABILITY_NAME, GetAbilityName(81275)),

      [113382]: zo_strformat(customAbilityFormat, GetAbilityName(113382), STRING_DEBUFF),

      [61901]: zo_strformat(
        customAbilityFormat,
        GetAbilityName(61901),
        GetString(SI_ABILITY_TOOLTIP_TOGGLE_DURATION)
      ),
      [61919]: zo_strformat(
        customAbilityFormat,
        GetAbilityName(61919),
        GetString(SI_ABILITY_TOOLTIP_TOGGLE_DURATION)
      ),
      [61927]: zo_strformat(
        customAbilityFormat,
        GetAbilityName(61927),
        GetString(SI_ABILITY_TOOLTIP_TOGGLE_DURATION)
      ),

      [122729]: zo_strformat(customAbilityFormat, GetAbilityName(122729), STRING_BUFF),
    }
  }
  return customAbilityNameCache
}

export const CUSTOM_ABILITY_ICON: Record<number, string> = {
  [0]: "esoui/art/icons/achievement_wrothgar_046.dds",
  [122729]: "esoui/art/icons/ability_warrior_025.dds",
  [ABILITY_ID_FORCE_OF_NATURE]: "esoui/art/icons/ability_healer_018.dds",
}

const ABILITY_NAME_CACHE: Record<number, string> = {}
const SCRIPT_NAME_CACHE: Record<number, string> = {}

export function getFormattedAbilityName(id: number | undefined, isScript?: boolean): string {
  if (id == null) {
    return ""
  }
  const cache = isScript === true ? SCRIPT_NAME_CACHE : ABILITY_NAME_CACHE
  let name = cache[id]

  if (name == null) {
    let rawname: string
    if (isScript === true) {
      rawname = GetCraftedAbilityScriptDisplayName(id)
    } else {
      rawname = getCustomAbilityNames()[id] ?? GetAbilityName(id)
    }
    name = ZO_CachedStrFormat(SI_ABILITY_NAME, rawname)
    if (name === "Off-Balance") {
      name = "Off Balance"
    }
    cache[id] = name
  }

  return name
}

const ABILITY_ICON_CACHE: Record<number, string> = {}
const SCRIPT_ICON_CACHE: Record<number, string> = {}
const NO_ICON = "/esoui/art/icons/icon_missing.dds"
const NO_SCRIPT_ICON = "EsoUI/Art/crafting/gamepad/crafting_alchemy_trait_unknown.dds"

export function getFormattedAbilityIcon(
  id: number | string | undefined,
  isScript?: boolean
): string {
  if (id == null) {
    return NO_ICON
  } else if (typeof id === "string") {
    return id
  } else if (isScript === true && id === 0) {
    return NO_SCRIPT_ICON
  }

  const cache = isScript === true ? SCRIPT_ICON_CACHE : ABILITY_ICON_CACHE
  let icon = cache[id]

  if (icon == null) {
    if (isScript === true) {
      icon = GetCraftedAbilityScriptIcon(id)
    } else {
      icon = CUSTOM_ABILITY_ICON[id] ?? GetAbilityIcon(id)
    }
    cache[id] = icon
  }

  return icon
}
