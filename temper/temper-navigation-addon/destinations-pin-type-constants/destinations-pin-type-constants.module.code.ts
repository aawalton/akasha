export const PIN_TYPES = {
  FAKEKNOWN: "DEST_PinSet_FakeKnown",

  UNKNOWN: "DEST_PinSet_Unknown",

  LB_GTTP_CP: "DEST_PinSet_Other",
  MAIQ: "DEST_PinSet_Maiq",
  PEACEMAKER: "DEST_PinSet_Peacemaker",
  NOSEDIVER: "DEST_PinSet_Nosediver",
  EARTHLYPOS: "DEST_PinSet_Earthly_Possessions",
  ON_ME: "DEST_PinSet_This_Ones_On_Me",
  BRAWL: "DEST_PinSet_Last_Brawl",
  PATRON: "DEST_PinSet_Patron",
  WROTHGAR_JUMPER: "DEST_PinSet_Wrothgar_Jumper",
  RELIC_HUNTER: "DEST_PinSet_Wrothgar_Relic_Hunter",
  BREAKING: "DEST_PinSet_Breaking_Entering",
  CUTPURSE: "DEST_PinSet_Cutpurse_Above",
  CHAMPION: "DEST_PinSet_Champion",

  LB_GTTP_CP_DONE: "DEST_PinSet_Other_Done",
  MAIQ_DONE: "DEST_PinSet_Maiq_Done",
  PEACEMAKER_DONE: "DEST_PinSet_Peacemaker_Done",
  NOSEDIVER_DONE: "DEST_PinSet_Nosediver_Done",
  EARTHLYPOS_DONE: "DEST_PinSet_Earthly_Possessions_Done",
  ON_ME_DONE: "DEST_PinSet_This_Ones_On_Me_Done",
  BRAWL_DONE: "DEST_PinSet_Last_Brawl_Done",
  PATRON_DONE: "DEST_PinSet_Patron_Done",
  WROTHGAR_JUMPER_DONE: "DEST_PinSet_Wrothgar_Jumper_Done",
  RELIC_HUNTER_DONE: "DEST_PinSet_Wrothgar_Relic_Hunter_Done",
  BREAKING_DONE: "DEST_PinSet_Breaking_Entering_Done",
  CUTPURSE_DONE: "DEST_PinSet_Cutpurse_Above_Done",
  CHAMPION_DONE: "DEST_PinSet_Champion_Done",

  ACHIEVEMENTS_COMPASS: "DEST_Compass_Achievements",

  AYLEID: "DEST_PinSet_Ayleid",
  DWEMER: "DEST_PinSet_Dwemer",
  DEADLANDS: "DEST_PinSet_Deadlands",
  HIGHISLE: "DEST_PinSet_HighIsle",
  MISC_COMPASS: "DEST_Compass_Misc",

  QOLPINS_DOCK: "DEST_Qol_Dock",
  QOLPINS_STABLE: "DEST_Qol_Stable",
  QOLPINS_PORTAL: "DEST_Qol_Portal",

  WWVAMP: "DEST_PinSet_WWVamp",
  VAMPIRE_ALTAR: "DEST_PinSet_Vampire_Alter",
  WEREWOLF_SHRINE: "DEST_PinSet_Werewolf_Shrine",
  VWW_COMPASS: "DEST_Compass_WWVamp",

  COLLECTIBLES: "DEST_Pin_Collectibles",
  COLLECTIBLESDONE: "DEST_Pin_Collectibles_Done",
  COLLECTIBLES_SHOW_ITEM: "DEST_Compass_Collectibles_Show_Item",
  COLLECTIBLES_SHOW_MOBNAME: "DEST_Compass_Collectibles_Show_MobName",
  COLLECTIBLES_COMPASS: "DEST_Compass_Collectibles",

  FISHING: "DEST_Pin_Fishing",
  FISHINGDONE: "DEST_Pin_Fishing_Done",
  FISHING_SHOW_BAIT: "DEST_Compass_Fishing_Show_Bait",
  FISHING_SHOW_BAIT_LEFT: "DEST_Compass_Fishing_Show_Bait_Left",
  FISHING_SHOW_WATER: "DEST_Compass_Fishing_Show_Water",
  FISHING_SHOW_FISHNAME: "DEST_Compass_Fishing_Show_FishName",
  FISHING_COMPASS: "DEST_Compass_Fishing",
} as const

export type PinTypeKey = keyof typeof PIN_TYPES
export type PinTypeName = (typeof PIN_TYPES)[PinTypeKey]

export type AchievementPinKey =
  | "MAIQ"
  | "LB_GTTP_CP"
  | "PEACEMAKER"
  | "NOSEDIVER"
  | "EARTHLYPOS"
  | "ON_ME"
  | "BRAWL"
  | "PATRON"
  | "WROTHGAR_JUMPER"
  | "CHAMPION"
  | "RELIC_HUNTER"
  | "BREAKING"
  | "CUTPURSE"
