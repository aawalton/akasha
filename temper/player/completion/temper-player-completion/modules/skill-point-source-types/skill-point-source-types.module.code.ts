import type { SkillPointProgress } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

type SkillPointGeneralKey = Extract<
  keyof SkillPointProgress,
  | "level"
  | "mainQuests"
  | "tutorial"
  | "foliumDiscognitum"
  | "pvpRank"
  | "maelstromArena"
  | "endlessArchive"
>

export interface SkillPointGeneralSource {
  key: SkillPointGeneralKey
  label: string
  maxValue: number
}

export interface SkillPointZoneSource {
  key: string
  label: string
  maxQuests: number
  maxSkyshards: number
  pvp?: boolean
}

export interface SkillPointDungeonSource {
  key: string
  label: string
}
