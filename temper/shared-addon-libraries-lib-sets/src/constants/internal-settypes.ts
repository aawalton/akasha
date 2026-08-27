import { asGlobalTable, asPresent } from "../casts"

const lib = LibSets
const G = asGlobalTable(globalThis)

const checkIfPTSAPIVersionIsLive = lib.checkIfPTSAPIVersionIsLive

const langDE = "de"
const langEN = "en"
const langES = "es"
const langFR = "fr"
const langRU = "ru"
const langZH = "zh"
const langJP = "jp"
const langPL = "pl"

const zocstrfor = ZO_CachedStrFormat

const possibleSetTypes: { [index: number]: string } = {
  [1]: "LIBSETS_SETTYPE_ARENA",
  [2]: "LIBSETS_SETTYPE_BATTLEGROUND",
  [3]: "LIBSETS_SETTYPE_CRAFTED",
  [4]: "LIBSETS_SETTYPE_CYRODIIL",
  [5]: "LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD",
  [6]: "LIBSETS_SETTYPE_DUNGEON",
  [7]: "LIBSETS_SETTYPE_IMPERIALCITY",
  [8]: "LIBSETS_SETTYPE_MONSTER",
  [9]: "LIBSETS_SETTYPE_OVERLAND",
  [10]: "LIBSETS_SETTYPE_SPECIAL",
  [11]: "LIBSETS_SETTYPE_TRIAL",
  [12]: "LIBSETS_SETTYPE_MYTHIC",
  [13]: "LIBSETS_SETTYPE_IMPERIALCITY_MONSTER",
  [14]: "LIBSETS_SETTYPE_CYRODIIL_MONSTER",
  [15]: "LIBSETS_SETTYPE_CLASS",
}
if (checkIfPTSAPIVersionIsLive()) {
}
for (const [setTypeId, setTypeName] of ipairs(possibleSetTypes)) {
  G[setTypeName] = setTypeId
}
const maxSetTypes = lengthOf(possibleSetTypes)
const iterationBegin = LIBSETS_SETTYPE_ARENA
const iterationEnd = asNumber(G[asPresent(possibleSetTypes[maxSetTypes])])
G["LIBSETS_SETTYPE_ITERATION_BEGIN"] = iterationBegin
G["LIBSETS_SETTYPE_ITERATION_END"] = iterationEnd

lib.allowedSetTypes = {}
for (let i = iterationBegin; i <= iterationEnd; i++) {
  lib.allowedSetTypes[i] = true
}

