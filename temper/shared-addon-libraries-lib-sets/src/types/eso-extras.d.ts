declare function ZO_IsConsoleOrGameCoreUI(this: void): boolean

declare function CanCommunicateWith(this: void, characterOrDisplayName: string): boolean
declare function GetClassColor(this: void, classId: number): unknown

declare function ZO_ShallowTableCopy<T>(this: void, source: T): T
declare function ZO_IsTableEmpty(this: void, t: object | undefined): boolean
declare function ZO_CachedStrFormat(this: void, formatString: string, ...args: unknown[]): string
declare function zo_iconTextFormat(
  this: void,
  texture: string,
  width: number,
  height: number,
  text: string,
  color?: unknown
): string
declare const ZO_SavedVars: {
  NewAccountWide: (
    this: unknown,
    savedVariableTable: string,
    version: number,
    namespace: unknown,
    defaults: object,
    profile?: unknown,
    displayName?: string
  ) => { [key: string]: unknown }
}
declare function GetControl(this: void, name: string): unknown
declare function ZO_GetChatSystem(this: void): {
  StartTextEntry: (
    this: unknown,
    text: string,
    channel: unknown,
    target: unknown,
    flag: boolean
  ) => void
}
declare function GetString(this: void, stringPrefix: string, index: number): string
declare function ZO_WorldMap_IsWorldMapShowing(this: void): boolean
declare const MAIN_MENU_KEYBOARD: { ShowCategory: (this: unknown, category: number) => void }
declare const MENU_CATEGORY_MAP: number
declare const ITEM_FILTER_UTILS: {
  GetEquipTypeFilterIcons: (this: void, equipType: number) => { up?: string } | undefined
  GetWeaponTypeFilterIcons: (this: void, weaponType: number) => { up?: string } | undefined
  GetEquipmentFilterTypeFilterDisplayInfo: (
    this: void,
    filterType: number
  ) => { icons?: { up?: string } } | undefined
}
declare const DUNGEON_FINDER_KEYBOARD: unknown

declare function LibSets_SearchUI_Keyboard_TopLevel_OnInitialized(
  this: void,
  control: unknown
): void

interface SharedInventoryManager {
  GetOrCreateBagCache: (
    this: SharedInventoryManager,
    bagId: number
  ) => { [slotKey: number]: { slotIndex: number } }
}

declare const LibSets_SearchUI_Shared: {
  setId: number | undefined
  GetAllFavoritesCategories: (this: void, setId: number | undefined) => string[]
}

type EquipType = number
type ItemTraitType = number
type ArmorType = number
type WeaponType = number
type EnchantmentSearchCategoryType = number

declare const LibScrollableMenu: unknown
declare const LibCustomMenu: unknown
declare const LibAddonMenu2: unknown
declare const LibSlashCommander: unknown
declare const LibZone: unknown

