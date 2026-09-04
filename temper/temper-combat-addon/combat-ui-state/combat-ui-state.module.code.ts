import type {
  CmxFight,
  SelectionData,
  SelectionState,
} from "@akasha/temper-combat-addon/combat-core-types"

let dxCache: number | undefined

export function getDx(): number {
  if (dxCache === undefined) {
    dxCache =
      zo_ceil((GuiRoot.GetWidth() / (tonumber(GetCVar("WindowedWidth")) ?? 1)) * 1000) / 1000
  }
  return dxCache
}

let fontsizeCache: number | undefined

export function getFontsize(): number {
  if (fontsizeCache === undefined) {
    fontsizeCache = tonumber(GetString(SI_TEMPER_COMBAT_FONT_SIZE_SMALL)) ?? 14
  }
  return fontsizeCache
}

export interface UpdatableControl extends Control {
  Update?: (this: void, control: UpdatableControl) => undefined
}

export interface ReportControl extends Control {
  Update?: (this: void, control: Control, fightId?: number) => undefined
  Toggle?: (this: void) => undefined
  Resize?: (this: void, scale: number) => undefined
}

export type SelectionTable = Record<string | number, unknown>

export interface UISelections extends SelectionState {
  ability: Record<string, SelectionTable | undefined>
  unit: Record<string, SelectionTable | undefined>
  buff: Record<string, SelectionTable | undefined>
  resource: Record<string, SelectionTable | undefined>
}

export type UILastSelections = Record<
  "ability" | "unit" | "buff" | "resource",
  Record<string, number | undefined>
>

function makeSelections(): UISelections {
  return { ability: {}, unit: {}, buff: {}, resource: {} }
}

function makeLastSelections(): UILastSelections {
  return { ability: {}, unit: {}, buff: {}, resource: {} }
}

let selections: UISelections = makeSelections()
let lastSelections: UILastSelections = makeLastSelections()

export function getSelections(): UISelections {
  return selections
}

export function getLastSelections(): UILastSelections {
  return lastSelections
}

export function resetSelections(): undefined {
  selections = makeSelections()
  lastSelections = makeLastSelections()
  return undefined
}

let currentFight: number | undefined

export function getCurrentFight(): number | undefined {
  return currentFight
}

export function setCurrentFight(fightId: number | undefined): undefined {
  currentFight = fightId
  return undefined
}

let fightData: CmxFight | undefined

export function getFightData(): CmxFight | undefined {
  return fightData
}

export function setFightData(fight: CmxFight | undefined): undefined {
  fightData = fight
  return undefined
}

let selectionData: SelectionData | undefined

export function getUiSelectionData(): SelectionData | undefined {
  return selectionData
}

export function setUiSelectionData(data: SelectionData | undefined): undefined {
  selectionData = data
  return undefined
}

let currentCLPage: number | undefined

export function getCurrentCLPage(): number | undefined {
  return currentCLPage
}

export function setCurrentCLPage(page: number | undefined): undefined {
  currentCLPage = page
  return undefined
}

export type AbilityStats = [CmxFight | undefined, SelectionData | undefined]

const ABILITY_STATS_VERSION = 3

let abilitystats: AbilityStats | undefined

export function setAbilityStats(stats: AbilityStats): undefined {
  abilitystats = stats
  return undefined
}

export function getAbilityStats(): LuaMultiReturn<[AbilityStats | undefined, number, boolean]> {
  const isSelection = selections.unit["damageOut"] !== undefined
  return $multi(abilitystats, ABILITY_STATS_VERSION, isSelection)
}

export const UNCOLLAPSED_BUFFS: Record<string, boolean | undefined> = {}
