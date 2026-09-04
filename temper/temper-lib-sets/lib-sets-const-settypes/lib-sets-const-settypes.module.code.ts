import { asGlobalTable, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const lib = LibSets
const G = asGlobalTable(globalThis)

const checkIfPTSAPIVersionIsLive = lib.checkIfPTSAPIVersionIsLive

const LANG_DE = "de"
const LANG_EN = "en"
const LANG_ES = "es"
const LANG_FR = "fr"
const LANG_RU = "ru"
const LANG_ZH = "zh"
const LANG_JP = "jp"
const LANG_PL = "pl"

const zocstrfor = ZO_CachedStrFormat

const POSSIBLE_SET_TYPES: { [index: number]: string } = {
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
for (const [setTypeId, setTypeName] of ipairs(POSSIBLE_SET_TYPES)) {
  G[setTypeName] = setTypeId
}
const maxSetTypes = lengthOf(POSSIBLE_SET_TYPES)
const iterationBegin = LIBSETS_SETTYPE_ARENA
const iterationEnd = asNumber(G[asPresent(POSSIBLE_SET_TYPES[maxSetTypes])])
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

const SET_TYPES_TO_NAME: { [setType: number]: { [lang: string]: string } } = {
  [LIBSETS_SETTYPE_ARENA]: {
    [LANG_DE]: "Arena",
    [LANG_EN]: "Arena",
    [LANG_ES]: "Arena",
    [LANG_FR]: "Arène",
    [LANG_PL]: "Arena",
    [LANG_JP]: "アリーナ",
    [LANG_RU]: "Aрена",
    [LANG_ZH]: "竞技场",
  },
  [LIBSETS_SETTYPE_BATTLEGROUND]: {
    [LANG_DE]: "Schlachtfeld",
    [LANG_EN]: "Battleground",
    [LANG_ES]: "Campo de batalla",
    [LANG_FR]: "Champ de bataille",
    [LANG_PL]: "Pole Bitwy",
    [LANG_JP]: "バトルグラウンド",
    [LANG_RU]: "Поле боя",
    [LANG_ZH]: "战场",
  },
  [LIBSETS_SETTYPE_CRAFTED]: {
    [LANG_DE]: "Handwerklich hergestellt",
    [LANG_EN]: "Crafted",
    [LANG_ES]: "Hecho a mano",
    [LANG_FR]: "Artisanal",
    [LANG_PL]: "Wytworzone",
    [LANG_JP]: "クラフトセット",
    [LANG_RU]: "Созданный",
    [LANG_ZH]: "制造",
  },
  [LIBSETS_SETTYPE_CYRODIIL]: {
    [LANG_DE]: "Cyrodiil",
    [LANG_EN]: "Cyrodiil",
    [LANG_ES]: "Cyrodiil",
    [LANG_FR]: "Cyrodiil",
    [LANG_PL]: "Cyrodiil",
    [LANG_JP]: "シロディール",
    [LANG_RU]: "Сиродил",
    [LANG_ZH]: "西罗帝尔",
  },
  [LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD]: {
    [LANG_DE]: "Zufälliges Verlies & Kaiserstadt Belohnung",
    [LANG_EN]: "Random Dungeons & Imperial city " + zocstrfor("<<c:1>>", "Reward"),
    [LANG_ES]: "Mazmorras aleatorias y ciudad imperial " + zocstrfor("<<c:1>>", "Recompensa"),
    [LANG_FR]: "Donjons aléatoires & Cité impériale " + zocstrfor("<<c:1>>", "Récompense"),
    [LANG_PL]: "Losowe Lochy & Cesarskie Miasto " + zocstrfor("<<c:1>>", "Nagroda"),
    [LANG_JP]: "デイリー報酬",
    [LANG_RU]: "Случайное ежедневное подземелье и награда Имперского города",
    [LANG_ZH]: "随机地下城 & 帝都 " + zocstrfor("<<c:1>>", "奖励"),
  },
  [LIBSETS_SETTYPE_DUNGEON]: {
    [LANG_DE]: "Verlies",
    [LANG_EN]: "Dungeon",
    [LANG_ES]: "Calabozo",
    [LANG_FR]: "Donjon",
    [LANG_PL]: "Loch",
    [LANG_JP]: "ダンジョン",
    [LANG_RU]: "Подземелье",
    [LANG_ZH]: "地下城",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY]: {
    [LANG_DE]: "Kaiserstadt",
    [LANG_EN]: "Imperial city",
    [LANG_ES]: "Ciudad imperial",
    [LANG_FR]: "Cité impériale",
    [LANG_PL]: "Cesarskie Miasto",
    [LANG_JP]: "帝都",
    [LANG_RU]: "Имперский город",
    [LANG_ZH]: "帝都",
  },
  [LIBSETS_SETTYPE_MONSTER]: {
    [LANG_DE]: "Monster",
    [LANG_EN]: "Monster",
    [LANG_ES]: "Monstruo",
    [LANG_FR]: "Monstre",
    [LANG_PL]: "Potwór",
    [LANG_JP]: "モンスター",
    [LANG_RU]: "Монстр",
    [LANG_ZH]: "怪物",
  },
  [LIBSETS_SETTYPE_OVERLAND]: {
    [LANG_DE]: "Überland",
    [LANG_EN]: "Overland",
    [LANG_ES]: "Zone terrestre",
    [LANG_FR]: "Zone",
    [LANG_PL]: "Otwarty świat",
    [LANG_JP]: "陸上",
    [LANG_RU]: "Поверхности",
    [LANG_ZH]: "陆上",
  },
  [LIBSETS_SETTYPE_SPECIAL]: {
    [LANG_DE]: "Besonders",
    [LANG_EN]: "Special",
    [LANG_ES]: "Especial",
    [LANG_FR]: "Spécial",
    [LANG_PL]: "Specjalne",
    [LANG_JP]: "スペシャル",
    [LANG_RU]: "Специальный",
    [LANG_ZH]: "特殊",
  },
  [LIBSETS_SETTYPE_TRIAL]: {
    [LANG_DE]: "Prüfungen",
    [LANG_EN]: "Trial",
    [LANG_ES]: "Ensayo",
    [LANG_FR]: "Épreuves",
    [LANG_PL]: "Próby",
    [LANG_JP]: "試練",
    [LANG_RU]: "Испытание",
    [LANG_ZH]: "试炼",
  },
  [LIBSETS_SETTYPE_MYTHIC]: {
    [LANG_DE]: "Mythisch",
    [LANG_EN]: "Mythic",
    [LANG_ES]: "Mítico",
    [LANG_FR]: "Mythique",
    [LANG_PL]: "Mityczny",
    [LANG_JP]: "神話上の",
    [LANG_RU]: "мифический",
    [LANG_ZH]: "神话",
  },
  [LIBSETS_SETTYPE_IMPERIALCITY_MONSTER]: {
    [LANG_DE]: "Kaiserstadt Monster",
    [LANG_EN]: "Imperial city monster",
    [LANG_ES]: "Ciudad imperial monstruo",
    [LANG_FR]: "Monstre de la Cité impériale",
    [LANG_PL]: "Potwór z Cesarskiego Maista",
    [LANG_JP]: "帝都 モンスター",
    [LANG_RU]: "Имперский город Монстр",
    [LANG_ZH]: "帝都怪物",
  },
  [LIBSETS_SETTYPE_CYRODIIL_MONSTER]: {
    [LANG_DE]: "Cyrodiil Monster",
    [LANG_EN]: "Cyrodiil monster",
    [LANG_ES]: "Cyrodiil monstruo",
    [LANG_FR]: "Monstre de Cyrodiil",
    [LANG_PL]: "Potwór z Cyrodiil",
    [LANG_JP]: "シロディール モンスター",
    [LANG_RU]: "Сиродил Монстр",
    [LANG_ZH]: "西罗帝尔怪物",
  },
  [LIBSETS_SETTYPE_CLASS]: {
    [LANG_DE]: "Klassen spezifisch",
    [LANG_EN]: "Class specific",
    [LANG_ES]: "Específico de la clase",
    [LANG_FR]: "Spécifique à la classe",
    [LANG_PL]: "Specyficzne dla klasy",
    [LANG_JP]: "クラス固有の",
    [LANG_RU]: "Зависит от класса",
    [LANG_ZH]: "职业限定",
  },
}
if (checkIfPTSAPIVersionIsLive()) {
}
lib.setTypesToName = SET_TYPES_TO_NAME

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
  for (const [k] of ipairs(t)) {
    n = k
  }
  return n
}
function asNumber(this: void, value: unknown): number {
  return tonumber(value) ?? 0
}