declare const SI_ACTIVITY_FINDER_CATEGORY_PROMOTIONAL_EVENTS: number
declare const SI_ANTIQUITY_TOOLTIP_TAG: number
declare const SI_ARMORTYPE1: number
declare const SI_ARMORTYPE2: number
declare const SI_ARMORTYPE3: number
declare const SI_CAMPAIGNRULESETTYPE1: number
declare const SI_CAMPAIGNRULESETTYPE4: number
declare const SI_CHECK_BUTTON_OFF: number
declare const SI_CHECK_BUTTON_ON: number
declare const SI_CLASS_NAME: number
declare const SI_COLLECTIONS_FAVORITES_CATEGORY_HEADER: number
declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES1306: number
declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES4: number
declare const SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES501: number
declare const SI_DUNGEONDIFFICULTY2: number
declare const SI_DUNGEON_FINDER_RANDOM_FILTER_TEXT: number
declare const SI_GUILDACTIVITYATTRIBUTEVALUE11: number
declare const SI_HOTBARCATEGORY9: number
declare const SI_INSTANCEDISPLAYTYPE2: number
declare const SI_INSTANCEDISPLAYTYPE6: number
declare const SI_INSTANCEDISPLAYTYPE7: number
declare const SI_INSTANCEDISPLAYTYPE9: number
declare const SI_INVENTORY_SORT_TYPE_NAME: number
declare const SI_ITEM_ACTION_LINK_TO_CHAT: number
declare const SI_ITEMDISPLAYQUALITY6: number
declare const SI_ITEM_FORMAT_STR_CRAFTED: number
declare const SI_KEYBINDDISPLAYMODE2: number
declare const SI_LEADERBOARDTYPE4: number
declare const SI_LEVEL_UP_REWARDS_GAMEPAD_REWARD_SECTION_HEADER_SINGULAR: number
declare const SI_LFGACTIVITY4: number
declare const SI_MAPDISPLAYFILTER2: number
declare const SI_SPECIALIZEDITEMTYPE213: number
declare const SI_VISUALARMORTYPE4: number
declare const SI_WEAPONTYPE0: number
declare const SI_WEAPONTYPE1: number
declare const SI_WEAPONTYPE2: number
declare const SI_WEAPONTYPE3: number
declare const SI_WEAPONTYPE4: number
declare const SI_WEAPONTYPE5: number
declare const SI_WEAPONTYPE6: number
declare const SI_WEAPONTYPE8: number
declare const SI_WEAPONTYPE9: number
declare const SI_WEAPONTYPE10: number
declare const SI_WEAPONTYPE11: number
declare const SI_WEAPONTYPE12: number
declare const SI_WEAPONTYPE13: number
declare const SI_WEAPONTYPE14: number
declare const SI_WEAPONTYPE15: number
declare const SI_WINDOW_TITLE_MAIL: number
declare const SI_ZONEDISPLAYTYPE2: number
declare const SI_ZONEDISPLAYTYPE6: number
declare const SI_ZONEDISPLAYTYPE7: number
declare const SI_ZONEDISPLAYTYPE9: number
declare const SI_ZONEDISPLAYTYPE12: number

declare const LIBSETS_SETTYPE_ARENA: number
declare const LIBSETS_SETTYPE_BATTLEGROUND: number
declare const LIBSETS_SETTYPE_CRAFTED: number
declare const LIBSETS_SETTYPE_CYRODIIL: number
declare const LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD: number
declare const LIBSETS_SETTYPE_DUNGEON: number
declare const LIBSETS_SETTYPE_IMPERIALCITY: number
declare const LIBSETS_SETTYPE_MONSTER: number
declare const LIBSETS_SETTYPE_OVERLAND: number
declare const LIBSETS_SETTYPE_SPECIAL: number
declare const LIBSETS_SETTYPE_TRIAL: number
declare const LIBSETS_SETTYPE_MYTHIC: number
declare const LIBSETS_SETTYPE_IMPERIALCITY_MONSTER: number
declare const LIBSETS_SETTYPE_CYRODIIL_MONSTER: number
declare const LIBSETS_SETTYPE_CLASS: number
declare const LIBSETS_SETTYPE_ITERATION_BEGIN: number
declare const LIBSETS_SETTYPE_ITERATION_END: number

declare const LIBSETS_TABLEKEY_NEWSETIDS: string
declare const LIBSETS_TABLEKEY_NAMES: string
declare const LIBSETS_TABLEKEY_SETITEMIDS: string
declare const LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID: string
declare const LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED: string
declare const LIBSETS_TABLEKEY_SETS_EQUIP_TYPES: string
declare const LIBSETS_TABLEKEY_SETS_ARMOR_TYPES: string
declare const LIBSETS_TABLEKEY_SETS_JEWELRY: string
declare const LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES: string
declare const LIBSETS_TABLEKEY_SETNAMES: string
declare const LIBSETS_TABLEKEY_SETNAMES_NO_SETID: string
declare const LIBSETS_TABLEKEY_LASTCHECKEDAPIVERSION: string
declare const LIBSETS_TABLEKEY_NUMBONUSES: string
declare const LIBSETS_TABLEKEY_MAXEQUIPPED: string
declare const LIBSETS_TABLEKEY_SETTYPE: string
declare const LIBSETS_TABLEKEY_MAPS: string
declare const LIBSETS_TABLEKEY_WAYSHRINES: string
declare const LIBSETS_TABLEKEY_WAYSHRINE_NAMES: string
declare const LIBSETS_TABLEKEY_ZONEIDS: string
declare const LIBSETS_TABLEKEY_ZONEIDS_SORTED: string
declare const LIBSETS_TABLEKEY_ZONE_DATA: string
declare const LIBSETS_TABLEKEY_DUNGEONFINDER_DATA: string
declare const LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES: string
declare const LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES: string
declare const LIBSETS_TABLEKEY_COLLECTIBLE_NAMES: string
declare const LIBSETS_TABLEKEY_WAYSHRINENODEID2ZONEID: string
declare const LIBSETS_TABLEKEY_DROPMECHANIC: string
declare const LIBSETS_TABLEKEY_DROPMECHANIC_SORTED: string
declare const LIBSETS_TABLEKEY_DROPMECHANIC_NAMES: string
declare const LIBSETS_TABLEKEY_DROPMECHANIC_TOOLTIP_NAMES: string
declare const LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES: string
declare const LIBSETS_TABLEKEY_MIXED_SETNAMES: string
declare const LIBSETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP: string
declare const LIBSETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING: string
declare const LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES: string
declare const LIBSETS_TABLEKEY_DUNGEON_ZONE_MAPPING: string
declare const LIBSETS_TABLEKEY_PUBLICDUNGEON_ZONE_MAPPING: string
declare const LIBSETS_TABLEKEY_TABLENAME: string

