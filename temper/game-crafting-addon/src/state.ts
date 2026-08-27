import { ChampionPointsTexture, HealthName, MagickaName, StaminaName } from "./constants"
import type { StyleApi } from "./core/styles-data"
import type { AccountData } from "./data/account-init"
import type { CharacterData } from "./data/char-init"
import { Cook, type CookTable } from "./data/cook"
import { Furnisher, type FurnisherTable } from "./data/furnisher"
import { type CsQualityColor, Quality, QualityHex } from "./data/quality"
import { Rune, type RuneTable } from "./data/rune"
import { type CraftedSetEntry, Sets } from "./data/sets-data"
import { Lang } from "./lang"
import { type LangTable } from "./lang/lang-table"

export interface StyleNameRow {
  name: string
  id: number
  motif: number
}

export interface QuestEntry {
  id: number
  name: string
  work: Record<number, string>
}

export interface DataTables {
  crafting: {
    researched: Record<string, Record<number, Record<number, Record<number, boolean | number>>>>
  }
}

export interface TemperCraftingState {
  Debug: boolean
  Name: string
  Title: string
  Version: string
  Account: AccountData
  Character: CharacterData
  Init: boolean
  MaxTraits: number
  JewelryMaxTraits: number
  Loc: LangTable
  Quest: Record<number, QuestEntry>
  Extern: boolean
  Inspiration: string
  HealthName: string
  MagickaName: string
  StaminaName: string
  CurrentPlayer: string
  SelectedPlayer: string
  UIClosed: boolean
  ChampionPointsTexture: string
  Data: DataTables
  SELF: boolean
  ItemLinkCache: Record<number, Record<number, string>>
  previewType: Record<string, number>
  selectedControl: Control | undefined
  Style: StyleApi | undefined
  styleNames: StyleNameRow[]
  Chat: ChatProxy
  Quality: Record<number, CsQualityColor>
  QualityHex: Record<number, string>
  Cook: CookTable
  Furnisher: FurnisherTable
  Rune: RuneTable
  Sets: Record<number, CraftedSetEntry>
}

ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE", "Temper Crafting")

const [, , maxTraits] = GetSmithingResearchLineInfo(1, 1)
const [, , jewelryMaxTraits] = GetSmithingResearchLineInfo(7, 1)

const langTables: Record<string, LangTable> = Lang
const Loc = langTables[GetCVar("language.2")] ?? Lang.en

const currentPlayer = zo_strformat("<<C:1>>", GetUnitName("player"))

function asAccountData(placeholder: unknown): AccountData {
  return placeholder as AccountData
}

function asCharacterData(placeholder: unknown): CharacterData {
  return placeholder as CharacterData
}

export const state: TemperCraftingState = {
  Debug: GetWorldName() === "PTS" || GetDisplayName() === "@VladislavAksjonov",
  Name: "TemperCrafting",
  Title: "Temper Crafting",
  Version: "3.04",
  Account: asAccountData(undefined),
  Character: asCharacterData(undefined),
  Init: false,
  MaxTraits: maxTraits,
  JewelryMaxTraits: jewelryMaxTraits,
  Loc: Loc,
  Quest: {},
  Extern: false,
  Inspiration: "",
  HealthName: HealthName,
  MagickaName: MagickaName,
  StaminaName: StaminaName,
  CurrentPlayer: currentPlayer,
  SelectedPlayer: currentPlayer,
  UIClosed: false,
  ChampionPointsTexture: ChampionPointsTexture,
  Data: {
    crafting: { researched: {} },
  },
  SELF: false,
  ItemLinkCache: {
    [BAG_BACKPACK]: {},
    [BAG_BANK]: {},
    [BAG_VIRTUAL]: {},
    [BAG_SUBSCRIBER_BANK]: {},
  },
  previewType: {
    [Loc.previewType[0]]: 1,
    [Loc.previewType[1]]: 2,
    [Loc.previewType[2]]: 3,
    [Loc.previewType[3]]: 4,
  },
  selectedControl: undefined,
  Style: undefined,
  styleNames: [],
  Chat: {
    Print(str) {
      if (str === undefined) {
        return
      }
      d("|cEEEE00[TemperCrafting]|r " + str)
    },
  },
  Quality: Quality,
  QualityHex: QualityHex,
  Cook: Cook,
  Furnisher: Furnisher,
  Rune: Rune,
  Sets: Sets,
}
