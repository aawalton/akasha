import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import type { ActivityCategoryId } from "../activity-categories/activity-categories.module.code.ts"

export const SET_SUBCATEGORY_TO_ACTIVITY: Record<SetCategoryId, ActivityCategoryId> = {
  none: "other",
  trial: "trials",
  dungeon: "group-dungeons",
  arena: "arenas",
  overland: "exploration",
  crafted: "crafting",
  monster: "group-dungeons",
  mythic: "exploration",
  pvp: "pvp",
  class: "characters",
  other: "other",
  "no-type": "other",
}

export const ACHIEVEMENT_CATEGORY_ACTIVITY: Record<string, ActivityCategoryId> = {
  "Player VS Player": "pvp",
  Crafting: "crafting",
  "Veteran Dungeons": "group-dungeons",
  Exploration: "exploration",
  Quests: "quests",
  "Infinite Archive": "arenas",
  Housing: "housing",
  "Holiday Events": "events",
  Prologues: "quests",
  "Feast of Shadows": "group-dungeons",
  "Fallen Banners": "group-dungeons",
  "Scions of Ithelia": "group-dungeons",
  "Scribes of Fate": "group-dungeons",
  "Lost Depths": "group-dungeons",
  "Ascending Tide": "group-dungeons",
  "Waking Flame": "group-dungeons",
  "Flames of Ambition": "group-dungeons",
  Stonethorn: "group-dungeons",
  Harrowstorm: "group-dungeons",
  Scalebreaker: "group-dungeons",
  Wrathstone: "group-dungeons",
  Wolfhunter: "group-dungeons",
  "Dragon Bones": "group-dungeons",
  "Horns of the Reach": "group-dungeons",
  "Shadows of the Hist": "group-dungeons",
  Character: "characters",
  Dungeons: "group-dungeons",
  "Seasons of the Worm Cult": "exploration",
  "Gold Road": "exploration",
  Necrom: "exploration",
  "High Isle": "exploration",
  Blackwood: "exploration",
  Greymoor: "exploration",
  Elsweyr: "exploration",
  Summerset: "exploration",
  Morrowind: "exploration",
  Firesong: "exploration",
  Deadlands: "exploration",
  Markarth: "exploration",
  Dragonhold: "exploration",
  Murkmire: "exploration",
  "Clockwork City": "exploration",
  Orsinium: "exploration",
  "Dark Brotherhood": "quests",
  "Thieves Guild": "exploration",
  "Imperial City": "pvp",
}

export const ACHIEVEMENT_SUBCATEGORY_ACTIVITY: Record<string, ActivityCategoryId> = {
  Quests: "quests",
  Exploration: "exploration",
  Antiquities: "exploration",
  Companions: "companions",
  "Tales of Tribute": "other",
  Veteran: "group-dungeons",
  Guilds: "characters",
  Champion: "characters",
  Trophies: "exploration",
  Vampire: "characters",
  Werewolf: "characters",
  Class: "characters",
  Justice: "other",
  Skyshards: "exploration",
  Trials: "trials",
  "Public Dungeons": "exploration",
  "Group Dungeons": "group-dungeons",
  "Ossein Cage": "trials",
  "Lucent Citadel": "trials",
  "Sanity's Edge": "trials",
  "Dreadsail Reef": "trials",
  Rockgrove: "trials",
  "Kyne's Aegis": "trials",
  Sunspire: "trials",
  Cloudrest: "trials",
  "Halls of Fabrication": "trials",
  "Asylum Sanctorium": "trials",
  "Maw of Lorkhaj": "trials",
  "Bastion Nymic": "arenas",
  "Vateshran Hollows": "arenas",
  "Blackrose Prison": "arenas",
  "Maelstrom Arena": "arenas",
  "Imperial City Prison": "group-dungeons",
  "White Gold Tower": "group-dungeons",
  "Siege Camps": "exploration",
  "Mirrormoor Mosaics": "exploration",
  "Volcanic Vents": "exploration",
  Harrowstorms: "exploration",
  "Abyssal Geysers": "exploration",
}

export function achievementNameToActivity(name: string): ActivityCategoryId | undefined {
  if (name.includes("Style Master")) return "crafting"
  if (name.includes("Skyshard")) return "exploration"
  if (name.endsWith("Angler")) return "exploration"
  if (name.includes("Larcenist")) return "other"
  if (name.includes("Quests")) return "quests"
  if (name.endsWith("Skill Master")) return "characters"
  if (name.endsWith("Skill Apprentice")) return "characters"
  if (name.includes("Skill Stylist")) return "characters"
  if (name.includes("Imperial City") && !name.includes("Imperial City Prison")) return "pvp"
  if (name.includes("Cyrodiil")) return "pvp"
  return undefined
}

export const COLLECTIBLE_CATEGORY_TO_ACTIVITY: Record<number, ActivityCategoryId> = {
  0: "other",
  1: "other",
  2: "other",
  3: "other",
  4: "housing",
  5: "housing",
  6: "other",
  7: "other",
  8: "other",
  9: "other",
  10: "other",
  11: "other",
  12: "other",
  13: "other",
  14: "other",
  15: "other",
}