lib.setTypeToLibraryInternalVariableNames = {
  [LIBSETS_SETTYPE_ARENA]: { [LIBSETS_TABLEKEY_TABLENAME]: "arenaSets" },
  [LIBSETS_SETTYPE_BATTLEGROUND]: { [LIBSETS_TABLEKEY_TABLENAME]: "battlegroundSets" },
  [LIBSETS_SETTYPE_CRAFTED]: { [LIBSETS_TABLEKEY_TABLENAME]: "craftedSets" },
  [LIBSETS_SETTYPE_CYRODIIL]: { [LIBSETS_TABLEKEY_TABLENAME]: "cyrodiilSets" },
  [LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: {
    [LIBSETS_TABLEKEY_TABLENAME]: "dailyRandomDungeonAndImperialCityRewardSets",
  },
  [LIBSETS_SETTYPE_DUNGEON]: { [LIBSETS_TABLEKEY_TABLENAME]: "dungeonSets" },
  [LIBSETS_SETTYPE_IMPERIALCITY]: { [LIBSETS_TABLEKEY_TABLENAME]: "imperialCitySets" },
  [LIBSETS_SETTYPE_MONSTER]: { [LIBSETS_TABLEKEY_TABLENAME]: "monsterSets" },
  [LIBSETS_SETTYPE_OVERLAND]: { [LIBSETS_TABLEKEY_TABLENAME]: "overlandSets" },
  [LIBSETS_SETTYPE_SPECIAL]: { [LIBSETS_TABLEKEY_TABLENAME]: "specialSets" },
  [LIBSETS_SETTYPE_TRIAL]: { [LIBSETS_TABLEKEY_TABLENAME]: "trialSets" },
  [LIBSETS_SETTYPE_MYTHIC]: { [LIBSETS_TABLEKEY_TABLENAME]: "mythicSets" },
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: { [LIBSETS_TABLEKEY_TABLENAME]: "monsterSets" },
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: { [LIBSETS_TABLEKEY_TABLENAME]: "monsterSets" },
  [LIBSETS_SETTYPE_CLASS]: { [LIBSETS_TABLEKEY_TABLENAME]: "classSets" },
}
if (checkIfPTSAPIVersionIsLive()) {
}

lib.counterSuffix = "Counter"

const setTypesToName: { [setType: number]: { [lang: string]: string } } = {
  [LIBSETS_SETTYPE_ARENA]: {
    [langDE]: "Arena",
    [langEN]: "Arena",
    [langES]: "Arena",
    [langFR]: "Arène",
    [langPL]: "Arena",
    [langJP]: "アリーナ",
    [langRU]: "Aрена",
    [langZH]: "竞技场",
  },
  [LIBSETS_SETTYPE_BATTLEGROUND]: {
    [langDE]: "Schlachtfeld",
    [langEN]: "Battleground",
    [langES]: "Campo de batalla",
    [langFR]: "Champ de bataille",
    [langPL]: "Pole Bitwy",
    [langJP]: "バトルグラウンド",
    [langRU]: "Поле боя",
    [langZH]: "战场",
  },
  [LIBSETS_SETTYPE_CRAFTED]: {
    [langDE]: "Handwerklich hergestellt",
    [langEN]: "Crafted",
    [langES]: "Hecho a mano",
    [langFR]: "Artisanal",
    [langPL]: "Wytworzone",
    [langJP]: "クラフトセット",
    [langRU]: "Созданный",
    [langZH]: "制造",
  },
  [LIBSETS_SETTYPE_CYRODIIL]: {
    [langDE]: "Cyrodiil",
    [langEN]: "Cyrodiil",
    [langES]: "Cyrodiil",
    [langFR]: "Cyrodiil",
    [langPL]: "Cyrodiil",
    [langJP]: "シロディール",
    [langRU]: "Сиродил",
    [langZH]: "西罗帝尔",
  },
  [LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: {
    [langDE]: "Zufälliges Verlies & Kaiserstadt Belohnung",
    [langEN]: "Random Dungeons & Imperial city " + zocstrfor("<<c:1>>", "Reward"),
    [langES]: "Mazmorras aleatorias y ciudad imperial " + zocstrfor("<<c:1>>", "Recompensa"),
    [langFR]: "Donjons aléatoires & Cité impériale " + zocstrfor("<<c:1>>", "Récompense"),
    [langPL]: "Losowe Lochy & Cesarskie Miasto " + zocstrfor("<<c:1>>", "Nagroda"),
    [langJP]: "デイリー報酬",
    [langRU]: "Случайное ежедневное подземелье и награда Имперского города",
    [langZH]: "随机地下城 & 帝都 " + zocstrfor("<<c:1>>", "奖励"),
  },
  [LIBSETS_SETTYPE_DUNGEON]: {
    [langDE]: "Verlies",
    [langEN]: "Dungeon",
    [langES]: "Calabozo",
    [langFR]: "Donjon",
    [langPL]: "Loch",
    [langJP]: "ダンジョン",
    [langRU]: "Подземелье",
    [langZH]: "地下城",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY]: {
    [langDE]: "Kaiserstadt",
    [langEN]: "Imperial city",
    [langES]: "Ciudad imperial",
    [langFR]: "Cité impériale",
    [langPL]: "Cesarskie Miasto",
    [langJP]: "帝都",
    [langRU]: "Имперский город",
    [langZH]: "帝都",
  },
  [LIBSETS_SETTYPE_MONSTER]: {
    [langDE]: "Monster",
    [langEN]: "Monster",
    [langES]: "Monstruo",
    [langFR]: "Monstre",
    [langPL]: "Potwór",
    [langJP]: "モンスター",
    [langRU]: "Монстр",
    [langZH]: "怪物",
  },
  [LIBSETS_SETTYPE_OVERLAND]: {
    [langDE]: "Überland",
    [langEN]: "Overland",
    [langES]: "Zone terrestre",
    [langFR]: "Zone",
    [langPL]: "Otwarty świat",
    [langJP]: "陸上",
    [langRU]: "Поверхности",
    [langZH]: "陆上",
  },
  [LIBSETS_SETTYPE_SPECIAL]: {
    [langDE]: "Besonders",
    [langEN]: "Special",
    [langES]: "Especial",
    [langFR]: "Spécial",
    [langPL]: "Specjalne",
    [langJP]: "スペシャル",
    [langRU]: "Специальный",
    [langZH]: "特殊",
  },
  [LIBSETS_SETTYPE_TRIAL]: {
    [langDE]: "Prüfungen",
    [langEN]: "Trial",
    [langES]: "Ensayo",
    [langFR]: "Épreuves",
    [langPL]: "Próby",
    [langJP]: "試練",
    [langRU]: "Испытание",
    [langZH]: "试炼",
  },
  [LIBSETS_SETTYPE_MYTHIC]: {
    [langDE]: "Mythisch",
    [langEN]: "Mythic",
    [langES]: "Mítico",
    [langFR]: "Mythique",
    [langPL]: "Mityczny",
    [langJP]: "神話上の",
    [langRU]: "мифический",
    [langZH]: "神话",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: {
    [langDE]: "Kaiserstadt Monster",
    [langEN]: "Imperial city monster",
    [langES]: "Ciudad imperial monstruo",
    [langFR]: "Monstre de la Cité impériale",
    [langPL]: "Potwór z Cesarskiego Maista",
    [langJP]: "帝都 モンスター",
    [langRU]: "Имперский город Монстр",
    [langZH]: "帝都怪物",
  },
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: {
    [langDE]: "Cyrodiil Monster",
    [langEN]: "Cyrodiil monster",
    [langES]: "Cyrodiil monstruo",
    [langFR]: "Monstre de Cyrodiil",
    [langPL]: "Potwór z Cyrodiil",
    [langJP]: "シロディール モンスター",
    [langRU]: "Сиродил Монстр",
    [langZH]: "西罗帝尔怪物",
  },
  [LIBSETS_SETTYPE_CLASS]: {
    [langDE]: "Klassen spezifisch",
    [langEN]: "Class specific",
    [langES]: "Específico de la clase",
    [langFR]: "Spécifique à la classe",
    [langPL]: "Specyficzne dla klasy",
    [langJP]: "クラス固有の",
    [langRU]: "Зависит от класса",
    [langZH]: "职业限定",
  },
}
if (checkIfPTSAPIVersionIsLive()) {
}
lib.setTypesToName = setTypesToName

lib.setTypeToSetIdsForSetTypeTable = {}

lib.setItemTypes = {
  [ITEMTYPE_ARMOR]: true,
  [ITEMTYPE_WEAPON]: true,
}
lib.equipTypesValid = {
  [EQUIP_TYPE_INVALID]: false,
  [EQUIP_TYPE_COSTUME]: false,
  [EQUIP_TYPE_POISON]: false,
  [EQUIP_TYPE_CHEST]: true,
  [EQUIP_TYPE_FEET]: true,
  [EQUIP_TYPE_HAND]: true,
  [EQUIP_TYPE_HEAD]: true,
  [EQUIP_TYPE_LEGS]: true,
  [EQUIP_TYPE_MAIN_HAND]: true,
  [EQUIP_TYPE_NECK]: true,
  [EQUIP_TYPE_OFF_HAND]: true,
  [EQUIP_TYPE_ONE_HAND]: true,
  [EQUIP_TYPE_RING]: true,
  [EQUIP_TYPE_SHOULDERS]: true,
  [EQUIP_TYPE_TWO_HAND]: true,
  [EQUIP_TYPE_WAIST]: true,
}
lib.isJewelryEquipType = {
  [EQUIP_TYPE_NECK]: true,
  [EQUIP_TYPE_RING]: true,
}
lib.isWeaponEquipType = {
  [EQUIP_TYPE_MAIN_HAND]: true,
  [EQUIP_TYPE_OFF_HAND]: true,
  [EQUIP_TYPE_ONE_HAND]: true,
  [EQUIP_TYPE_TWO_HAND]: true,
}
lib.isArmorEquipType = {
  [EQUIP_TYPE_CHEST]: true,
  [EQUIP_TYPE_FEET]: true,
  [EQUIP_TYPE_HAND]: true,
  [EQUIP_TYPE_HEAD]: true,
  [EQUIP_TYPE_LEGS]: true,
  [EQUIP_TYPE_MAIN_HAND]: true,
  [EQUIP_TYPE_NECK]: true,
  [EQUIP_TYPE_OFF_HAND]: true,
  [EQUIP_TYPE_ONE_HAND]: true,
  [EQUIP_TYPE_RING]: true,
  [EQUIP_TYPE_SHOULDERS]: true,
  [EQUIP_TYPE_TWO_HAND]: true,
  [EQUIP_TYPE_WAIST]: true,
}

lib.traitTypesValid = {
  [ITEM_TRAIT_TYPE_NONE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: true,
  [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_ORNATE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_PROSPEROUS]: true,
  [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_STURDY]: true,
  [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: true,
  [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_ORNATE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: true,
  [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_ORNATE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_POWERED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: true,
}
lib.isJewelryTraitType = {
  [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_ORNATE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: true,
  [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: true,
}
lib.isWeaponTraitType = {
  [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: true,
  [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_ORNATE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_POWERED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: true,
  [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: true,
  [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: true,
}
lib.isArmorTraitType = {
  [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: true,
  [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_INTRICATE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_ORNATE]: true,
  [ITEM_TRAIT_TYPE_ARMOR_PROSPEROUS]: true,
  [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: true,
  [ITEM_TRAIT_TYPE_ARMOR_STURDY]: true,
  [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: true,
  [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: true,
}

lib.enchantSearchCategoryTypesValid = {
  all: true,
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_BERSERKER]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA]: true,
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN]: true,
}

lib.equipTypesSets = {}
lib.armorSets = {}
lib.armorTypesSets = {}
lib.jewelrySets = {}
lib.weaponSets = {}
lib.weaponTypesSets = {}
lib.nonPerfectedSet2PerfectedSet = {}
lib.perfectedSet2NonPerfectedSet = {}
lib.perfectedSetsInfo = {}
lib.perfectedSets = {}
lib.nonPerfectedSets = {}

function lengthOf(this: void, t: { [index: number]: string }): number {
  let n = 0
  for (const [_k] of ipairs(t)) {
    n = n + 1
  }
  return n
}
function asNumber(this: void, value: unknown): number {
  return tonumber(value) ?? 0
}
