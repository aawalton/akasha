import type { SkillPointGeneralSource } from "../skill-point-source-types/skill-point-source-types.module.code.ts"

export const SKILL_POINT_GENERAL_SOURCES: readonly SkillPointGeneralSource[] = [
  { key: "level", label: "Level", maxValue: 64 },
  { key: "mainQuests", label: "Main Quests", maxValue: 11 },
  { key: "tutorial", label: "Tutorial", maxValue: 1 },
  { key: "foliumDiscognitum", label: "Folium Discognitum", maxValue: 2 },
  { key: "pvpRank", label: "PvP Rank", maxValue: 50 },
  { key: "maelstromArena", label: "Maelstrom Arena", maxValue: 1 },
  { key: "endlessArchive", label: "Endless Archive", maxValue: 1 },
]