declare const LIBSETS_SET_ITEMID_TABLE_VALUE_OK: number
declare const LIBSETS_SET_ITEMID_TABLE_VALUE_NOTOK: number

declare const LIBSETS_SET_COLLECTIONS_CATEGORY_TOPMOST_NODE: number

declare const LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_EFFECT_CHANGED: number
declare const LIBSETS_SETPROC_CHECKTYPE_ABILITY_EVENT_COMBAT_EVENT: number
declare const LIBSETS_SETPROC_CHECKTYPE_EVENT_POWER_UPDATE: number
declare const LIBSETS_SETPROC_CHECKTYPE_EVENT_BOSSES_CHANGED: number
declare const LIBSETS_SETPROC_CHECKTYPE_SPECIAL: number

declare const LIBSETS_SPECIAL_ZONEID_ALLZONES_OF_TAMRIEL: number
declare const LIBSETS_SPECIAL_ZONEID_LEVELUPREWARD: number
declare const LIBSETS_SPECIAL_ZONEID_BATTLEGROUNDS: number

declare const LIBSETS_DROP_MECHANIC_MAIL_PVP_REWARDS_FOR_THE_WORTHY: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_BRUMA: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_CROPSFORD: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_VLASTARUS: number
declare const LIBSETS_DROP_MECHANIC_ARENA_STAGE_CHEST: number
declare const LIBSETS_DROP_MECHANIC_MONSTER_NAME: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_BOSS_DELVE: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_WORLDBOSS: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_BOSS_PUBLIC_DUNGEON: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_CHEST: number
declare const LIBSETS_DROP_MECHANIC_BATTLEGROUND_REWARD: number
declare const LIBSETS_DROP_MECHANIC_MAIL_DAILY_RANDOM_DUNGEON_REWARD: number
declare const LIBSETS_DROP_MECHANIC_IMPERIAL_CITY_VAULTS: number
declare const LIBSETS_DROP_MECHANIC_LEVEL_UP_REWARD: number
declare const LIBSETS_DROP_MECHANIC_ANTIQUITIES: number
declare const LIBSETS_DROP_MECHANIC_BATTLEGROUND_VENDOR: number
declare const LIBSETS_DROP_MECHANIC_TELVAR_EQUIPMENT_LOCKBOX_MERCHANT: number
declare const LIBSETS_DROP_MECHANIC_AP_ELITE_GEAR_LOCKBOX_MERCHANT: number
declare const LIBSETS_DROP_MECHANIC_REWARD_BY_NPC: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_OBLIVION_PORTAL_FINAL_CHEST: number
declare const LIBSETS_DROP_MECHANIC_DOLMEN_HARROWSTORM_MAGICAL_ANOMALIES: number
declare const LIBSETS_DROP_MECHANIC_DUNGEON_CHEST: number
declare const LIBSETS_DROP_MECHANIC_DAILY_QUEST_REWARD_COFFER: number
declare const LIBSETS_DROP_MECHANIC_FISHING_HOLE: number
declare const LIBSETS_DROP_MECHANIC_OVERLAND_LOOT: number
declare const LIBSETS_DROP_MECHANIC_TRIAL_BOSS: number
declare const LIBSETS_DROP_MECHANIC_MOB_TYPE: number
declare const LIBSETS_DROP_MECHANIC_GROUP_DUNGEON_BOSS: number
declare const LIBSETS_DROP_MECHANIC_CRAFTED: number
declare const LIBSETS_DROP_MECHANIC_PUBLIC_DUNGEON_CHEST: number
declare const LIBSETS_DROP_MECHANIC_HARVEST_NODES: number
declare const LIBSETS_DROP_MECHANIC_IMPERIAL_CITY_TREASURE_TROVE_SCAMP: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_CHORROL_WEYNON_PRIORY: number
declare const LIBSETS_DROP_MECHANIC_CITY_CYRODIIL_CHEYDINHAL_CHORROL_WEYNON_PRIORY: number
declare const LIBSETS_DROP_MECHANIC_CYRODIIL_BOARD_MISSIONS: number
declare const LIBSETS_DROP_MECHANIC_ENDLESS_ARCHIVE: number
declare const LIBSETS_DROP_MECHANIC_GOLDEN_PURSUIT: number
declare const LIBSETS_DROP_MECHANIC_NIGHT_MARKET: number
declare const LIBSETS_DROP_MECHANIC_ZONE_STORYLINE: number
declare const LIBSETS_DROP_MECHANIC_ITERATION_BEGIN: number
declare const LIBSETS_DROP_MECHANIC_ITERATION_END: number

