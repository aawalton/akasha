import type {
  GroupDungeonEntry,
  PublicDungeonEntry,
  Tutorials,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-sources/skill-point-sources.module.code.ts"

export type Rgb = number[]

interface GeneralColors {
  doneColor: Rgb
  needColor: Rgb
  progColor: Rgb
}

interface QuestSkyshardColors {
  doneColorSS: Rgb
  doneColorZQ: Rgb
  needColorSS: Rgb
  needColorZQ: Rgb
  progColorSS: Rgb
  progColorZQ: Rgb
  sortCol: number
}

interface DungeonColors {
  doneColor: Rgb
  needColor: Rgb
  sortCol: number
}

interface FoliumOverride {
  override: boolean
  charHasFD: boolean
}

export interface Settings {
  GSP: GeneralColors
  SQS: QuestSkyshardColors
  GDQ: DungeonColors
  PDB: DungeonColors
  FD: FoliumOverride
  TUT: boolean
}

export interface PointsData {
  Tot: number
  GenTot: number
  ZQTot: number
  numSSTot: number
  SSTot: number
  GDTot: number
  PDTot: number
  Level: number
  MainQ: number
  FolDis: number
  tutorial: number
  PvPRank: number
  MaelAr: number
  EndlArch: number
  Unassigned: number | undefined
  ZQ: Record<string, number>
  SS: Record<string, number>
  GD: Record<string, number>
  PD: Record<string, number>
}

export interface CharInfo {
  charId: string
  charName: string
}

export interface SavedVariablesData {
  charInfo: CharInfo[]
  settings: Record<string, Settings>
  ptsData: Record<string, PointsData>
}

export interface PointTotals {
  ZQTot: number
  numSSTot: number
  SSTot: number
  GDTot: number
  PDTot: number
  Level: number
  MainQ: number
  FolDis: number
  PvPRank: number
  MaelAr: number
  EndlArch: number
  GenTot: number
  Tot: number
}

export type GeneralRow = [number, string, number, number, string]
export type QuestSkyshardRow = [number, string, number, number, number, number, string]
export type DungeonRow = [number, string, string, number, string]

export interface GuiTables {
  GSP: GeneralRow[]
  GSP_T: string
  SQS: QuestSkyshardRow[]
  SQS_SL_T: string
  SQS_SS_T: string
  GDQ: DungeonRow[]
  GDQ_T: string
  PDGBE: DungeonRow[]
  PDGBE_T: string
  CharacterTot: string
}

interface SortOptions {
  SQS: Record<string, number>
  D: Record<string, number>
  Names_SQS: string[]
  Names_D: string[]
}

export interface Options {
  Sort: SortOptions
}

export interface CharData {
  charId: string
  charName: string
}

export interface ZoneData {
  key: string
  quests: number[]
  skyshards: number
}

export interface GameData {
  ZId: { ZN: Record<string, number> }
  MAAch: number
  zones: ZoneData[]
  tutorials: Tutorials
  GD: GroupDungeonEntry[]
  MQ: number[]
  EA: number[]
  PD: readonly PublicDungeonEntry[]
}