declare const DLC_TYPE_BASE_GAME: number
declare const DLC_TYPE_CHAPTER: number
declare const DLC_TYPE_DUNGEONS: number
declare const DLC_TYPE_ZONE: number
declare const DLC_TYPE_NORMAL_PATCH: number
declare const DLC_TYPE_SEASON_PART: number
declare const DLC_TYPE_ITERATION_BEGIN: number
declare const DLC_TYPE_ITERATION_END: number

declare const DLC_BASE_GAME: number
declare const DLC_IMPERIAL_CITY: number
declare const DLC_ORSINIUM: number
declare const DLC_THIEVES_GUILD: number
declare const DLC_DARK_BROTHERHOOD: number
declare const DLC_SHADOWS_OF_THE_HIST: number
declare const DLC_MORROWIND: number
declare const DLC_HORNS_OF_THE_REACH: number
declare const DLC_CLOCKWORK_CITY: number
declare const DLC_DRAGON_BONES: number
declare const DLC_SUMMERSET: number
declare const DLC_WOLFHUNTER: number
declare const DLC_MURKMIRE: number
declare const DLC_WRATHSTONE: number
declare const DLC_ELSWEYR: number
declare const DLC_SCALEBREAKER: number
declare const DLC_DRAGONHOLD: number
declare const DLC_HARROWSTORM: number
declare const DLC_GREYMOOR: number
declare const DLC_STONETHORN: number
declare const DLC_MARKARTH: number
declare const DLC_FLAMES_OF_AMBITION: number
declare const DLC_BLACKWOOD: number
declare const DLC_WAKING_FLAME: number
declare const DLC_DEADLANDS: number
declare const DLC_ASCENDING_TIDE: number
declare const DLC_HIGH_ISLE: number
declare const DLC_LOST_DEPTHS: number
declare const DLC_FIRESONG: number
declare const DLC_SCRIBES_OF_FATE: number
declare const DLC_NECROM: number
declare const NO_DLC_UPDATE39: number
declare const NO_DLC_SECRET_OF_THE_TELVANNI: number
declare const DLC_SCIONS_OF_ITHELIA: number
declare const DLC_GOLD_ROAD: number
declare const NO_DLC_UPDATE43: number
declare const NO_DLC_UPDATE44: number
declare const DLC_FALLEN_BANNERS: number
declare const DLC_SEASONS_OF_THE_WORMCULT1: number
declare const DLC_FEAST_OF_SHADOWS: number
declare const DLC_SEASONS_OF_THE_WORMCULT2: number
declare const DLC_SEASON0: number
declare const DLC_SEASON0_PART2: number
declare const DLC_ITERATION_BEGIN: number
declare const DLC_ITERATION_END: number
